require 'test_helper'

class Staff::SettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get staff_settings_index_url
    assert_response :success
  end

end
