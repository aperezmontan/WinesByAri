require 'rails_helper'

RSpec.describe "products/edit", type: :view do
  before(:each) do
    @product = assign(:product, Product.create!(
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

  it "renders the edit product form" do
    render

    assert_select "form[action=?][method=?]", product_path(@product), "post" do

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
