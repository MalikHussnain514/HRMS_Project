server "23.106.33.179", user: "live", roles: %w{app db web}, port: 8282

set :application, "FreshaBackend"

set :deploy_to, "/home/live/FreshaBackend"

set :repo_url, "ssh://git@gitrepos.com:222/node/FreshaBackend.git"
