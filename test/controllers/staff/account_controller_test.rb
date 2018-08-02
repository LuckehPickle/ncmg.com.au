require 'test_helper'

class Staff::AccountControllerTest < ActionDispatch::IntegrationTest
  test "should get preferences" do
    get staff_account_preferences_url
    assert_response :success
  end

end
