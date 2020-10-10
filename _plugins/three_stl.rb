require "digest"

module Jekyll
  class Three
    class STL < Liquid::Tag

      @@DEFAULTS = {
      }
      def initialize(tag_name, markup, tokens)
        super
        @config = {}
        override_config(@@DEFAULTS)
        params = markup.split
        @stl_url = params.shift.strip
      end

      def override_config(config)
        config.each{ |key,value| @config[key] = value }
      end

      def render(context)
        player = format("player_%<sha1>s", sha1(@stl_url))
        <<-HTML.gsub(/^\s+/, "")
        <div id="#{div_id}"></div>
        <script type="module">
          import * as THREE_STL from '/assets/js/three_stl.js'
          var #{player}
          #{player} = new THREE_STL.Player()
          #{player}.init({
            url: "#{@stl_url}",
            canvas_id: "#{div_id}",
          })
          #{player}.animate()
        </script>
        HTML
      end

      def div_id
        "three_canvas_#{sha1(@stl_url)}"
      end

      def sha1(str)
        Digest::SHA1.hexdigest str
      end
    end
  end
end

Liquid::Template.register_tag("three_stl", Jekyll::Three::STL)
