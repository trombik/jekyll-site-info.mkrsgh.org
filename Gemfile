# frozen_string_literal: true

source "https://rubygems.org"

gem "html-proofer"
gem "irb"
gem "jekyll", "~>4.2.1"
gem "minimal-mistakes-jekyll", "~>4.24.0"
gem "rake"
gem "rqrcode"
gem "rubocop", "~>1.22.3"
gem "webrick"
# rb-kqueue 0.2.8 includes fixes for ruby 3.x
gem "rb-kqueue", ">=0.2.8"

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
