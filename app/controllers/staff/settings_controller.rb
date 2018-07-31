class Staff::SettingsController < ApplicationController
  before_action :require_login

  def index
    @settings = Setting.first_or_create
  end

  def update
    @settings = Setting.first_or_create

    if @settings.update settings_params
      redirect_to staff_root_path, notify: 'Updated settings!'
    else
      respond_to do |format|
        format.html { render index }
        format.js { render 'failure' }
      end
    end
  end

  private

  def require_login
    authenticate_staff_member!

    if staff_member_signed_in? and !current_staff_member.can_access_settings
      flash[:notice] = 'You do not have permission to access this page.'
      redirect_to staff_root_path
    end
  end

  def settings_params
    params.require(:setting).permit(:contact_email)
  end
end
