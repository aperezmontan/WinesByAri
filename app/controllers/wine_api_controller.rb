class WineApiController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /request_data
  def request_data
    @response = client.request({})
binding.pry
    ::Product.load_api_data(@response.body)

    render :nothing => true, :status => @response.status
  end

  private

  def client
    @client ||= ::WineApi::Client.new
  end
end
