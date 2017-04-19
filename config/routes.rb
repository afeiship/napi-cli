Rails.application.routes.draw do

  # match '/', to: 'static_pages#home', via: 'get'
  root to: 'static_pages#home'
  match '/help', to: 'static_pages#help', via: 'get'
  match '/about', to: 'static_pages#about', via: 'get'
  match '/contact', to: 'static_pages#contact', via: 'get'

  ## register user:
  match '/signup', to: 'users#new', via: 'get'

  resources :microposts
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
