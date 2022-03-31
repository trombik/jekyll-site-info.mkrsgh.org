# frozen_string_literal: true

source "https://rubygems.org"

gem "html-proofer"
gem "irb"
gem "jekyll"
gem "minimal-mistakes-jekyll"
gem "rake"
gem "rqrcode"
gem "rubocop"
# XXX https://github.com/guard/listen/issues/475
gem "rb-kqueue", git: "https://github.com/stevebob/rb-kqueue.git", branch: "handle-unexpected-events"

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
