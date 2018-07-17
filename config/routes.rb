Rails.application.routes.draw do
  devise_for :staff_members, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' }
  root 'landing#index'
  post '/contact', to: 'landing#contact'
  namespace :staff do
    root to: 'staff#index'
    resources :messages, only: [:index, :show]
    resources :images, only: [:index, :new, :create]
    resources :members
    get '/settings', to: 'settings#index'
  end
end
