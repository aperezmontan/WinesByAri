require 'rails_helper'

RSpec.describe "products/new", type: :view do
  before(:each) do
    assign(:product, Product.new(
      :external_id => 1,
      :name => "MyString",
      :url => "MyString",
      :price_min => "",
      :price_max => "",
      :price_retail => "",
      :type => "",
      :year => "MyString"
    ))
  end

  it "renders new product form" do
    render

    assert_select "form[action=?][method=?]", products_path, "post" do

      assert_select "input#product_external_id[name=?]", "product[external_id]"

      assert_select "input#product_name[name=?]", "product[name]"

      assert_select "input#product_url[name=?]", "product[url]"

      assert_select "input#product_price_min[name=?]", "product[price_min]"

      assert_select "input#product_price_max[name=?]", "product[price_max]"

      assert_select "input#product_price_retail[name=?]", "product[price_retail]"

      assert_select "input#product_type[name=?]", "product[type]"

      assert_select "input#product_year[name=?]", "product[year]"
    end
  end
end
