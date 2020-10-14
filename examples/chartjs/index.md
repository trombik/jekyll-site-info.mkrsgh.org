---
layout: single
lang: en
title: Chartjs example

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
          yAxes:
            - ticks:
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
charts with a custom `chartjs`, implemented in `_plugins/chartjs.rb`.

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

### Chart

{% chartjs name=simple_bar_chart %}

### Data in front matter

```yaml
---
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
          yAxes:
            - ticks:
                beginAtZero: true
```

### Tag in the post

```ruby
{% raw %}
{% chartjs name=simple_bar_chart %}
{% endraw %}
```

## Simple line chart

### Chart

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

### Tag

```ruby
{% raw %}
{% chartjs name=simple_line_chart %}
{% endraw %}
```
