class User < ApplicationRecord

    ## const:
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    ## filters:
    before_save { self.email = email.downcase }

    ## relationship
    has_many :microposts

    ## validates:
    validates :name,  presence: true, length: { maximum: 50 }
    validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },uniqueness: { case_sensitive: false }
    validates :password, presence: true, length: { minimum: 6 }
    validates :password_confirmation, presence: true
    
    ## secure password:
    has_secure_password


end
