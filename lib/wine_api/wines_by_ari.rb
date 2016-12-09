module WineApi
  class WinesByAri
    API_URI = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog'.freeze
    VALID_ATTRIBUTES = ["Id", "Name", "Url", "Type", "Vintage", "Description", "PriceMax", "PriceMin", "PriceRetail"].freeze
  end
end