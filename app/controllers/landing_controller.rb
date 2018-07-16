class LandingController < ApplicationController
  # GET /
  def index
    @message = Message.new
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
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :body)
  end
end
