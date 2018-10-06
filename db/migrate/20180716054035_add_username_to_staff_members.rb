# frozen_string_literal: true

class AddUsernameToStaffMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :staff_members, :username, :string, null: false
  end
end
