Rails.application.routes.draw do
  resources :products
  get 'request_data' => 'wine_api#request_data'
  post 'load_data' => 'wine_api#load_data'
  get 'delete_data' => 'wine_api#delete_data'
  root 'products#index'
end
