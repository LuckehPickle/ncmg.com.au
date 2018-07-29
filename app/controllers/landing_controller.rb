class LandingController < ApplicationController
  # GET /
  def index
    @message = Message.new
    @images = Image.where(hidden: false).limit(12).order(created_at: :desc)
  end

  # POST /contact
  def contact
    @message = Message.new message_params

    if @message.save
      ContactUsMailer.confirmation_email(@message).deliver_now
      render 'success'
    else
      render 'failure'
    end

    respond_to :js
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :body)
  end
end
