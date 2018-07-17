class Staff::MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc).page params[:page]
  end

  def show
    @message = Message.find params[:id]
  end
end
