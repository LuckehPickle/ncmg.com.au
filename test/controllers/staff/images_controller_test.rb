require 'test_helper'

class Staff::ImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get staff_images_index_url
    assert_response :success
  end

end
