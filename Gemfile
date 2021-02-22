# frozen_string_literal: true

source "https://rubygems.org"

# to publish on github page
# gem 'github-pages', group: :jekyll_plugins

# to publich without github page
gem "jekyll"

# for generating QR code images
gem "rqrcode"

# for rake tasks
gem "rake"

# for CI
gem "html-proofer"
gem "rubocop"

group :jekyll_plugins do
  gem "jekyll-archives"
  gem "jekyll-browsersync"
  gem "jekyll-minifier"
  gem "jekyll-paginate-v2"
  gem "jekyll-polyglot"

  # XXX fixes wildlyinaccurate#101
  gem "jekyll-responsive-image", git: "https://github.com/salomvary/jekyll-responsive-image.git", ref: "25c6695d"

  gem "jekyll-youtube"
end
gem "minimal-mistakes-jekyll"

# XXX https://github.com/guard/listen/issues/475
gem "rb-kqueue", git: "https://github.com/stevebob/rb-kqueue.git", branch: "handle-unexpected-events"
