Rails.application.routes.draw do
  resources :products
  post 'request_data' => 'wine_api#request_data'
  root 'products#index'
end
