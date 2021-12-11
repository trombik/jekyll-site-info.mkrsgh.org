---
title: Electronics and Web
mathjax: true
chartjs: []
toc: true

---

In this post, I would like to share some tips I found useful to write web
contents for electronics. The reason is that: there are many great engineers,
teachers, and hobbyists who document knowledges and their works. However, many
of the web contents are not very modern. Schematics are in PDF or raster image
formats, and hard to view. The pages are not responsive, and difficult to read
on various different devices.

The tricks below are portable, and can be applied to any HTML contents.

## Formulas

[mathjax](https://www.mathjax.org/) is one of the most popular JavaScript
library to write formulas.

The Ohm's law is $ V = IR $, or $ I = { V \over R } $.

```text
{% raw %}
The Ohm's law is $ V = IR $, or $ I = { V \over R } $.
{% endraw %}
```

{: .notice--info }
If you are not familiar with LaTeX, ask a search engine with "LaTeX Math Symbols".

## Scalable circuits in SVG

[KiCad](https://www.kicad.org/) supports exporting schemas to SVG. The feature
is hidden in `[File]` > `[Plot...]` (not `[File]` > `[Export]`!). The output
is not yet scalable. It has `width` and `height`, and you need to remove them.

Open the file in a text editor, and you will see something like:

```xml
<?xml version="1.0" standalone="no"?>
 <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  width="29.700220cm" height="21.000720cm" viewBox="0 0 116930 82680">
```

The root `svg` tag has `width="29.700220cm` and `height="21.000720cm"`. Simply
remove them (but not `viewBox`), and save it. The result is a scalable schema
image in SVG format. Use CSS to resize the image to fit.

{: .notice--info }
You can automate this process with XML parsers, or a JavaScript function that
removes the classes on-the-fly, which is a bit overkill for my use cases.

If you want a part of the whole schema, you can modify it with [inkscape](https://inkscape.org/).

1. Open the SVG file
1. Remove other objects you do not need
1. Select all objects
1. Select `[File]` > `[Document Properties]`. Under `Custom size`, there is a hidden
   option to `Resize page to content ...`. Click
   `[Resize page to drawing or selection]`
1. Select `[File]` > `[Save as]`, choose `Optimized SVG` in the dialog box,
   and `[Save]`.

{: .notice--warning }
Make sure the modified file does not have `width` nor `height`. If it does,
remove them.

The result is a scalable schematic.

{% include figure
  image_path="makerspace/courses/electronics_basic/kicad-led-driver.svg"
  alt="A scalable schematic"
  caption="A scalable schematic"
%}

## Responsive charts in electronics

There are many JavaScript chart libraries, but I found `chart.js` is
relatively simple and easy to use.

`chart.js` supports plugins system, with which you can dynamically generate
datasets. All you need to do is to figure out a JavaScript function that
produces desired values.  The following examples basically do the same thing
with different functions.

{: .notice--info }
The version of `chartjs` used in the examples is 3.6.1.

### AC voltage curve

One of popular charts in electronics is voltage curve. Here is an AC signal
(see the HTML source for the code).

<canvas id="ac_wave"></canvas>
<script>
function rad(x) {
    return (x / 360) * 2 * Math.PI
};

var ctx = document.getElementById("ac_wave");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 3),
    datasets: [
        {
            label: "AC signal",
            function: function(x) { return Math.sin(rad(x)) * 12 },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false,
            pointRadius: 0
        }
    ]
};

var myFunctionChart = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [{
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    }],
    options: {
        plugins: {
            title: {
                text: "AC at Vpeak = 12V",
                display: true
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    display: true,
                    text: "Vin"
                },
                ticks: {
                    stepSize: 2,
                    callback(value, index, values) {
                        return `${value} V`;
                    }
                }
            }
        }
    }
});
</script>

### Diode I-V curve

Another example is diode I-V curve. The diode equation is:

$$ I = I_{s} ( e^ { qV \over nkT } - 1 ) $$

You need to provide a JavaScript function of the above function.

```js
function kelvin(c) {
  const absoluteZero = 273;
  return c + absoluteZero;
}

function diodeCurrent(v) {
    const k = 1.38e-23;
    const q = 1.609e-19;
    var I_s = 0.000000005; /* 5 nA at 25 degree Celsius */
    var n = 1.6;

    var qV = q * v;
    var nKT = n * k * kelvin(25);
    return I_s * (Math.exp(qV / nKT) - 1);
}
```

<canvas id="diode_i_v"></canvas>
<script>
function kelvin(c) {
  const absoluteZero = 273;
  return c + absoluteZero;
}

function diodeCurrent(v) {
    const k = 1.38e-23;
    const q = 1.609e-19;
    var I_s = 0.000000005; /* 5 nA at 25 degree Celsius */
    var n = 1.6;

    var qV = q * v;
    var nKT = n * k * kelvin(25);
    return I_s * (Math.exp(qV / nKT) - 1);
}

var ctx = document.getElementById("diode_i_v");
var data = {
    labels: Array.from({length: 100 + 1}, (x, i) => i / 100),
    datasets: [
        {
            label: "I",
            function: function(x) { return diodeCurrent(x) },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false,
            pointRadius: 0
        },
    ]
};

var myDiodeIV = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [{
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    }],
    options: {
        plugins: {
            title: {
                text: "Diode I - V curve",
                display: true
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "V"
                },
            },
            y: {
                max: 2,
                title: {
                    display: true,
                    text: "I",
                },
                ticks: {
                    display: true,
                    callback(value, index, values) {
                        return `${value} A`;
                    },
                }
            }
        }
    }
});
</script>

### Inverted amplifier

See the code at [https://jsfiddle.net/g1madxbw/](https://jsfiddle.net/g1madxbw/).

<canvas id="inverted_amp"></canvas>

<script>
function rad(x) {
    return (x / 360) * 2 * Math.PI
};

var ctx = document.getElementById("inverted_amp");
var data = {
    labels: Array.from({length: 361}, (x, i) => i * 3),
    datasets: [
        {
            label: "Vin",
            function: function(x) { return Math.sin(rad(x)) * 1.2 },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false,
            pointRadius: 0
        },
        {
            label: "Vout",
            function: function(x) { return Math.sin(rad(x)) * -12 },
            borderColor: "rgba(192, 75, 192, 1)",
            data: [],
            fill: false,
            pointRadius: 0
        }
    ]
};

var myInvertedAmpChart = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [{
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    }],
    options: {
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            title: {
                text: "Inverted amplifier at A = -10",
                display: true
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    display: true,
                    text: "Vin"
                },
                ticks: {
                    stepSize: 2,
                    callback(value, index, values) {
                        return `${value} V`;
                    }
                }
            }
        }
    }
});
</script>
