# frozen_string_literal: true

class CreateLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :labels do |t|
      t.belongs_to :image, index: true
      t.string :content, null: false
      t.timestamps
    end
  end
end
