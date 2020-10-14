# frozen_string_literal: true

require "digest"
require "json"

module Jekyll
  # custom liquid tag to render charts with Chart.js.
  class Chartjs < Liquid::Tag
    def initialize(tag_name, arg, liquid_options)
      super
      @opts = arg.split(/\s+/).map { |i| i.split("=") }.to_h
      @opts["id"] = Digest::SHA1.hexdigest @opts["name"]
    end

    def check_sanity(opts)
      raise ArgumentError, "missing required option: `name`" unless opts.key?("name")
      raise ArgumentError, "missing required option: `chart`" unless opts.key?("chart")
    end

    def render(context)
      chart = context["page"]["chartjs"].select { |c| c["name"] == @opts["name"] }.first
      json = chart["chart"].to_json
      <<-HTML.gsub(/^\s+/, "")
      <canvas id="#{@opts['id']}"></canvas>
      <script>
        var opts = JSON.parse('#{json}')
        var ctx = document.getElementById('#{@opts['id']}').getContext('2d')
        var chart_#{@opts['id']} = new Chart(ctx, opts)
      </script>
      HTML
    end
  end
end
Liquid::Template.register_tag("chartjs", Jekyll::Chartjs)
