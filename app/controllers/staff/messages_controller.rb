# frozen_string_literal: true

# A controller for dealing with messages.
class Staff::MessagesController < ApplicationController
  before_action :require_login

  # GET /staff/messages
  def index
    @messages = Message.order(created_at: :desc).page(params[:page]).per(25)
  end

  # GET /staff/messages/:id
  def show
    @message = Message.find params[:id]
  end

  # DELETE /staff/messages/:id
  def destroy
    @message = Message.find params[:id]
    @message.destroy

    redirect_to staff_messages_path
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
