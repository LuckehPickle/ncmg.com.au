# frozen_string_literal: true

# Represents a single staff member with access to staff area
class StaffMember < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :trackable,
         :validatable, :registerable

  before_update :set_password_changed

  protected

  def set_password_changed
    return unless encrypted_password_changed? || !password_changed?

    self.password_changed = true
  end
end
