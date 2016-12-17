source 'https://rubygems.org'

# PUBLIC GEMS
gem "font-awesome-rails"
gem 'httpclient'
gem 'mongoid'
gem 'mongoid-paranoia', '~> 2.0' # For deleting and restoring records
gem 'mongoid_search', github: 'mauriciozaffari/mongoid_search', branch: 'master'
gem 'net-ssh', '~>3.2.0'
gem 'puma'
gem 'will_paginate', '> 3.0'
gem 'will_paginate_mongoid'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

group :development, :test do
  gem 'database_cleaner' # Cleans of db after running tests
  gem 'pry'
  gem 'rspec-rails'
  gem 'webmock' # Mocks out HTTP requests
end

group :development do
# Use Capistrano for deployment
  gem 'capistrano', :require => false
  gem 'capistrano-rails', :require => false
  gem 'capistrano-rvm', :require => false
  gem 'capistrano3-puma', :require => false
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
end
