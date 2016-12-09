require 'rails_helper'

describe WineApiController do
  before do
    allow_any_instance_of(::WineApi::Client).to receive(:api_key).and_return('1234')
  end

  describe "POST #request_data" do
    it 'makes request to Wine.com API' do
      post :request_data
      expect(assigns(:response)).to be_an_instance_of(::HTTP::Message)
    end

    it 'loads the database with Products' do
      expect(::Product.all.to_a.count).to eq(0)
      post :request_data
      expect(::Product.all.to_a.count).to_not eq(0)
    end
  end

  describe "POST #delete_data" do
    it 'deletes API loaded data from the database' do
      post :request_data
      expect(::Product.all.to_a.count).to_not eq(0)
      post :delete_data
      expect(::Product.all.to_a.count).to eq(0)
    end

    it "deletes only the data that the user has not changed" do
      post :request_data
      expect(::Product.all.to_a.count).to eq(1)
      product = ::Product.all.to_a.first
      product.update(:user_modified => true)
      post :delete_data
      expect(::Product.all.to_a.count).to eq(1)
    end

    it "does not reload data that has been deleted by the user" do
      post :request_data
      expect(::Product.all.to_a.count).to_not eq(0)
      product = ::Product.all.to_a.first
      product.update(:user_modified => true)
      product.destroy
      expect(::Product.all.to_a.count).to eq(0)
      post :request_data
      expect(::Product.all.to_a.count).to eq(0)
    end
  end
end
