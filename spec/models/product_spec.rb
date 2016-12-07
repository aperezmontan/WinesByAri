require 'rails_helper'

describe ::Product do
  let(:product_api_data) {
    "{\"Status\":{\"Messages\":[],\"ReturnCode\":0},\"Products\":{\"List\":[{\"Id\":124,\"Name\":\"Francis Ford Coppola Diamond Collection Red Label Zinfandel 1996\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx\",\"Appellation\":{\"Id\":2398,\"Name\":\"Napa Valley\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Napa-Valley\\/wine\\/list.aspx?N=7155+101+2398\",\"Region\":{\"Id\":101,\"Name\":\"California\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/California\\/wine\\/list.aspx?N=7155+101\",\"Area\":null}},\"Labels\":[{\"Id\":\"124m\",\"Name\":\"thumbnail\",\"Url\":\"http:\\/\\/cache.wine.com\\/labels\\/124m.jpg\"},{\"Id\":\"124l\",\"Name\":\"large\",\"Url\":\"http:\\/\\/cache.wine.com\\/labels\\/124l.jpg\"}],\"Type\":\"Wine\",\"Varietal\":{\"Id\":141,\"Name\":\"Zinfandel\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Zinfandel\\/wine\\/list.aspx?N=7155+124+141\",\"WineType\":{\"Id\":124,\"Name\":\"Red Wines\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Red-Wines\\/wine\\/list.aspx?N=7155+124\"}},\"Vineyard\":{\"Id\":999997855,\"Name\":\"Francis Ford Coppola Winery\",\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Winery\\/learnabout.aspx?winery=2879\",\"ImageUrl\":\"http:\\/\\/cache.wine.com\\/aboutwine\\/basics\\/images\\/winerypics\\/2879.jpg\",\"GeoLocation\":{\"Latitude\":-360,\"Longitude\":-360,\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/aboutwine\\/mapof.aspx?winery=2879\"}},\"Vintage\":\"1996\",\"Community\":{\"Reviews\":{\"HighestScore\":0,\"List\":[],\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx?pageType=reviews\"},\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996\\/wine\\/124\\/Detail.aspx\"},\"Description\":\"\",\"GeoLocation\":{\"Latitude\":-360,\"Longitude\":-360,\"Url\":\"http:\\/\\/www.wine.com\\/v6\\/aboutwine\\/mapof.aspx?winery=2879\"},\"PriceMax\":30,\"PriceMin\":20,\"PriceRetail\":25,\"ProductAttributes\":[],\"Ratings\":{\"HighestScore\":0,\"List\":[]},\"Retail\":null,\"Vintages\":{\"List\":[]}}],\"Offset\":0,\"Total\":1,\"Url\":\"\"}}"
  }
  context "api data" do
    it "parses the data and creates new Products" do
      new_products = ::Product.load_api_data(:product_api_data)

      expect(new_products.count).to eq(1)
      expect(new_products.first.external_id).to eq(124)
      expect(new_products.first.name).to eq("Francis Ford Coppola Diamond Collection Red Label Zinfandel 1996")
      expect(new_products.first.url).to eq("http://www.wine.com/v6/Francis-Ford-Coppola-Diamond-Collection-Red-Label-Zinfandel-1996/wine/124/Detail.aspx")
      expect(new_products.first.price_min).to eq(20)
      expect(new_products.first.price_max).to eq(30)
      expect(new_products.first.price_retail).to eq(25)
      expect(new_products.first.type).to eq("Wine")
    end
  end
end
