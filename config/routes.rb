Rails.application.routes.draw do
  devise_for :staff_members, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' }
  root 'landing#index'
  post '/contact', to: 'landing#contact'
  resources :images, only: [:show], param: :unique_id
  namespace :staff do
    root to: 'staff#index'
    resources :messages, only: [:index, :show]
    resources :images, except: :show, param: :unique_id
    resources :members
    get '/settings', to: 'settings#index'
  end
end
