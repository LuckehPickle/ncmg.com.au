Rails.application.routes.draw do
  devise_for :staff_members,
             path: 'auth',
             path_names: { sign_in: 'login', sign_out: 'logout' },
             skip: [:registrations],
             controllers: { registrations: 'staff_members/registrations' }

  devise_scope :staff_member do
    get 'staff/preferences', to: 'staff_members/registrations#edit', as: 'edit_staff_member_registration'
    put 'staff/preferences', to: 'staff_members/registrations#update', as: 'staff_member_registration'
  end

  root 'landing#index'
  post '/contact', to: 'landing#contact'
  resources :images, only: [:show], param: :unique_id

  namespace :staff do
    root to: 'staff#index'
    resources :messages, only: [:index, :show]
    resources :images, except: :show, param: :unique_id
    resources :members, except: :show
    resources :settings, only: [:index, :update]
  end
end
