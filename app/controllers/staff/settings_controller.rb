class Staff::SettingsController < ApplicationController
  before_action :authenticate_staff_member!

  def index
  end
end
