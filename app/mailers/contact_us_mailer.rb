class ContactUsMailer < ApplicationMailer
  # An email that is sent to confirm that an email has been sent. Yo dog.
  def confirmation_email(message)
    @name = message.name
    @email = message.email
    @message = message.body
    mail(to: @email, subject: t('mail.contact_us.confirmation.subject'))
  end
end
