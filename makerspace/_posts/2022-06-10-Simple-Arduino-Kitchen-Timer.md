---
lang: en
title: A simple Arduino kitchen timer
mathjax: true
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

### `#define`

```c
#define LED_GPIO_NUM (10)
#define START_BUTTON_GPIO_NUM (9)

#define WAIT_TIME_SEC (7)
#define WAIT_TIME_MS (WAIT_TIME_SEC * 1000)

#define DELAY_TIME_SEC (0.5)
#define DELAY_TIME_MS (DELAY_TIME_SEC * 1000)
```

`#define` defines a macro variable. This is not a C or C++ function, but a C++
preprocessor statement. These macro variables are replaced by the preprocessor
at _compile time_. Examples:

```c
#define SOME_TEXT "Some text here"
```

```c
#define SOME_NUMBER (1)
```

Every time C preprocessor encounters `SOME_TEXT` or `SOME_NUMBER`, the macro
variables are replaced with their values. When the value is a number, always
enclose it with `()`, which prevents surprises. Without `()`, it works
sometimes, and not always. An example:

```c
#define TWO 1 + 1
```

This defines `TWO` as number 2. When you multiply it, the result is a
surprise.

```c
#define TWO 1 + 1
int i = TWO * 2:
// i is 3.
```

This is because of the precedence in the math. The actual code after
preprocessing is:

```c
int i = 1 + 1 * 2;
```

To define numbers, always enclose them with `()` to avoid this problem.

```c
#define TWO (1 + 1)
int i = TWO * 2;
// i is 4.
```

Macro variables should have a unit at the end so that readers understand what
it is not only from the name, but also the unit. `WAIT_TIME_MS` is clearer
than `WAIT_TIME` because it is evident that the variable is time in seconds.
`_MS` is often used to represent as milliseconds.

### Global variables

```c
unsigned long started_time_ms;
int led_state;
```

The program needs to remember two things; time when the timer has started and
the state of the led. As these are referenced in functions, they need to be a
global variable.

To obtain time,
[`millis()`](https://www.arduino.cc/reference/en/language/functions/time/millis/)
is used. `millis()` returns a value in `unsigned long`, not `int`. To obtain
voltage of GPIO pins,
[`digitalRead()`](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/)
is used.  It returns `HIGH` or `LOW` as `int`.

### The `setup` function

```c
void
setup()
{
    pinMode(LED_GPIO_NUM, OUTPUT);

    /* enable input on START_BUTTON_GPIO_NUM pin with a pullup resistor */
    pinMode(START_BUTTON_GPIO_NUM, INPUT_PULLUP);

    initializeLED();
    waitForeverUntilButtonIsPressed();
    resetTimer();
}
```

The `setup()` below does four things:

1. configure `LED_GPIO_NUM` pin as output
1. configure `START_BUTTON_GPIO_NUM` pin as input with an internal pull-up
   resistor enabled
1. initialize the LED
1. wait until the button switch is pressed
1. reset the timer and start

Except `INPUT_PULLUP`, everything is straightforward. What is `INPUT_PULLUP`?

A pull-up resistor (and a pull-down resistor) is a resistor to keep a voltage
at a certain level, usually, `VCC`. Here is three switches as input, without a
resistor, with a pull-up resistor, and with a pull-down resistor.

{% include figure
  image_path="/assets/img/posts/pullup-and-pulldown-resistors.svg"
  alt="Switches as input, with a pull-up resistor, with a pull-down resistor, and without a resistor."
  caption="Switches as input, with a pull-up resistor, with a pull-down resistor, and without a resistor."
%}

The first one &mdash; without a resistor &mdash; is dangerous, and you should
not use it because, when you push `SW2`, `VCC` and `GND` are connected, which
is a short-circuit. There should be something that prevents the short-circuit.
Pull-up resistor and pull-down resistor do that job.

The second one has a pull-up resistor, `R2`. When the switch, `SW3`, is open,
the voltage at the `GPIO` is `VCC` (the resistor _pulls up_ the voltage to
`VCC`). When the switch is closed, the voltage is 0V.

The third one has a pull-down resistor, `R3`. When the switch, `SW4`, is open,
the voltage at the `GPIO` is 0V (the resistor _pulls down_ the voltage to
`GND`). When the switch is closed, the voltage is `VCC`.

The value of pull-up, and pull-down resistors is usually 10K ohm or so. The
value affects the current when the switch is opened or closed. When `VCC` is
5V, the current is $ I = { V \over R } = { 5 \over 10,000 } = 0.5 (mA)$.

Some GPIO pins have _internal_ pull-up resistors built-in. If you enable one
with `pinMode(pin, INPUT_PULLUP)`, it is not necessary to add an external
pull-up resistor to the switch because the pin is internally connected to
`VCC` through a pull-up resistor.

### the `loop()` function

```c
void
loop() {
    delay(DELAY_TIME_MS);

    /* millis() returns the current time since the micro computer started.
     * the return value is an unsigned int.
     */
    if (started_time_ms + WAIT_TIME_MS <= millis()) {
        notifyUser();
        waitForeverUntilButtonIsPressed();
        initializeLED();
        resetTimer();
    } else {
        toggleLED();
    }
}
```

In the `loop()`, it has a `delay()` and a `if-else`. `started_time_ms` holds
the time in millisecond when the timer has started. `WAIT_TIME_MS` &mdash; a
macro variable &mdash; is `7000`. `started_time_ms + WAIT_TIME_MS` is the time
when the timer should notify the user. Otherwise, toggle the LED, i.e. if the
lED is on, turn it off and vice versa.

### initializeLED()

```c
void
initializeLED()
{
    led_state = LOW;
    digitalWrite(LED_GPIO_NUM, led_state);
}
```

The function sets `led_state` to `LOW`, the initial state. Nothing new here.

### isButtonPressed()

```c
bool
isButtonPressed()
{
    /*
    if (digitalRead(START_BUTTON_GPIO_NUM) == LOW) {
        return true;
    } else {
        return false;
    }
    */

    /* same as the above code */
    return digitalRead(START_BUTTON_GPIO_NUM) == LOW;
}
```

The function returns `true` or `false`. If `START_BUTTON_GPIO_NUM` is `LOW`,
return `true` (the button is pressed). Otherwise, `false`.

### toggleLED()

```c
void
toggleLED()
{
    /*
    if (led_state == HIGH) {
        led_state = LOW;
    } else {
        led_state = HIGH;
    }
    */

    /* same as the above code. it's called a "ternary operator".
     * x = condition ? condition is true : condition is false
     */
    led_state = led_state == HIGH ? LOW : HIGH;
    digitalWrite(LED_GPIO_NUM, led_state);
}
```

The function _toggle_ the LED. Instead of `if-else`, a ternary operator is
used as a short-hand.

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
