# frozen_string_literal: true

class RemoveLabels < ActiveRecord::Migration[5.2]
  def change
    drop_table :labels
  end
end
