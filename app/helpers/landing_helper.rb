module LandingHelper
  def field_errors(field)
    render template: 'landing/_field-errors', locals: { field: field }
  end
end
