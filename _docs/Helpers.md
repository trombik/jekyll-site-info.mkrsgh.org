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
