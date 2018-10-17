# frozen_string_literal: true

class LandingController < ApplicationController
  # GET /
  def index
    @message = Message.new
    @images = Image.with_attached_file.where(hidden: false).limit(12).order(created_at: :desc)
    @featured_images = Image.with_attached_file.where(featured: true, hidden: false).limit(6).order(created_at: :desc)
  end

  # POST /contact
  def contact
    return if params[:message][:subject].present?

    @message = Message.new message_params

    if @message.save
      ContactUsMailer.confirmation_email(@message).deliver_now
      ContactUsMailer.contact_email(@message).deliver_now
      render 'success'
    else
      render 'failure'
    end

    respond_to :js
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :subject, :body)
  end
end

