# frozen_string_literal: true

class AddSpamCountToSetting < ActiveRecord::Migration[5.2]
  def change
    add_column :settings, :spam_count, :integer, default: 0, null: false
  end
end
