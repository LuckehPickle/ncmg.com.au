class AddUniqueIdToImages < ActiveRecord::Migration[5.2]
  def change
    add_column :images, :unique_id, :string, index: true, unique: true, null: false
  end
end
