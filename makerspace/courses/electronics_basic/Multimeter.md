---
title: Multimeter
course: electronics_basic
layout: lesson
tagline: Your best friend, multimeters

---

In this lesson, you will:

* What a multimeter can do for you
* Learn to use a multimeter
* Learn to use it safely

## Multimeters

A multimeter is your best friend when playing with circuits. A typical
multimeter can measure:

* Voltages in DC and AC
* Resistance
* Connections
* Current

Advanced multimeters can do more than that. Some can measure temperature,
capacitance, frequency of signals, etc.

## Analog multimeters and digital multimeters

In multimeters, there are two kind of multimeters; digital and analog.

Digital multimeter is the most popular multimeter. The result is easy to
understand, and some digital multimeters have automatic range detection. A
digital multimeter measures values with digital circuits, by sampling multiple
values in a very short time.

Analog multimeter is a multimeter with an analog meter. It is less popular
these days, but sometimes it is still useful. Instead of displaying the result
on digital screen, it has a analog meter and an indicator to point to a
number. An analog multimeter measures values with analog circuits. The result
is more accurate reflection of the reality. For example, digital multimeters
cannot reliably measure a short pulse of voltage.

In this lesson, we will discuss about a digital multimeter.

## Parts of a multimeter

A multimeter has a display that shows measurement. The display is usually an
LCD display, sometimes, with a backlight LED so that you can see the result in
a dark place.

A typical multimeter has a dial to change its functions. Functions available
depends on products. With the dial, you choose what you want to measure and
how much you expect, the range. When you measure a voltage in a small circuit
with a microcontroller, you choose the voltage function, and its range.
Typical small circuits operates on lower volts, such as 3.3 V, or 5 V. The
range you should choose is more than the voltage. Some multimeters has
auto-range detection feature, thus, they do not have ranges. Additionally,
a dial in a position may point to multiple functions. In that case, you need
to choose the function you want to use by pressing a "function" button. The
display shows which function is selected.

A typical multimeter has three ports: a red positive port, a black common port,
and another red port for large current, commonly labeled with "10A". You
usually use the former two ports. When you use the "10A" port, you must be
very careful because large current will flows in to the multimeter and the
circuit..

Probes are two cables, in red and black, with metal tips. When you measure
voltage, the red one is connected to a point at higher voltage, and the black
one is connected to a point at lower voltage. You may reverse the probes, and
the multimeter displays negative results.

## Selecting functions and ranges

The golden rules:

* Change the function of the multimeter only when it is not connected to
  anything
* Ensure to start from higher ranges
* Double-check the function and the range

## Testing probes

Before using a multimeter, test the probes. Probes can degrade and they are
are consumables. Degraded probes lead you to wrong conclusions, and might kill
you.

1. Select the Ohm meters on the selector dial (choose milli-ohm range)
1. Plug the black probe into the common port
1. Plug the red probe into the port labeled with "Ohm"
1. Touch one tip of the probes to another
1. The result on the display should be less then 1 ohm (the lower, the better)

If not, the probes are degraded. Replace probes with a pair of known good
ones.

# Other lessons
