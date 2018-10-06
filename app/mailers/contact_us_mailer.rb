# frozen_string_literal: true

class ContactUsMailer < ApplicationMailer
  # An email that is sent to confirm that an email has been sent. Yo dog.
  def confirmation_email(message)
    @name = message.name
    @email = message.email
    @message = message.body
    settings = Setting.first_or_create
    mail(to: @email, subject: t('mail.contact_us.confirmation.subject'), from: settings.contact_email)
  end

  def contact_email(message)
    @name = message.name
    @email = message.email
    @message = message.body
    settings = Setting.first_or_create
    mail(to: settings.contact_email, subject: format(t('mail.contact_us.contact.subject'), name: @name), from: settings.contact_email)
  end
end
