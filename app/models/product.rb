class Product
  include Mongoid::Document
  include Mongoid::Timestamps

  field :external_id, type: Integer
  field :name, type: String
  field :url, type: String
  field :description, type: String
  field :price_min, type: BigDecimal
  field :price_max, type: BigDecimal
  field :price_retail, type: BigDecimal
  field :type, type: String
  field :year, type: String

  validates_presence_of :name, :url, :price_min, :price_max, :price_retail, :type, :year

  # VALID_ATTRIBUTES.freeze = ["Id", "Name", "Url", "Type", "Vintage", "Description", "PriceMax", "PriceMin", "PriceRetail"]

  def self.load_api_data(data)
    product_list = ::JSON.parse(data)["Products"]["List"]

    product_list.each do |product|
      product.keep_if{ |attribute, value| ["Id", "Name", "Url", "Type", "Vintage", "Description", "PriceMax", "PriceMin", "PriceRetail"].include?(attribute) }

      product = product.transform_keys do |key|
        case key
        when "Id"
          "external_id"
        when "Vintage"
          "year"
        else
          key.underscore
        end
      end

      new_product = self.new(product)
      new_product.save
    end
  end
end
