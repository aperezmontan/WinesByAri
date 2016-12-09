require "httpclient"

module WineApi
  class Client
    API_URI = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog'.freeze

    def request(query)
      # binding.pry
      query = { :apikey => api_key }
      http_client.get(API_URI, query)
    end

    private

    def api_key
      @api_key ||= ENV["API_KEY"]
    end

    def http_client
      @http_client ||= ::HTTPClient.new
    end
  end
end