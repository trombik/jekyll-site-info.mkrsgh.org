---
title: Pulse Width Modulation
course: electronics_basic
layout: lesson
tagline: Introduction To PWM
chartjs: true

---

In this lesson, you will learn PWM, a technique to precisely control devices.

<script>
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  red_50: 'rgba(255, 99, 132, 128)',
  orange: 'rgb(255, 159, 64)',
  orange_50: 'rgba(255, 159, 64, 128)',
  yellow: 'rgb(255, 205, 86)',
  yellow_50: 'rgba(255, 205, 86, 128)',
  green: 'rgb(75, 192, 192)',
  green_50: 'rgba(75, 192, 192, 128)',
  blue: 'rgb(54, 162, 235)',
  blue_50: 'rgba(54, 162, 235, 128)',
  purple: 'rgb(153, 102, 255)',
  purple_50: 'rgba(153, 102, 255, 128)',
  grey: 'rgb(201, 203, 207)',
  grey_50: 'rgba(201, 203, 207, 128)'
};

function pwm(x, duty) {
    return x % 360 < duty / 100 * 360 ? 1 : 0;
};
function pwm_high_f(x, duty) {
    return x % 180 < duty / 100 * 180 ? 1 : 0;
};
</script>

## Pulse Width Modulation

Pulse Width Modulation, or PWM in short, is a square wave signal, commonly
used to control LEDs, motors, or servos.

<canvas id="pwm_wave_1"></canvas>

<script>
var ctx = document.getElementById("pwm_wave_1");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 3),
    datasets: [
        {
            label: "Duty = 50%",
            function: function(x) { return pwm(x, 50) },
            borderColor: CHART_COLORS.blue,
            backgroundColor: CHART_COLORS.blue_50,
            data: [],
            pointRadius: 0
        }
    ]
};

var pwmChart = new Chart(ctx, {
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
                text: "PWM wave",
                display: true
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    display: false
                },
                ticks: {
                    display: false,
                    stepSize: 1,
                }
            }
        }
    }
});
</script>

Typical characteristic of PWM includes:

* Voltage
* Duty cycle
* Frequency

## Voltage

Voltage of a PWM signal is the voltage when the signal is high, fixed at a
certain voltage. The voltage depends on the device you control; 12 V for LED
strips, 3.3 V or 5 V for sensors, etc.  When the signal is at that voltage, it
means high, "1" or "on", and when the signal is 0 V, it means low, "0", or
"off".

## Duty cycle

Duty cycle is a duration; how long the signal is high. Bigger duty cycle means
the signal is high for longer time. Duty cycle is expressed as percent; 50 %
duty cycle means the signal is high 50 % of a cycle. 0 % duty cycle means the
signal is always low, and 100 % duty cycle means the signal is always high.

<canvas id="multiple_pwm_waves"></canvas>

<script>
var ctx = document.getElementById("multiple_pwm_waves");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 3),
    datasets: [
        {
            label: "Duty = 75%",
            function: function(x) { return pwm(x, 75) },
            borderColor: CHART_COLORS.red,
            backgroundColor: CHART_COLORS.red_50,
            data: [],
            pointRadius: 0
        },
        {
            label: "Duty = 25%",
            function: function(x) { return pwm(x, 25) + 5 },
            borderColor: CHART_COLORS.green,
            backgroundColor: CHART_COLORS.green_50,
            data: [],
            pointRadius: 0
        },
        {
            label: "Duty = 50%",
            function: function(x) { return pwm(x, 50) + 10 },
            borderColor: CHART_COLORS.blue,
            backgroundColor: CHART_COLORS.blue_50,
            data: [],
            pointRadius: 0
        }
    ]
};

var pwmChart = new Chart(ctx, {
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
                text: "PWM waves at different duty cycles",
                display: true
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    display: false
                },
                ticks: {
                    display: false,
                    stepSize: 5,
                }
            }
        }
    }
});
</script>

You control a device by changing the duty cycle. For example, to decrease
brightness of a LED, decrease the duty cycle, say 10 %. The LED turns on 10 %
of a cycle, and turns off 90 % of a cycle. If you repeat this very quickly,
the brightness of the LED is significantly low and you do not notice the LED
is keep turning on and off because the speed of the change is too high for
human eyes to see.

## Frequency

Another characteristic of PWM is frequency; how many times a signal repeats
the cycle in one second. The unit of frequency is Hz. 100 Hz means the signal
repeats the cycle 100 times per second. The following chart has two different
frequencies of the same duty cycle. The high frequency PWM repeats a cycle two
times more than the low frequency PWM.

<canvas id="high_and_low_freq_pwm"></canvas>

<script>

var ctx = document.getElementById("high_and_low_freq_pwm");
var data = {
    labels: Array.from({length: 360}, (x, i) => i * 3),
    datasets: [
        {
            label: "High frequency",
            function: function(x) { return pwm_high_f(x, 50) },
            borderColor: CHART_COLORS.red,
            backgroundColor: CHART_COLORS.red_50,
            data: [],
            pointRadius: 0
        },
        {
            label: "Low frequency",
            function: function(x) { return pwm(x, 50) + 5 },
            borderColor: CHART_COLORS.green,
            backgroundColor: CHART_COLORS.green_50,
            data: [],
            pointRadius: 0
        },
    ]
};

var pwmChart = new Chart(ctx, {
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
                text: "PWM waves at 50% duty cycle and different frequencies",
                display: true
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    display: false
                },
                ticks: {
                    display: false,
                    stepSize: 5,
                }
            }
        }
    }
});
</script>

If you turn on and off an LED at a very low frequency, say, 50 Hz, you will see the
LED is flickering. When the frequency is 1,000 Hz, or 1 kHz, you will not.

## Other lessons
