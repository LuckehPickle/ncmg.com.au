class AddDefaultValueToImageTitle < ActiveRecord::Migration[5.2]
  def change
    change_column_null :images, :title, true
    def up
      change_column_default :images, :title, 'Untitled Image'
    end
    def down
      change_column_default :images, :title, nil
    end
  end
end
