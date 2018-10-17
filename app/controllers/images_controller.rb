# frozen_string_literal: true

# A controller for managing images
class ImagesController < ApplicationController
  # GET /images
  def index
    @images = Image.with_attached_file.page(params[:page]).per(24)
  end

  # GET /images/:id
  def show
    @image = Image.with_attached_file.find_by(unique_id: params[:unique_id])
    render 'images/not-found' if @image.nil?
    respond_to :js
  end
end
