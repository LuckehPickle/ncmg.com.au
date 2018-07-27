class ImagesController < ApplicationController
  # GET /images/:id
  def show
    @image = Image.find_by!(unique_id: params[:unique_id]).order(updated_at: :desc)
    render 'images/not-found' if @image.nil?
    respond_to :js
  end
end
