# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'webmock/rspec'

WebMock.disable_net_connect!(allow_localhost: true)

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")

  # Cleans db after tests run
  config.use_transactional_fixtures = false

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do |example|
    DatabaseCleaner.strategy= :truncation
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  # Stubs out requests made to Wine.com API
  config.before(:each) do
    stub_request(:get, "http://services.wine.com/api/beta2/service.svc/JSON/catalog?apikey=1234&size=1").
      with(:headers => {'Accept'=>'*/*', 'User-Agent'=>'HTTPClient/1.0 (2.8.0, ruby 2.3.0 (2015-12-25))'}).
      to_return(
        :status => 200,
        :body => "{\"Status\":{\"Messages\":[],\"ReturnCode\":0},\"Products\":{\"List\":[{\"Id\":124,\"Name\":\"Francis Ford Coppola Diamond Collection Red Label Zinfandel 1996\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx\",\"Appellation\":{\"Id\":2398,\"Name\":\"Napa Valley\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Napa-Valley\\/wine\\/list.aspx?N=7155+101+2398\",\"Region\":{\"Id\":101,\"Name\":\"California\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/California\\/wine\\/list.aspx?N=7155+101\",\"Area\":null}},\"Labels\":[{\"Id\":\"124m\",\"Name\":\"thumbnail\",\"Url\":\"http:\\/\\/cache.wine.com\\/labels\\/124m.jpg\"},{\"Id\":\"124l\",\"Name\":\"large\",\"Url\":\"http:\\/\\/cache.wine.com\\/labels\\/124l.jpg\"}],\"Type\":\"Wine\",\"Varietal\":{\"Id\":141,\"Name\":\"Zinfandel\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Zinfandel\\/wine\\/list.aspx?N=7155+124+141\",\"WineType\":{\"Id\":124,\"Name\":\"Red Wines\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Red-Wines\\/wine\\/list.aspx?N=7155+124\"}},\"Vineyard\":{\"Id\":999997855,\"Name\":\"Francis Ford Coppola Winery\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Winery\\/learnabout.aspx?winery=2879\",\"ImageUrl\":\"http:\\/\\/cache.wine.com\\/aboutwine\\/basics\\/images\\/winerypics\\/2879.jpg\",\"GeoLocation\":{\"Latitude\":-360,\"Longitude\":-360,\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/aboutwine\\/mapof.aspx?winery=2879\"}},\"Vintage\":\"1996\",\"Community\":{\"Reviews\":{\"HighestScore\":0,\"List\":[],\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx?pageType=reviews\"},\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx\"},\"Description\":\"\",\"GeoLocation\":{\"Latitude\":-360,\"Longitude\":-360,\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/aboutwine\\/mapof.aspx?winery=2879\"},\"PriceMax\":30,\"PriceMin\":20,\"PriceRetail\":25,\"ProductAttributes\":[],\"Ratings\":{\"HighestScore\":0,\"List\":[]},\"Retail\":null,\"Vintages\":{\"List\":[]}}],\"Offset\":0,\"Total\":1,\"Url\":\"\"}}",
        :headers => {})
  end
end
