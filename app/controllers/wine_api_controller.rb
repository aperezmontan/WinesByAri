class WineApiController < ApplicationController

  API_URI = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog'.freeze

  # POST /request_data
  def request_data
    @response = client.request({})

    ::Product.load_api_data(@response.body)

    render :nothing => true, :status => @response.status
  end

  private

  def client
    @client ||= ::WineApi::Client.new
  end
end
