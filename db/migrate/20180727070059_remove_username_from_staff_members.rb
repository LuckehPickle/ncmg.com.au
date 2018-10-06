# frozen_string_literal: true

class RemoveUsernameFromStaffMembers < ActiveRecord::Migration[5.2]
  def change
    remove_column :staff_members, :username
  end
end
