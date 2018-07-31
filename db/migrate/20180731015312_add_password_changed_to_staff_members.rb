class AddPasswordChangedToStaffMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :staff_members, :password_changed, :boolean, null: false, default: false
  end
end
