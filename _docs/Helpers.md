# Helpers

## responsive_image

`responsive_image` generates `figure` with `srcset`.

```yaml
{% responsive_image
    path: "assets/img/Busy-Alley.jpg"
    alt: "Many people observing the survey in front of our property"
    caption: "Neighbours observing the survey. Wat Bo, Siem Reap. &copy; Tomoyuki Sakurai"
%}
```

```html
<figure class="">
  <img src="/assets/img/resized/Busy-Alley-480x853.jpg" alt="Many people observing the survey in front of our property" srcset="    /assets/img/resized/Busy-Alley-480x853.jpg 480w, /assets/img/Busy-Alley.jpg 750w" />

    <figcaption>
      Neighbours observing the survey. Wat Bo, Siem Reap. &copy; Tomoyuki Sakurai
    </figcaption>

</figure>
```

## Showcases

Create showcases with images and descriptions.

`showcases` is a variable to hold a list of `showcase`.

| Key | Description | Mandatory? |
|-----|-------------|------------|
| `image_path` | Path to image file | Yes |
| `alt` | `alt` of the image | No |
| `caption` | Caption of the image | No |
| `title` | Title of the text | No |
| `text` | The text | Yes |

### Usage

Assign `showcases` variable in `frontmatter`.

```yaml
---
showcases:
  - image_path: /assets/img/foo.png
    alt: ALT text to desceibe the image
    caption: The caption
    title: The Title
    text: |
      The text
```

Include the template.

```liquid
{% include local/showcases.html %}
```
