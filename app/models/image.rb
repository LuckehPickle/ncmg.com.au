class Image < ApplicationRecord
  has_one_attached :file
  has_many :labels
  validates :featured, :hidden, presence: true
  validate :attached_file_is_image

  private

  def attached_file_is_image
    if file.attached? && !file.content_type.image?
      errors.add(:file, 'must be an image')
    end
  end
end
