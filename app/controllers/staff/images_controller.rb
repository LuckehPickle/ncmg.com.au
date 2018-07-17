class Staff::ImagesController < ApplicationController
  def index
    @images = Image.order(:updated_at).page params[:page]
  end

  def new
  end
end
