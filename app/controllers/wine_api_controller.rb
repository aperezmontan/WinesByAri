class WineApiController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :check_for_cancel, :only => [:load_data]

  #GET /data_request_options
  def data_request_options
    if request.xhr?
      render :layout => false
    end
  end

  # GET /delete_data
  def delete_data
    products = ::Product.not.user_added
    products.destroy_all

    redirect_to root_path
  end

  # GET /request_data
  def request_data
  end

  # POST /load_data
  def load_data
    amount =  api_params["amount"].nil? || api_params["amount"].empty? ? 500 : api_params["amount"]
    ::Product.not.user_added.destroy_all
    @response = client.request({ :size => amount} )

    ::Product.load_api_data(@response.body)

    if request.xhr?
      render :layout => false, :status => 200
    else
      redirect_to root_path
    end
  end

  private

  def check_for_cancel
    if(params.key?("cancel"))
      redirect_to root_path
    end
  end

  def api_params
    params.require(:products).permit(:amount)
  end

  def client
    @client ||= ::WineApi::Client.new
  end
end
