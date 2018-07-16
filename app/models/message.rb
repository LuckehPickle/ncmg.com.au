class Message < ApplicationRecord
  validates :name,  presence: true, length: { maximum: 256 }
  validates :email, presence: true
  validates :body,  presence: true
end
