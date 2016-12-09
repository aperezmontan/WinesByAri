Rails.application.routes.draw do
  resources :products
  post 'request_data' => 'wine_api#request_data'
  post 'delete_data' => 'wine_api#delete_data'
  root 'products#index'
end
