json.extract! product, :id, :external_id, :name, :url, :price_min, :price_max, :price_retail, :type, :year, :created_at, :updated_at
json.url product_url(product, format: :json)