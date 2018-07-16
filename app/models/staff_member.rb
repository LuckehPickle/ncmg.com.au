class StaffMember < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable
end
