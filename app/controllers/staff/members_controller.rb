# frozen_string_literal: true

class Staff::MembersController < ApplicationController
  before_action :require_login

  def index
    @staff = StaffMember.page(params[:page]).per(25).order(updated_at: :desc)
  end

  def new
    @staff = StaffMember.new
  end

  def create
    @staff = StaffMember.new staff_params
    password = SecureRandom.base58(rand(6..9))
    @staff.password = password

    if @staff.save
      StaffJoinMailer.join_email(@staff, password).deliver_now
      redirect_to staff_members_path
    else
      respond_to do |format|
        format.js { render 'failure' }
        format.html { render new }
      end
    end
  end

  def edit
    @staff = StaffMember.find(params[:id])
  end

  def update
    @staff = StaffMember.find(params[:id])

    if @staff.update staff_params
      redirect_to staff_members_path
    else
      respond_to do |format|
        format.js { render 'failure' }
        format.html { render new }
      end
    end
  end

  def destroy
    @staff = StaffMember.find(params[:id])
    @staff.destroy
    redirect_to staff_members_path
  end

  private

  def staff_params
    params.require(:staff_member).permit(
      :name,
      :can_access_messages,
      :can_access_images,
      :can_access_staff,
      :can_access_settings,
      :email
    )
  end

  def require_login
    authenticate_staff_member!

    if staff_member_signed_in? && !current_staff_member.can_access_staff
      flash[:notice] = 'You do not have permission to access this page.'
      redirect_to staff_root_path
    end
  end
end
