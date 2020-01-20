
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
    readings = Reading.all(filter: "AND(AND({Started On} != BLANK(), {Finished On} = BLANK()), {Stopped Reading On} = BLANK())")
    File.open(filename, 'wb') do |file|
      file << JSON.dump({ "readings" => readings.map {|r| r.fields.merge("Book" => r.book.fields)} })
    end
  end

  def self.render(json_filename:, template:, html_filename:)
    readings = JSON.parse(File.read(json_filename))
    File.open(html_filename, 'wb') do |file|
      file <<  Haml::Engine.new(File.read(template)).render(Object.new, readings: readings["readings"])
    end
  end
end

SyncReading.save_currently_reading_data('reading/currently_reading.json')
SyncReading.render(
  json_filename: 'reading/currently_reading.json', 
  template:'reading/templates/currently_reading.haml',
  html_filename:'_includes/currently_reading.html'
)
