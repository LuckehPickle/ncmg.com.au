# frozen_string_literal: true

class Staff::MessagesController < ApplicationController
  before_action :require_login

  def index
    @messages = Message.order(created_at: :desc).page(params[:page]).per(25)
  end

  def show
    @message = Message.find params[:id]
  end

  private

  def require_login
    authenticate_staff_member!

    if staff_member_signed_in? && !current_staff_member.can_access_messages
      flash[:notice] = 'You do not have permission to access this page.'
      redirect_to staff_root_path
    end
  end
end
