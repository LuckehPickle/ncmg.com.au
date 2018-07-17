class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :title, null: false
      t.boolean :featured, null: false, default: false
      t.timestamps
    end
  end
end
