class Staff::ImagesController < ApplicationController
  before_action :require_login

  def index
    @images = Image.order(created_at: :desc).page(params[:page]).per(25)
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
  end

  def update
    @image = Image.find_by!(unique_id: params[:unique_id])

    if @image.update images_params
      redirect_to staff_images_path, notify: 'Success!'
    else
      respond_to do |format|
        format.js   { render 'failure' }
        format.html { render 'edit' }
      end
    end
  end

  def destroy
    @image = Image.find_by!(unique_id: params[:unique_id])
    @image.destroy
    redirect_to staff_images_path, notify: 'Successfully deleted image.'
  end

  private

  def images_params
    params.require(:image).permit(:title, :featured, :hidden)
  end

  def image_params(my_params)
    my_params.permit(:title, :file, :featured, :hidden)
  end

  def require_login
    authenticate_staff_member!

    if staff_member_signed_in? and !current_staff_member.can_access_images
      flash[:notice] = 'You do not have permission to access this page.'
      redirect_to staff_root_path
    end
  end
end
