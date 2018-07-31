class Setting < ApplicationRecord
  validates :contact_email, presence: true
end
