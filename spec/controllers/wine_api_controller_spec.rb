require 'rails_helper'

describe WineApiController do
  before do
    allow_any_instance_of(::WineApi::Client).to receive(:api_key).and_return('1234')
  end

  describe "POST #load_data" do
    it 'makes request to Wine.com API' do
      post :load_data, { :products => { :amount => 1 } }
      expect(assigns(:response)).to be_an_instance_of(::HTTP::Message)
    end

    it 'loads the database with Products' do
      expect(::Product.all.to_a.count).to eq(0)
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to_not eq(0)
    end
  end

  describe "POST #delete_data" do
    let(:valid_attributes) { {"name"=>"Ari's Wine", "url"=>"www.ariswine.com", "type"=>"Razz", "year"=>"1996", "description"=>"Awesome Wine !", "price_max"=>45, "price_min"=>35, "price_retail"=>40} }

    it 'deletes API loaded data from the database' do
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to_not eq(0)
      post :delete_data
      expect(::Product.all.to_a.count).to eq(0)
    end

    it "deletes only the data that the user has not created" do
      post :load_data, { :products => { :amount => 1 } }
      ::Product.create(valid_attributes)
      expect(::Product.all.to_a.count).to eq(2)
      post :delete_data
      expect(::Product.all.to_a.count).to eq(1)
    end

    it "overwrites data that has been modified by the user" do
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to eq(1)
      product = ::Product.all.to_a.first
      product_old_name = product.name
      product.name = "Ari's Wine"
      product.reload
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to eq(1)
      product = ::Product.all.to_a.first
      expect(product.name).to_not eq("Ari's Wine")
      expect(product.name).to eq(product_old_name)
    end

    it "reloads data that has been deleted by the user" do
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to eq(1)
      old_product = ::Product.all.to_a.first
      old_product.destroy
      old_product.reload
      expect(::Product.all.to_a.count).to eq(0)
      post :load_data, { :products => { :amount => 1 } }
      expect(::Product.all.to_a.count).to eq(1)
      product = ::Product.all.to_a.first
      expect(product.description).to eq(old_product.description)
      expect(product.external_id).to eq(old_product.external_id)
      expect(product.name).to eq(old_product.name)
      expect(product.price_min).to eq(old_product.price_min)
      expect(product.price_max).to eq(old_product.price_max)
      expect(product.price_retail).to eq(old_product.price_retail)
      expect(product.url).to eq(old_product.url)
      expect(product.year).to eq(old_product.year)
    end
  end
end
