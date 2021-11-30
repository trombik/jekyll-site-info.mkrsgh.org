---
title: esphome Basic 2
header:
  overlay_image: /assets/img/TBHS-model.png
  overlay_filter: 0.5
  image_description: An example 3D model object
tagline: Using a sensor
mathjax: true

---

In this lesson, you will:

* create a device with a motion sensor
* learn how to interact with a sensor
* learn more about Automations in `esphome`

Requirements:

* A computer with `esphome` installed
* WeMos D1 mini board
* WiFi network
* A USB cable
* A PIR sensor
* An LED, preferably red, in any size
* A 1K resistor
* A breadboard
* Jumper wires

## Understanding the Sensor

Sensors are small devices to measure something, such as temperature, humidity,
voltage, or motions. Many automated systems use sensors. Your smartphone have
several sensors, such as image sensors for face recognition, motion sensors to
detect movement of the device, voltage sensors to prevent overcharging the
battery, etc. In this example, we will use a Passive Infrared Sensor, PIR in
short.

A PIR sensor measures infrared light from objects. Infrared light is light but
human being cannot view it because the wavelength is longer than visible
light. Infrared light is used most commonly in remote controllers for air-con,
or TVs. Human being generates infrared light. By measuring strength of
infrared light, PIR sensor can detect movements of objects. PIR sensors are
used in automatic doors, security systems, and lighting systems. The sensor
outputs signals when it detects a moving object.  Example applications are:
turning on lights at night when the sensor detects something, or taking a
photo while doing nothing when nothing is moving.

Most of PIR sensors outputs high signal when something is moving. Your device
reads the status of the signal line, and when the signal is high, do
something. Actions taken include: posting alert message to your chat channel,
turning on an alert system, or beeping loudly. For the simplicity, we will
turn on an LED when something is moving.

The PIR sensor used in this example is able to source enough power to an LED.
You can test it without microcontroller.  In this example, we will use a
breadboard, a construction base for prototyping circuits. With a breadboard,
you do not need to solder parts.

The sensor IC,
[BISS0001](https://cdn-learn.adafruit.com/assets/assets/000/010/133/original/BISS0001.pdf),
has an output signal pin, whose absolute max rating is 10mA. Make sure to
choose a correct value of current limiting resistor.

From the Ohm's law:
$ R = { Vcc - Vf \over I } = 325 $
where $Vcc$, the supply voltage, is 5 V, $Vf$, forward voltage of the LED, is
1.75 V, $I$, the current, is 10 mA. $R$ should be more than 325 ohm. I usually
choose 1K ohm as most of red LEDs emits enough light with just a few mA.

`VCC` pin is connected to 5V power rail. `GND` pin is connected to `GND` rail.
The `OUT` pin is connected to the anode of the LED. The cathode of the LED is
connected to 1K resistor, and then to `GND`.

{: .notice--warning }
Before turning on the power switch, double-check the circuit.

Move your hand in front of the PIR sensor. The LED should be on when it
detects movement, and off after while. Use a multimeter to measure the output
voltage of the PIR sensor. Make sure it is 3.3V when high.

## PIR Sensor and `esphome`

To read status from the sensor, we will use General Purpose Input and Output
pins, GPIO pins in short. As it sounds, GPIO is for general purposes. You can
use them as input or output. In this example, one of GPIO pins is used to read
input from the sensor.

In `epshome`, we will use
[GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio.html),
which is a subclass of
[Binary Sensor Component](https://esphome.io/components/binary_sensor/index.html).

Binary Sensor Component is designed for simple sensors that outputs binary
status (i.e. high or low). PIR sensor is exactly a binary sensor because when
it detects motion, it outputs high, and when not, low.

[Passive Infrared Sensor](https://esphome.io/cookbook/pir.html) explains how
to use PIR sensor with an `esphome` device. Let's use `D2` GPIO pin as the
input from the sensor.

```yaml
binary_sensor:
  - platform: gpio
    pin: D1
    name: PIR Sensor
    device_class: motion
```

`binary_sensor` defines a list of binary sensors. We use one binary sensor in
this example.

`platform` specifies which binary sensor to use. There are other types of
binary sensors, such as, simple buttons,
[RFID reader](https://esphome.io/components/binary_sensor/rc522.html),
and [Capacitive Touch Sensor](https://esphome.io/components/binary_sensor/cap1188.html).
In this example, it is GPIO binary sensor.

`pin` specifies which GPIO pin to use. `D1` was chosen because it is one of the
safe pins to use.

{: .notice--warning }
Some GPIO pins, notably `D3` (GPIO0) and `D4` (GPIO2), are used for other
purposes. When you use them, extra care must be taken. See [ESP8266 Pinout
Reference: Which GPIO pins should you use?](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/)
for details.

`name` is a descriptive name. You may use "PIR sensor at the gate", or "PIR
sensor in the backyard", etc.

`device_class` is [one of device classes](https://www.home-assistant.io/integrations/binary_sensor)
supported by Home Assistant. It does not matter much in this example because
we will not use the deice with Home Assistant.

## Automations

Next, we will define Automations, or actions to take depending on sensor's
value. The automation will:

* turn on an LED when the signal from the sensor is high
* turn off when when it is low

We need two events: an event when the signal from the sensor rises from low to
high, and another when the signal falls from high to low.

[Binary Sensor Component page](https://esphome.io/components/binary_sensor/index.html)
explains what kind of actions you can take with Binary Sensor. Actions are
event-driven. `on_press` event is triggered when a button is pressed, or the
signal is rising high from low. `on_release` event is  the opposite event: it
is triggered when the signal falls from high to low.

Another thing we need is an output: an LED. As in the previous lesson, we can
use the onboard LED for the output, but the LED is too tiny. For better
visibility, add an external LED to the device. The output is, again, a GPIO
switch component.

```yaml
switch:
  - platform: gpio
    pin: D2
    name: LED
    id: led1
```

In this example, `D2` is used as an output, `name` is `LED`, and its `id` is
`led1`.

Now we have when to take actions (events) and its output (an LED). We will
create actions that put these together. Actions are defined in
`binary_sensor`.

```yaml
binary_sensor:
  - platform: gpio
    pin: D1
    name: PIR sensor
    device_class: motion
    on_press:
      then:
        - switch.turn_on: led1
    on_release:
      then:
        - switch.turn_off: led1
```

`on_press` and `on_release` are events, and actions for events are defined
under `then`. `then` may have multiple actions if you like, for example, "turn
on an LED" and "send a notification". Here, we have a single action, turning
on or off the LED. Like in the previous lesson, we use `switch.turn_on` and
`switch.turn_off` actions. Both actions require ID of the switch, `led1` in
this case.

## The Final Code

The final code is shown below.

```yaml
---
esphome:
  name: my-first-device
  platform: ESP8266
  board: d1_mini

wifi:
  ssid: MY_SSID
  password: MY_PASSWORD

ota:
  password: ota_password

api:
  password: api_password

logger:

switch:
  - platform: gpio
    pin: D2
    name: LED
    id: led1

web_server:

binary_sensor:
  - platform: gpio
    pin: D1
    name: PIR sensor
    device_class: motion
    on_press:
      then:
        - switch.turn_on: led1
    on_release:
      then:
        - switch.turn_off: led1

```

## The Circuit

We have the code ready. We are going to build a circuit.

As declared in the code, `D1` pin is connected to the output pin of the PIR
sensor, and `D2` is connected to anode of the LED (i.e. `+`). The cathode of
the LED (i.e. `-`) is connected to the 1K resistor. Make sure all components
share the common ground. Lastly, the PIR sensor needs power source. As the
sensor does not require much power, you can source the power to the PIR sensor
from `5V` pin on WeMos D1 mini.

{: .notice--warning }
Make sure the PIR sensor's output is 3.3V. The one used in this example is 5V
sensor but the output is 3.3V (actually, it is a 3.3V device with 5V-to-3.3V
regulator on it). When the output voltage is 5V, it may destroy the board.

## Homework

Modify the action so that the LED flushes a few times in a short period when
the sensor detects motion.

Identify the IP address in the log output from the device, open the web
server page, and see what you can see in the page.
