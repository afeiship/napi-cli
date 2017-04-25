# rails-practice-weibo
> Rails practice for mini weibo system.


## resoruces:
+ Ruby on Rails 4 Tutorial 中文版

## step by step:
```bash
$ heroku create
This is the legacy Heroku CLI. Please install the new CLI from https://cli.heroku.com
Creating app... done, ⬢ salty-tundra-15420
```

## populate data:
```bash
rake db:rest
rake db:populate
```

## rails cmd:
```bash
# 1.user model:
rails generate scaffold User name:string email:string
rake db:migrate

# 2.micropost model:
rails generate scaffold Micropost content:string user_id:integer
rake db:migrate

# 3.static pages part:
# get "static_pages/home"
# get "static_pages/help"

rails generate controller StaticPages home help --no-test-framework

# 4.valide unique for user:
rails generate migration add_index_to_users_email
# add belowe line to migration file: 
    # add_index :users, :email, unique: true
rake db:migrate

# 5.add column: password_digest
rails generate migration add_password_digest_to_users password_digest:string
# check this line in migration file or not:
    # add_column :users, :password_digest, :string
rake db:migrate

# 6.login/logout:
rails generate controller Sessions --no-test-framework

# 7.remember user token:
rails generate migration add_remember_token_to_users
rake db:migrate
#      add_column :users, :remember_token, :string
#      add_index :users, :remember_token


# 8. add admin for users:
rails generate migration add_admin_to_users admin:boolean
rake db:migrate

# 9. add index for microposts:
rails generate migration add_index_to_microposts
# add_index :microposts, [:user_id, :created_at]
rake db:migrate
```



## model-user:
```yaml
user:
    id: integer
    name: string
    email: string
```

## model-micropost:
```yaml
micropost:
    id: integer
    content: string
    user_id: integer
```


## create demo user use IRB:
```bash
User.create(name: "afeiship", email: "test@example.com", password: "happyeveryday", password_confirmation: "happyeveryday")
```