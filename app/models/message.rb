# frozen_string_literal: true

class Message < ApplicationRecord
  paginates_per 25
  validates :name,  presence: true, length: { maximum: 256 }
  validates :email, presence: true
  validates :body,  presence: true
end
