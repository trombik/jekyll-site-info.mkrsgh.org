---
title: LED and Vf
course: electronics_basic
layout: lesson
mathjax: true

---

In this lesson, you will apply the Ohm's law and learn how to use LED safely.

## Forward voltage, or Vf

LEDs drops voltage, which is called "Forward voltage", or $ V_{f} $. Typical
$ V_{f} $ are shown below.

| Color  | $ V_{f} $ in V |
| -----  | -------------- |
| Red    | 1.6 - 2        |
| Blue   | 2.5 - 3        |
| Yellow | 2.1 - 2.2      |
| Amber  | 2 - 2.1        |
| Green  | 1.9 - 4        |

When the applied voltage is less than $ V_{f} $, the LED acts like an open
switch, and no current flows. To turn on an LED, you need to apply voltage
more than $ V_{f} $. When the voltage is more than $ V_{f} $, the voltage
across an LED is always $ V_{f} $.

What if an LED is connected to a 5 V battery? It will break because an LED is
not a resistor, and its resistance is (almost) zero. It just drops voltage.
The Ohm's law says:

$$ I = { V \over R } = { { V_{cc} - V_{f} } \over 0 } = { { 5 -  V_{f} } \over 0 } = \infty $$

In theory, infinite current will flow thorough the LED.

{: .notice--info }
In reality, infinite current will not flow because the battery has its own
resistance, and cannot source infinite current. However, it will be enough
current to break the LED.

## Current limiting resistor

![LED circuit](../LED-and-Resistor.svg){: .align-center}

To protect the LED, a resistor is used very often. The resistor limits the
current that flows thorough the LED. To calculate the value of the resistor,
you need $ I_{f} $, or forward current. The data sheet, or the product page,
of the LED shows typical $ I_{f} $ for the LED. A typical value is between 10
mA and 20 mA. As recent LEDs are very bright, even a few mA would work. Then
you need the $ V_{cc} $, the voltage of the power source. Here, two AAA
batteries, or 3 V, are used as an example, $ V_{f} $ is 1.8 V, and $ I_{f} $ is
10 mA. The voltage across the current limiting resistor is $ V_{cc} - V_{f} =
3 - 1.8 = 2.2 (V) $.

From the Ohm's law:

$$ R = { V \over I } = { { V_{cc} - V_{f} } \over I_{f} } = { { 3 - 1.8 } \over { 0.01 } } = 120 (ohm) $$

## Power rating

Another important factor in choosing current limiting resistor is power
rating. The power rating of small resistors you typically find are 1/8 W, or
125 mW. The power used by the current limiting resistor is:

$$ P = VI = 2.2 \times 0.01 = 0.022 (W) = 22 (mW) $$

As it is much lower than 125 mW, a typical 1/8 W resistor can be used.

{: .notice--warning }
Use two times higher wattage rating than you actually need. If $ P $ is 100 mW,
do not use 1/8 W resistor. Use 1/4 W instead.

## Other lessons
