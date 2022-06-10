---
lang: en
title: A simple Arduino kitchen timer
tags:
  - arduino
  - avr
---

As an example for beginners, I needed an example program that does a simple
thing, with very few standard functions of Arduino. Here is an example Arduino
program; a simple kitchen timer.

The program uses just a few standard functions;

* [digitalWrite()](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/)
* [digitalRead()](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/)
* [delay()](https://www.arduino.cc/reference/en/language/functions/time/delay/)

This article is a brief summary of one of my electronics classes on every
weekends.

## Requirements

The kitchen timer has a tactile switch, and an LED.  Here is what the kitchen
timer does. It should:

* Start the timer when the button is pressed
* Blink the LED at low frequency (1 Hz) until the timer reaches the defined
  time (`WAIT_TIME_SEC`, 7 seconds).
* Blink the LED at a high frequency when the timer reaches the defined time.

As an example for beginners, it also should:

* Use input and output
* Use a few standard functions (`digitalRead()`, `digitalWrite()`, and
  `delay()`)
* Use a few commonly-available components

## Materials

* Arduino Nano, or Arduino Uno
* Jumper wires
* An LED (any color) and a current limiting resistor (1K ohms should work with
  any LED)
* A tactile switch
* A breadboard

## Schematic

{% include figure
  image_path="/assets/img/posts/arduino-kitchen-timer.svg"
  alt="Schematic of the simple Arduino kitchen timer"
  caption="the schematic of the simple Arduino kitchen timer"
%}

## Wiring

{% include figure
  image_path="/assets/img/posts/arduino-kitchen-timer.jpg"
  alt="Schematic of the simple Arduino kitchen timer"
  caption="the schematic of the simple Arduino kitchen timer"
%}

Connect a tactile switch to `START_BUTTON_GPIO_NUM` (`D9`) pin. Connect the
other pin of the tactile switch to `GND`. As commented in the schematic, `D9`
is an input pin with the internal pull-up resistor enabled. That means, when
the button is not pressed, the voltage is VCC, or +5V. When pressed, it's 0V.
Thanks to the internal pull-up resistor, the pin does not make short-circuit.

Connect an LED to `LED_GPIO_NUM` (`D10`) pin with a resistor. 1K resistor
should work regardless of the color of the LED.

## The program

The program does include some comments. Note that they are intended for my
students.

<script src="https://gist.github.com/trombik/61b779f20bbe2e658ea873b5c5f8b9b7.js"></script>

## Further improvements

This kitchen timer is so simple and it has a room for improvements.

The kitchen timer only blinks the LED. When making food, you do not want to
watch the timer. Instead, the timer should beep, optionally blink the LED.

The timer is a fixed timer, namely 7 seconds. This is not very practical.
Users should be able to set arbitrary time period, such as 1 minutes, 7
minutes and 30 seconds.

The only feedback is the LED. Users should be able to know the remaining time.
The timer should show the remaining time in a display in real time.

When the button is not pressed for a while and the timer has NOT started, say
5 minutes, it should sleep to save power.

## Final words

This post is a summary of my class. Of course, I teach more than what
is described here, usually in two 2-hours classes, depending on the skill
level of students. If you can understand everything by reading this post, you
don't have to attend the class. If you don't, join the class where I will
explain and answers all your questions.

Happy hacking!
