require "httpclient"

module WineApi
  class Client

    def request(query)
      query = { :apikey => api_key }
      http_client.get(::WineApi::WinesByAri::API_URI, query)
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