# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'sales@ncmg.com.au'
  layout 'mailer'
end
