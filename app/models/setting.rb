# frozen_string_literal: true

class Setting < ApplicationRecord
  validates :contact_email, presence: true
end
