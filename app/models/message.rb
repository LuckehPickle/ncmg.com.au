class Message
  include ActiveAttr::Attributes
  include ActiveAttr::BasicModel
  include ActiveAttr::MassAssignment

  attribute :name
  attribute :email
  attribute :body

  validates :name,  presence: true, length: { maximum: 256 }
  validates :email, presence: true
  validates :body,  presence: true
end