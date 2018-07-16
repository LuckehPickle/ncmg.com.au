require 'test_helper'

class Staff::StaffControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get staff_root_url
    assert_response :success
  end

end
