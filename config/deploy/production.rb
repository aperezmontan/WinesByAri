# role-based syntax
# ==================

server "35.166.16.1", user: fetch(:user), :port => 22, :roles => [:app, :db, :web]

set :branch, "stable"
set :rails_env, "production"


