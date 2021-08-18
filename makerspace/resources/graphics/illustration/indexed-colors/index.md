---
lang: en
title: Turn photo into vector illustration with indexed colours
header:
  overlay_image: /assets/img/makerspace/resources/graphics/illustration/indexed-colors/before-and-after.png
  overlay_filter: 0.4
  show_overlay_excerpt: false
---

## Summary

By removing details and reducing colours, you can create a vector graphic from
a photo. The modified image is then traced by colours. The result is a scalable
`SVG` image. In this article, a full colour image is converted to 32 colours.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/before-and-after.png"
    caption: 'Photo by <a href="https://unsplash.com/@aiony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aiony Haust</a> on <a href="https://unsplash.com/images/people?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
%}

The process is:

- Removing details (GIMP)
- Reducing colours (GIMP)
- Exporting the modified image (GIMP)
- Create paths by tracing colours (inkscape)

The generated `SVG` image can be used, for example, in other designs, or
prints.

## Requirements

- GIMP (without third-party plug-ins, or filters)
- inkscape

## Opening the file

Download [the original file](/assets/img/makerspace/resources/graphics/illustration/indexed-colors/aiony-haust-ZXKL4mwbSRA-unsplash.jpg). Launch GIMP, and open it by `File` -> `Open`. As the file has
embedded color profile, GIMP asks you to convert or keep the color profile. If
you don't know what the color profile is, simply choose `Convert` with default
options.

Color profiles are used for displaying same colours in different output
devices. See [Color management article on Wikipedia](https://en.wikipedia.org/wiki/Color_management)
for details.
{: .notice--info }

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/01-convert-rgb-working-space.png"
    alt: "Convert RGB working space dialog"
%}

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/02-image.png"
    alt: "The opened image in GIMP"
%}

## Removing details

Select `Filter` > `Enhance` > `Despeckle`. In the dialog, make sure `adaptive` is
unticked.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/03-filter-despeckle.png"
    caption: "Despeckle filter dialog"
%}

The image becomes blurred a bit.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/03-image.png"
    caption: "The image with Despeckle filter applied"
%}

Select `Filter` > `Blur` > `Selective Gaussian Blur`. Accept all defaults, and
click `OK` to apply.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/04-filter-selective-gaussian-blur.png"
    caption: "Selective Gaussian Blur filter dialog"
%}

Details has been removed from the image.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/04-image.png"
    caption: "The image with Selective Gaussian Blur filter applied"
%}

## Reducing colors

Select `Image` > `Mode` > `Indexed`. In the dialog, select `Generate optimum
palette`, choose 32 in `Maximum numbers of colors`. Click `Convert` to apply.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/05-indexed-color-conversion.png"
    caption: "Indexed Color Mode dialog"
%}

Now the image has 32 colours.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/05-image.png"
    alt: "The image with reduced colours"
%}

Back to RGB mode by selecting `Image` > `Mode` > `RGB`.

Optionally, you may smooth outlines further again by `Filter` > `Enhance` >
`Despeckle`. In the dialog, make sure `adaptive` is unticked.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/06-image.png"
    caption: "The image with Despeckle filter applied again"
%}

## Exporting the modified image

The original image is JPEG, but the modified image has reduced numbers of
colours. For that reason, the image should be exported in PNG format, not
JPEG.  Otherwise, JPEG would introduce block noise, or _compression artifact_.

Export the modified image by `File` > `Export As ...`. Choose a name of the
file, such as `example.png`.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/07-export.png"
    caption: "Export dialog"
%}

In `Export Image as PNG` dialog, accept all the defaults by clicking `Export`.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/08-export-image-as-png.png"
    caption: "Export Image as PNG dialog"
%}

## Create paths by tracing colours

Launch `inkscape`. Import the `PNG` file by `File` > `Open`.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/09-open.png"
    caption: "Open dialog of inkscape"
%}

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/10-image.png"
    caption: "Opened image"
%}

Select `Path` > `Trace Bitmaps`. On `Trace bitmaps` tab, select `Multiple
scans` and `Colors`, and increase `Scans` to 32. To see the preview, click the
window in which the image is shown. Click `OK` to apply the change.

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/11-trace-bitmaps.png"
    caption: "Opening Trace bitmap menu"
%}

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/11-trace-bitmaps-dialog.png"
    alt: "Trace bitmap dialog"
%}

With `Edit paths by nodes` tool, you can see the generated paths.
{: .notice--info }

{% responsive_image
    path: "assets/img/makerspace/resources/graphics/illustration/indexed-colors/12-edit-paths-by-nodes.png"
    caption: "Showing generated paths by using Edit Paths by Nodes tool"
%}

## Further improvements

You may fine-tune the image by the followings:

- Reduce or increase the number of colours
- Manually remove details
- Choose different parameters in filter options instead of accepting defaults

## Files

Here is the list of files used in the article.

- [example.xcf](/assets/img/makerspace/resources/graphics/illustration/indexed-colors/example.xcf), GIMP file
- [example.png](/assets/img/makerspace/resources/graphics/illustration/indexed-colors/example.png), exported `PNG` file
- [example.svg](/assets/img/makerspace/resources/graphics/illustration/indexed-colors/example.svg), `SVG` file
