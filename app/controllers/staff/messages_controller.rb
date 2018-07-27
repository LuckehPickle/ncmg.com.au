class Staff::MessagesController < ApplicationController
  before_action :authenticate_staff_member!

  def index
    @messages = Message.order(created_at: :desc).page params[:page]
  end

  def show
    @message = Message.find params[:id]
  end
end
