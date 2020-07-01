# frozen_string_literal: true

task default: [:rubocop, :markdownlint, :jekyll_build, :htmlproofer]

task :rubocop do
  sh "rubocop"
end

task :markdownlint do
  sh "node node_modules/markdownlint-cli/markdownlint.js --config .markdownlint.yml --ignore-path .markdownlintignore ."
end

task :jekyll_build do
  sh "jekyll build"
end

task :htmlproofer do
  sh "htmlproofer --url-ignore /^#\$/ --disable-external _site/"
end
