---
title: Traffic signal
course: electronics_basic
layout: lesson
tagline: How traffic signal works

---

## Understanding traffic signal

A traffic signal has three LEDs, green, yellow, and red, which are
either horizontally, or vertically, mounted.

When two roads cross, you need two pair of two traffic signals for all
directions. A pair of two traffic signals behave identically, when one is red,
the other is also red. Let's say one pair is "Signal 1", and the other is
"Signal 2".

* When Signal 1 is green, Signal 2 must be red.
* When Signal 1 becomes red from green, it must become yellow first, and then red.
* When Signal 1 is yellow, Signal 2 must stay red.
* When Signal 1 is green or red, it must stay that color for 5 seconds.
* When Signal 1 is yellow, it must stay yellow for 1 second.

## The flowchart

<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.8.2/mermaid.min.js"></script>

The logic of the traffic lights above is described in a chart, called _flow
chart_.  A flowchart describes what a program does.

<div class="mermaid">
graph TD;
    Setup(("setup()")) --> R_G(Signal 1: Red<br>Signal 2: Green);
    R_G -- 5 sec --> R_Y(Signal 1: Red<br>Signal 2: Yellow);
    R_Y -- 1 sec --> G_R(Signal 1: Green<br>Signal 2: Red);
    G_R -- 5 sec --> Y_R(Signal 1: Yellow<br>Signal 2: Red);
    Y_R -- 1 sec --> R_G;
</div>

## Exercise

Create two traffic signals with six LEDs. Connect them to an Arduinol. Write a
program that implements the logic above.
