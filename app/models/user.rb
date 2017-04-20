class User < ApplicationRecord

    ## const:
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    ## filters:
    before_save { self.email = email.downcase }
    before_create :create_remember_token

    ## relationship
    has_many :microposts

    ## validates:
    validates :name,  presence: true, length: { maximum: 50 }
    validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },uniqueness: { case_sensitive: false }
    validates :password, presence: true, length: { minimum: 6 }
    validates :password_confirmation, presence: true
    
    ## secure password:
    has_secure_password


    ## create remeber_token:
    def User.new_remember_token
        SecureRandom.urlsafe_base64
    end

    def User.encrypt(token)
        Digest::SHA1.hexdigest(token.to_s)
    end
    
    private
        def create_remember_token
            self.remember_token = User.encrypt(User.new_remember_token)
        end

end
