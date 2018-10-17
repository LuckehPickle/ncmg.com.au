# frozen_string_literal: true

require 'uploads'

# An image uploaded by a staff member
class Image < ApplicationRecord
  has_one_attached :file

  validates :title, presence: true
  validate :attached_file_is_image
  before_create :create_unique_identifier

  def to_param
    unique_id
  end

  def file_variant(width:, height:)
    spec = Uploads.resize_to_fill width: width, height: height, blob: file.blob
    variation = ActiveStorage::Variation.new spec
    ActiveStorage::Variant.new(file.blob, variation)
  end

  private

  def attached_file_is_image
    errors.add(:file, 'must be an image') if file.attached? && !file.image?
  end

  def create_unique_identifier
    loop do
      self.unique_id = SecureRandom.base58(6)
      break unless self.class.exists?(unique_id: unique_id)
    end
  end
end
