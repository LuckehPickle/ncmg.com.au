# frozen_string_literal: true

class DeviseCreateStaffMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_members do |t|
      # Member Information
      t.string :name, null: false

      # Permissions
      t.boolean :can_access_messages, null: false, default: false
      t.boolean :can_access_images,   null: false, default: false
      t.boolean :can_access_staff,    null: false, default: false
      t.boolean :can_access_settings, null: false, default: false

      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :staff_members, :email,                unique: true
    add_index :staff_members, :reset_password_token, unique: true
  end
end
