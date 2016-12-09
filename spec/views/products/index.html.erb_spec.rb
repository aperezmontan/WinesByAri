require 'rails_helper'

RSpec.describe "products/index", type: :view do
  before(:each) do
    assign(:products, [
      Product.create!(
        :external_id => 2,
        :name => "Name",
        :url => "Url",
        :price_min => "",
        :price_max => "",
        :price_retail => "",
        :type => "Type",
        :year => "Year"
      ),
      Product.create!(
        :external_id => 2,
        :name => "Name",
        :url => "Url",
        :price_min => "",
        :price_max => "",
        :price_retail => "",
        :type => "Type",
        :year => "Year"
      )
    ])
  end

  it "renders a list of products" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Url".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "Type".to_s, :count => 2
    assert_select "tr>td", :text => "Year".to_s, :count => 2
  end
end
