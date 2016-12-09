class WineApiController < ApplicationController

  API_URI = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog'.freeze

  # POST /request_data
  def request_data
    uri = URI(API_URI)
    query = { :apikey=> '1234' }
    @response = ::HTTPClient.get(uri, query)

    ::Product.load_api_data(@response.body)

    render :nothing => true, :status => @response.status
  end
end
