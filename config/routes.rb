Rails.application.routes.draw do
  root 'landing#index'
  post '/contact', to: 'landing#contact'
end
