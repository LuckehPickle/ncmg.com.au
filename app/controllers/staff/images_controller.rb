class Staff::ImagesController < ApplicationController
  def index
    @images = Image.order(updated_at: :desc).page params[:page]
  end

  def new
  end

  def create
    params[:images].each do |image|
      i = Image.new image_params(image)
      i.save
    end
    redirect_to staff_images_path, notice: "Upload complete!"
  end

  def edit
    @image = Image.find_by!(unique_id: params[:unique_id])
    respond_to :js
  end

  private

  def image_params(my_params)
    my_params.permit(:title, :file)
  end
end
