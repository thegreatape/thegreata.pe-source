require 'date'
require 'dotenv/load'
require 'byebug'
require 'pp'
require 'json'
require 'airrecord'
require 'haml'
require 'active_support/all'

Airrecord.api_key = ENV['AIRTABLE_API_KEY']

class Book < Airrecord::Table
  self.base_key = ENV["BOOKS_BASE_ID"]
  self.table_name = "Books"

  has_many :readings, class: "Reading", column: "Readings"
end

class Reading < Airrecord::Table
  self.base_key = ENV["BOOKS_BASE_ID"]
  self.table_name = "Readings"

  belongs_to :book, class: "Book", column: "Book"
end

class SyncReading
  def currently_reading
    @_currently_reading ||= begin
      print "saving currently reading books... "
      readings = Reading.all(filter: "AND(AND({Started On} != BLANK(), {Finished On} = BLANK()), {Stopped Reading On} = BLANK())")
      readings.map {|r| r.fields.merge("Book" => r.book.fields)}.tap do
        puts "done"
      end
    end
  end

  def finished
    @_finished ||= begin
      print "saving finished books... "
      readings = Reading.all(filter: "{Finished On} != BLANK()")
      readings.map {|r| r.fields.merge("Book" => r.book.fields)}.tap do
        puts "done"
      end
    end
  end

  def did_not_finish
    @_did_not_finish ||= begin
      print "saving DNFed books... "
      readings = Reading.all(filter: "NOT({Stopped Reading On} = BLANK())")
      readings.map {|r| r.fields.merge("Book" => r.book.fields)}.tap do
        puts "done"
      end
    end
  end

  def did_not_finish_by_year
    did_not_finish.group_by{|r| Date.parse(r["Stopped Reading On"]).year }
  end

  def by_year
    finished.group_by {|r| r["Read In Year"] }.map do |year, readings|
      next if year == "Not Yet Finished"

      stats = {
        "Author Background" => Hash.new { 0 },
        "Genres" => Hash.new { 0 }
      }
      readings.each do |reading|
        stats.keys.each do |key|
          next unless reading["Book"][key]
          reading["Book"][key].each do |value|
            stats[key][value] += 1
          end
        end
      end

      data = {
        "readings" => readings,
        "stats" => stats,
      }
      [year, data]
    end.compact.sort.reverse
  end

  def save(book_data, filename)
    File.open(filename, 'wb') do |file|
      file << JSON.dump(book_data)
    end
  end

  def save_reading_history(filename)
    book_data = {
      "currently_reading" => currently_reading,
      "by_year" => by_year,
      "did_not_finish_by_year" => did_not_finish_by_year
    }
    save(book_data, filename)
  end
end

SyncReading.new.save_reading_history('reading/books.json')
