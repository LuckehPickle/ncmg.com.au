# frozen_string_literal: true

class Staff::StaffController < ApplicationController
  before_action :authenticate_staff_member!

  def index; end
end
