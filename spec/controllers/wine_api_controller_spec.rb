require 'rails_helper'

describe WineApiController do
  let(:uri) { URI('http://services.wine.com/api/beta2/service.svc/JSON/catalog') }
  let(:query) { { :apikey => '1234' } }

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
end
