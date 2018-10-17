# frozen_string_literal: true

# Represents a message sent from the contact form
class Message < ApplicationRecord
  paginates_per 25

  with_options presence: true do
    validates :name, length: { maximum: 256 }
    validates :email, :body
  end

  attr_writer :subject
end
