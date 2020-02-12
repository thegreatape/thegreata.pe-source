
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
  def self.save_currently_reading_data(filename)
    print "saving currently reading books... "
    readings = Reading.all(filter: "AND(AND({Started On} != BLANK(), {Finished On} = BLANK()), {Stopped Reading On} = BLANK())")
    File.open(filename, 'wb') do |file|
      file << JSON.dump({ "readings" => readings.map {|r| r.fields.merge("Book" => r.book.fields)} })
    end
    puts "done"
  end

  def self.save_all_finished(filename)
    print "saving finished books... "
    readings = Reading.all(filter: "{Finished On} != BLANK()")
    File.open(filename, 'wb') do |file|
      file << JSON.dump({ "readings" => readings.map {|r| r.fields.merge("Book" => r.book.fields)} })
    end
    puts "done"
  end

  def self.render(json_filename:, template:, html_filename:)
    json = JSON.parse(File.read(json_filename))
    if block_given?
      json = yield json
    end
    File.open(html_filename, 'wb') do |file|
      file <<  Haml::Engine.new(File.read(template)).render(Object.new, json)
    end
  end
end

#SyncReading.save_currently_reading_data('reading/currently_reading.json')
#SyncReading.save_all_finished('reading/finished.json')

SyncReading.render(
  json_filename: 'reading/finished.json', 
  template:'reading/templates/reading_by_year.haml',
  html_filename:'_includes/reading_by_year.html'
) do |json|
  by_year = json["readings"].group_by {|r| r["Read In Year"] }.map do |year, readings|
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
  { "years" => by_year }
end

SyncReading.render(
  json_filename: 'reading/currently_reading.json', 
  template:'reading/templates/currently_reading.haml',
  html_filename:'_includes/currently_reading.html'
)
