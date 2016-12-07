class Product
  include Mongoid::Document
  include Mongoid::Timestamps

  field :external_id, type: Integer
  field :name, type: String
  field :url, type: String
  field :price_min, type: BigDecimal
  field :price_max, type: BigDecimal
  field :price_retail, type: BigDecimal
  field :type, type: String
  field :year, type: String

  validates_presence_of :name, :url, :price_min, :price_max, :price_retail, :type, :year

end
