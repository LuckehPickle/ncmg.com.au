class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.string :contact_email, default: 'sales@ncmg.com.au', null: false
      t.timestamps
    end
  end
end
