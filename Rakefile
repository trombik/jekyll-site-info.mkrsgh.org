# frozen_string_literal: true

require "open3"

task default: :test

task test: [:rubocop, :markdownlint, :yamllint, :aspell, :jekyll_build, :htmlproofer]
desc "Perform all tests"

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

task :aspell do
  puts "Running aspell"
  files = []
  directories = %w[makerspace hotel]
  directories.each do |d|
    files += files + Dir["#{d}/**/*.md"]
  end

  files.each do |file|
    puts file
    content = ""
    File.open(file) do |f|
      content = f.read
    end
    # XXX Ubuntu bionic version is lagged behind (0.60.7-20110707)
    # `--mode markdown` was implemented in 0.60.8. add that option when the
    # package is updated.
    o, e, status = Open3.capture3 "aspell " \
      "--lang en " \
      "--mode markdown " \
      "--personal ./.aspell.en.pws list",
                                  stdin_data: content
    raise "failed to run aspell: #{e}" unless status.success?

    next if o.empty?

    o.split("\n").each do |l|
      puts "#{file}: #{l}"
    end
    raise "aspell failed"
  end
end

task :yamllint do
  sh "yamllint -c .yamllint.yml ."
end
