---
layout: single
lang: en
title: Chartjs example
toc: true
toc_sticky: true
mathjax: true

chartjs:
  - name: simple_bar_chart
    chart:
      type: bar
      data:
        labels:
          - Red
          - Blue
          - Yellow
          - Green
          - Purple
          - Orange
        datasets:
          - label: "# of Votes"
            data:
              - 12
              - 19
              - 3
              - 5
              - 2
              - 3
            backgroundColor:
              - rgba(255,  99, 132, 0.2)
              - rgba( 54, 162, 235, 0.2)
              - rgba(255, 206,  86, 0.2)
              - rgba( 75, 192, 192, 0.2)
              - rgba(153, 102, 255, 0.2)
              - rgba(255, 159,  64, 0.2)
            borderColor:
              - rgba(255,  99, 132, 1)
              - rgba( 54, 162, 235, 1)
              - rgba(255, 206,  86, 1)
              - rgba( 75, 192, 192, 1)
              - rgba(153, 102, 255, 1)
              - rgba(255, 159,  64, 1)
            borderWidth: 1
      options:
        scales:
          y:
            ticks:
              beginAtZero: true
  - name: simple_line_chart
    chart:
      type: line
      data:
        labels:
          - January
          - February
          - March
          - April
          - May
          - June
          - July
        datasets:
          - label: My First Dataset
            data: [65, 59, 80, 81, 56, 55, 40]
            fill: false
            borderColor: rgb(75, 192, 192)
            lineTension: 0.1

---

This is an example page to explain how to create a post, or a page, with
charts with a custom `chartjs`, implemented in `_plugins/chartjs.rb`. The
version of `chartjs` is 3.6.1.

`_plugins/chartjs.rb` implements a custom `liquid` tag, `chartjs`. `chartjs`
liquid tag creates a chart in the page from data in the front matter of the
page.

The plugin is a wrapper to pass datasets and configuration of a chart to
[`chart.js`](https://www.chartjs.org/). `chart.js` has simple interfaces to
average users. The custom plugin simply passes whatever it has been given to
`chart.js`.

## Configuration

Define `chartjs` top-level key in the front matter of the post (or the page).
The value of the key is an array of `chartjs` configurations. An element of
the array is a hash. The hash must have two keys: `name`, which uniquely
identify the chart in the post, and `chart`, which is passed to
the constructor of `Chart` class (see
[the official usage example](https://www.chartjs.org/docs/latest/getting-started/usage.html)).
The key `chart` requires at least two keys, `data`, a dataset, and `type`, the
type of chart to display in the post. The following example is a very minimum
example.

```yaml
---
chartjs:
  - name: an_example
    chart:
      type: line
      data:
        labels:
          - January
          - February
          - March
          - April
          - May
          - June
          - July
        datasets:
          - label: My First Dataset
            data: [65, 59, 80, 81, 56, 55, 40]
```

To display a more fancy chart, pass more options. Each chart type has detailed
documentation for possible options, for example, see
[Line chart page](https://www.chartjs.org/docs/latest/charts/line.html).

Then, add the custom liquid tag to the content of the post. The tag require a
single argument, `name` followed by `=`, and the name of the chart.. For
example, `name=NAME_OF_CHART`. No space is allowed. `name = NAME_OF_CHART`
will not work.

{% comment %}
    rouge, the syntax highlighter, cannot recognise assignment without quote.
    "simple_bar_chart" does not get a proper <span> class when language is
    liquid. use ruby instead here as a workaround
{% endcomment %}

```ruby
{% raw %}
{% chartjs name=an_example %}
{% endraw %}
```

## Simple bar chart example

### The Chart

{% chartjs name=simple_bar_chart %}

### Data in front matter

```yaml

chartjs:
  - name: simple_bar_chart
    chart:
      type: bar
      data:
        labels:
          - Red
          - Blue
          - Yellow
          - Green
          - Purple
          - Orange
        datasets:
          - label: "# of Votes"
            data:
              - 12
              - 19
              - 3
              - 5
              - 2
              - 3
            backgroundColor:
              - rgba(255,  99, 132, 0.2)
              - rgba( 54, 162, 235, 0.2)
              - rgba(255, 206,  86, 0.2)
              - rgba( 75, 192, 192, 0.2)
              - rgba(153, 102, 255, 0.2)
              - rgba(255, 159,  64, 0.2)
            borderColor:
              - rgba(255,  99, 132, 1)
              - rgba( 54, 162, 235, 1)
              - rgba(255, 206,  86, 1)
              - rgba( 75, 192, 192, 1)
              - rgba(153, 102, 255, 1)
              - rgba(255, 159,  64, 1)
            borderWidth: 1
      options:
        scales:
          y:
            ticks:
              beginAtZero: true
```

### Tag in the post

```ruby
{% raw %}
{% chartjs name=simple_bar_chart %}
{% endraw %}
```

## Simple line chart

### The Chart

{% chartjs name=simple_line_chart %}

### Data in front matter

```yaml
chartjs:
  - name: simple_line_chart
    chart:
      type: line
      data:
        labels:
          - January
          - February
          - March
          - April
          - May
          - June
          - July
        datasets:
          - label: My First Dataset
            data: [65, 59, 80, 81, 56, 55, 40]
            fill: false
            borderColor: rgb(75, 192, 192)
            lineTension: 0.1
```

### Tag in the post

```ruby
{% raw %}
{% chartjs name=simple_line_chart %}
{% endraw %}
```

## Function example

To draw math functions, such as `sin(x)` or `cos(x)`, you need to code
in JavaScript. `chartjs` plugin does not support functions.

### The Chart

<canvas id="waves"></canvas>
<script>

function rad(degree) {
    return (degree / 360) * 2 * Math.PI
};

var ctx = document.getElementById("waves");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 2),
    datasets: [{
        label: "f(x) = cos(x)",
        function: function(x) { return Math.cos(rad(x)) },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false,
        pointRadius: 0
    },
    {
        label: "f(x) = sin(x)",
        function: function(x) { return Math.sin(rad(x)) },
        borderColor: "rgba(153, 102, 255, 1)",
        data: [],
        fill: false,
        pointRadius: 0
    }]
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
        scales: {
            y: {
                ticks: {
                    stepSize: 0.5,
                    beginAtZero:true
                }
            }
        }
    }
});
</script>

### The JavaScript code

```html
{%- raw %}
<canvas id="waves"></canvas>
<script>

function rad(degree) {
    return (degree / 360) * 2 * Math.PI
};

var ctx = document.getElementById("waves");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 2),
    datasets: [{
        label: "f(x) = cos(x)",
        function: function(x) { return Math.cos(rad(x)) },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false,
        pointRadius: 0
    },
    {
        label: "f(x) = sin(x)",
        function: function(x) { return Math.sin(rad(x)) },
        borderColor: "rgba(153, 102, 255, 1)",
        data: [],
        fill: false,
        pointRadius: 0
    }]
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
        scales: {
            y: {
                ticks: {
                    stepSize: 0.5,
                    beginAtZero:true
                }
            }
        }
    }
});
</script>{% endraw %}
```

## AC wave example

Here is an example of a typical AC wave at `Vpeak` = 12 V.

### The Chart

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

### The JavaScript code

```html
{%- raw %}
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
</script>{% endraw %}
```

## Amplifier example

Here is an example of input and output of inverted amplifier.

### The Chart

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

### The JavaScript code

```html
{%- raw %}
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
</script>{% endraw %}
```

## Diode I-V curve example

The diode equation is:

$$ I = I_{s} ( e^ { qV \over nkT } - 1 ) $$

* $$ I_{s} $$ is reverse saturation current
* $$ V $$ is applied voltage
* $$ q $$ is electron charge, 1.609e-19 coulombs
* $$ k $$ is Boltzmann's constant, 1.38e-23
* $$ T $$ is absolute temperature in Kelvin
* $$ n $$ is a junction constant, between 1 and 2

### The Chart

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

### The JavaScript code

```html
{%- raw %}
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
</script>{% endraw %}
```
