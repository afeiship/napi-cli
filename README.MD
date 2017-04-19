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

## rails cmd:
```bash
# user model:
rails generate scaffold User name:string email:string
rake db:migrate

# micropost model:
rails generate scaffold Micropost content:string user_id:integer
rake db:migrate

# static pages part:
# get "static_pages/home"
# get "static_pages/help"

rails generate controller StaticPages home help --no-test-framework


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