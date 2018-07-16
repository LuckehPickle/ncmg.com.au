require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  test "should not save empty messages" do
    message = Message.new
    assert_not message.save
  end
end
