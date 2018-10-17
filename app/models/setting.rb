# frozen_string_literal: true

# A single table which tracks site settings.
class Setting < ApplicationRecord
  validates :contact_email, presence: true
end
