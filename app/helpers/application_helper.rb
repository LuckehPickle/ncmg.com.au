# frozen_string_literal: true

module ApplicationHelper
  def nav_link(target, id, &block)
    is_local = controller_name == 'landing'
    link_to(is_local ? "##{target}" : root_path(anchor: target), id: id, data: { turbolinks: !is_local }, &block)
  end
end
