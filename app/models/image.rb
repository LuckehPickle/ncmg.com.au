class Image < ApplicationRecord
  has_one_attached :file
  has_many :labels
  validates :title, :featured, presence: true
end
