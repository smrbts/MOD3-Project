Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :create, :update, :destroy]
  resources :scores, only: [:index, :create]
  get 'sprite_circle', to: "hosted_images#sprite_circle"
end
