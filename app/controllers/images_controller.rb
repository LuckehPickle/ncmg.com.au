class ImagesController < ApplicationController
  # GET /images/:id
  def show
    @image = Image.find_by_id params[:id]
    render 'images/not-found' if @image.nil?
    respond_to :js
  end
end
