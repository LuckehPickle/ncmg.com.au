class StaffJoinMailer < ApplicationMailer

  def join_email(staff, password)
    @staff = staff
    @password = password
    settings = Setting.first_or_create
    mail(to: staff.email, subject: 'NCMG Staff Account', from: settings.contact_email)
  end
end
