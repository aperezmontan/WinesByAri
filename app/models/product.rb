class Product
  include Mongoid::Document
  include Mongoid::Timestamps

  field :external_id, type: Integer
  field :name, type: String
  field :url, type: String
  field :description, type: String
  field :price_min, type: Float
  field :price_max, type: Float
  field :price_retail, type: Float
  field :type, type: String
  field :year, type: String

  validates_presence_of :name, :url, :price_min, :price_max, :price_retail, :type
  validates_numericality_of :price_min, :price_max, :price_retail

  def self.load_api_data(data)
    product_list = ::JSON.parse(data)["Products"]["List"]

    product_list.each do |product|
      product.keep_if{ |attribute, value| ::WineApi::WinesByAri::VALID_ATTRIBUTES.include?(attribute) }

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
