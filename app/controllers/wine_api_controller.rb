class WineApiController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /delete_data
  def delete_data
    products = ::Product.not.user_added
    products.destroy_all
    render :json => ::Product.all, :status => 200
  end

  # POST /request_data
  def request_data
    ::Product.not.user_added.destroy_all
    @response = client.request({})

    ::Product.load_api_data(@response.body)

    render :json => ::Product.all, :status => 200
  end

  private

  def client
    @client ||= ::WineApi::Client.new
  end
end
