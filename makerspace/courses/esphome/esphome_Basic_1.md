---
title: esphome Basic 1
header:
  overlay_image: /assets/img/TBHS-model.png
  overlay_filter: 0.5
  image_description: An example 3D model object
tagline: "Your first esphome device: Blink"

---

In this lesson, you will:

* Create a simple device that turns on and off an LED at an interval
* Learn the basics of `esphome` and automations
* Add extra features to the device

Requirements:

* A computer with `esphome` installed
* WeMos D1 mini board
* WiFi network
* USB cable

## The "Blink", or "Hello world" program

"Blink" is the "Hello world" in Internet of Things, or IoT. "Hello world" is a
term referring to your first program when you learn a computer language. A
"Hello world" program does one thing: printing "Hello world" to an output.
This is fine when your program is running on your computer. Almost all
computers have a display. But, small embedded devices do not necessarily have
a display. Instead of printing "Hello world" to a display, "Blink" program turns
on and off an LED. That is, it "blinks" an LED. Such a device looks useless,
but in reality, most of things you do with small devices are to turn on something
on or off, say, fans, lights, or pumps.

The "Blink" program that you are going to create does:

* Turn on the onboard LED for two seconds
* Turn off the LED for one second
* Repeat

Here is your first `esphome` program:

```yaml
---
# config/my-first-device.yaml
esphome:
  name: my-first-device
  platform: ESP8266
  board: d1_mini

switch:
  - platform: gpio
    name: GPIO D4
    id: gpio_d4
    pin:
      mode: output
      number: D4
      inverted: true

interval:
  - interval: 3sec
    then:
      - switch.turn_on: gpio_d4
      - delay: 2s
      - switch.turn_off: gpio_d4
      - delay: 1s

logger:
```

Run `esphome compile` to compile the firmware:

```console
> esphome compile config/example1.yaml
INFO Reading configuration config/example1.yaml...
INFO Generating C++ source...
INFO Compiling app...
Processing my-first-device (board: d1_mini; framework: arduino; platform: platformio/espressif8266 @ 2.6.3)
----------------------------------------------------------------------------------------------
HARDWARE: ESP8266 80MHz, 80KB RAM, 4MB Flash
Dependency Graph
|-- <ESPAsyncTCP-esphome> 1.2.3
|-- <ESPAsyncWebServer-esphome> 2.1.0
|   |-- <ESPAsyncTCP-esphome> 1.2.3
|   |-- <Hash> 1.0
|   |-- <ESP8266WiFi> 1.0
|-- <ESP8266WiFi> 1.0
|-- <ArduinoJson-esphomelib> 5.13.3
|-- <ESP8266mDNS> 1.2
... other logs ...
RAM:   [====      ]  39.4% (used 32240 bytes from 81920 bytes)
Flash: [====      ]  38.9% (used 405912 bytes from 1044464 bytes)
================================ [SUCCESS] Took 1.95 seconds ================================
INFO Successfully compiled program.
```

## Understanding "Blink" example

Let's see what the configuration does line by line.

```yaml
---
```

The first line indicates the start of YAML document. It is optional, and some
people omit it.

```yaml
# config/my-first-device.yaml
```

The next line is a comment. A comment start with `#`. Everything after the `#`
is ignored. Here, the comment explains the location of the file.

```yaml
esphome:
  name: my-first-device
  platform: ESP8266
  board: d1_mini
```

In YAML file, you configure "components". Each component has a documentation
page in [the official website](https://esphome.io/). The first component is
`esphome` component. Officially, it is called
[ESPHome Core](https://esphome.io/components/esphome.html) component. In
general, a component has options. Some options are required, and others are
optional.  Optional options may be omitted. It is an error to omit required
options.  Here, three required options are configured, `name`, `platform`, and
`board`.

`name` is an identifier of the device. In its documentation page, the value of
`name` is explained.

> `name` (Required, string): This is the name of the node. It should always be
> unique in your ESPHome network. May only contain lowercase characters,
> digits and hyphens, and can be at most 31 characters long.

This means the name must not contain spaces, or "`_`".

`platform` is the name of the target, either `ESP8266` or `ESP32`. In this
example, it is `ESP8266`.

`board` is the name of the board in use. There are many different boards
available, and you need to identify the board name. You can find supported
boards at [Boards & dev-kits](https://platformio.org/boards) page. We are
using an `esp8266` board, [WeMos D1 R2 and mini](https://docs.platformio.org/en/latest/boards/espressif8266/d1_mini.html),
which says the name of the board is `d1_mini`.

The next section is `switch` component.

What we want to achieve is to turn on and off an LED at 3 sec interval. WeMos
D1 mini board has an LED on board, which is a tiny blue LED. We want to use
that LED for this example because it is available by default, and you do not
need additional LED for the example. The LED is connected to GPIO `D4`. When
you turn on this GPIO pin, the LED will be on. However, there is a small twist
in `D4` pin and the LED: the `D4` pin is inverted switch, which means when the GPIO
pin is on, the LED is off, and when the pin is off, the LED is on.

{: .notice--info }
How do you know the pin is inverted? Read
[the schematic in PDF](https://www.wemos.cc/en/latest/_static/files/sch_d1_mini_v3.0.0.pdf)
and look for LED and `GPIO2`.

```yaml
switch:
  - platform: gpio
    name: GPIO D4
    id: gpio_d4
    pin:
      mode: output
      number: D4
      inverted: true
```

`esphome` provides [many different switches](https://esphome.io/index.html#switch-components).
We use [GPIO Switch](https://esphome.io/components/switch/gpio.html) component.

{: .notice--info }
Like many other components, [GPIO Switch component](https://esphome.io/components/switch/gpio.html)
_inherits_ common characteristic from a parent component,
[Switch Component](https://esphome.io/components/switch/index.html).
Available options for a component are options available in the component you
are using, and options available in the parent component.

The first line, `switch:` tells `esphome` that we are configuring Switch
component. The value of `switch` is a list of switches. In this example, we
only use one switch.

`platform` is which switch component to use. As stated above, we use GPIO
Switch component. The name of the component is `gpio`.

Every element of `switch` must have `name` option. The name is used for
display purposes. You may use whatever in `name` (including spaces).

`id` is an identification name of the switch. The `id` is used to refer to the
switch from other part of code. The `id` must be unique, and should not
contain spaces or other special characters. Always use alphabets and `_` for
`id`, `gpio_d4` in this example.

`pin` is an option to describe which GPIO pin to use and how.`pin` accepts
[Pin Schema](https://esphome.io/guides/configuration-types.html#config-pin-schema)
as a value. The value is a dict to configure the pin. The `mode` is `output`
because we are using the pin as output pin, not reading the state of the pin.
`number` is the pin number of the GPIO, `D4` in this example. As stated above,
the pin is _inverted_. `inverted: true` indicates that LED is on when the pin
is off, i.e. high, and that LED is off when the pin is on, i.e. low.

The next section is `interval`.

```yaml
interval:
  - interval: 3sec
    then:
      - switch.turn_on: gpio_d4
      - delay: 2s
      - switch.turn_off: gpio_d4
      - delay: 1s
```

We want to turn the LED on and off indefinitely at a certain interval, 2
seconds on, 1 second off. To do something at a certain interval, we use
[`interval` component](https://esphome.io/guides/automations.html#interval).

`interval` accepts a list of `interval`. Here, we use one `interval` at 3
seconds. Each element of `interval` has list of Actions under `then` keyword.

At every 3 seconds, we want to:

* turn the switch on
* wait 2 seconds
* turn the switch off
* wait 1 second

The actions we use are `*.turn_on`, `*.turn_off`, and `delay` actions.

As we want to turn on or off a switch, we use
[`switch.turn_on`](https://esphome.io/components/switch/index.html#switch-turn-on-action)
and
[`switch.turn_off`](https://esphome.io/components/switch/index.html#switch-turn-off-action)
actions.  Both actions require `id` of the switch, `gpio_d4` in this example.

Between on and off actions, we need delays, or
[`delay` action](https://esphome.io/guides/automations.html#delay-action).
The `delay` action requires an argument, how long to delay.

What we implemented here is called _Automations_ in `esphome`.

{: .notice--info }
There are many thing you can do with Automations. See [the official
documentation of Automations](https://esphome.io/guides/automations.html).

## Connecting to network

The example works but it lacks of an important feature in IoT: networking. IoT
stands for Internet of Things; devices connected to network. With network, you
can:

* control the device over network (e.g. turn on something with your smartphone)
* update the firmware over network (e.g. update the firmware without
  connecting the device to your computer)
* do something with network services (e.g. send status data to external
  services, post messages to SNS chat conversation, etc)

To connect the device to WiFi network, we use
[`wifi` component](https://esphome.io/components/wifi.html). You need two
options: `ssid` and `password` to configure `wifi` component. Add the
following to the YAML file.

```yaml
wifi:
  ssid: MY_SSID
  password: MY_PASSWORD
```

Replace `MY_SSID` and `MY_PASSWORD` with the ones used in your WiFi network.

Or, you may configure the device to connect multiple networks, say `School
WiFi` and `Home WiFi`. The device will connect to one available at the boot
time.

```yaml
wifi:
  networks:
  - ssid: School WiFi
    password: password1
  - ssid: Home WiFi
    password: password2
```

Also, you will find some other components useful: `ota`, `api`,`logger`, and
`web_server` components.

[OTA Update Component](https://esphome.io/components/ota.html) is a component
that enables you to update the firmware on the device over network. OTA stands
for "Over The Air". To upload your code to the device, you need to connect the
device to your computer with a cable. With OTA component, you do not have to
(an exception is when you upload the code for the first time. The initial
upload must be done over cable). `ota` component accepts optional `password`
option.

```yaml
ota:
  password: my_password
```

[Native API Component](https://esphome.io/components/api.html) is a component
that enables you to manage your device with `esphome` dashboard and [Home
assistant](https://www.home-assistant.io/). With `esphome` dashboard, you can
manage all devices in a dashboard, edit or modify each firmware, or see logs.
`api` component accepts optional `password` option.

```yaml
api:
  password: my_password
```

[Logger Component](https://esphome.io/components/logger.html) provides logs
over serial cable and over network. The log includes what the device is doing,
status of the device, network information, among other things. You almost
always need this component. `logger` component requires no options.

```yaml
logger:
```

[Web Server Component](https://esphome.io/components/web_server.html) is a
component that enables you to access a simple status web page on the device,
and manage the device with some limitations. It also provides REST APIs for
other tools. With `web_server` component, the device starts a web server, and
you can connect to the server with your computer or smartphone. `web_server`
component accepts optional `auth` option to protect the status page.

```yaml
web_server:
  auth:
    username: admin
    password: my_password
```

If you do not need authentication, use:

```yaml
web_server:
```

## The final code

```yaml
---
# config/my-first-device.yaml
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

logger:

web_server:
  auth:
    username: admin
    password: my_password

logger:

switch:
  - platform: gpio
    name: GPIO D4
    pin:
      mode: output
      number: D4
      inverted: true
    id: gpio_d4

interval:
  - interval: 3sec
    then:
      - switch.turn_on: gpio_d4
      - delay: 2s
      - switch.turn_off: gpio_d4
      - delay: 1s
```

Compile it again by:

```console
esphome compile  config/example1.yaml
```

## Uploading the firmware

To upload the firmware, you need to:

* Connect the device to your computer
* Find out serial port device name on your computer
* Run `esphome run` with the serial port device name

{: .notice--info }
This is only required when you upload the firmware for the first time. After
the initial upload, you will not have to physically connect the device to your
computer. The `ota` component will do it for you.

In embedded devices, a "serial port" is used to connect a device to your
computer. Serial port is a general protocol between embedded devices and
computers. It is sometimes called "TTL". Modern computers do not have serial
port anymore. Instead, you need a USB-to-Serial converter. Development boards,
such as WeMos D1 mini we are using in this example, have onboard USB-to-Serial
built-in. That means you do not need USB-to-Serial converter. Just plug the
device to your computer with USB cable.

Next, you need to find out serial port name on your computer. A computer may
have multiple serial ports. A serial port name is used to identify which
serial port to use. On Windows, it is usually `COM$N`, where `$N` is the
number of serial port. On Unix, it is something like, `/dev/ttyUSB$N`, and on
macOS, it is something like `/dev/cu.usbmodem$N`.  It is `/dev/cuaU0` on my
computer. Make sure to replace it the one on your computer.

To upload the firmaware, run:

```console
esphome run config/example1.yaml --device /dev/cuaU0
```

{: .notice--warning }
Make sure that WiFi SSID and the password are correct before uploading. If any
of them is wrong, you need to physically connect the device to your computer
again.

Next run `esphome` dashboard by:

```console
esphome dashboard config/
2021-11-28 14:00:20,901 INFO Starting dashboard web server on http://0.0.0.0:6052 and configuration dir config/...
```

Next open a browser and type "http://127.0.0.1:6052" in the URL bar to access the
dashboard. The dashboard will show your device.

Click `LOGS` button to see logs over network.

Click `EDIT` button to edit the YAML file. You can chnage the configuration
and upload the new configuration by clicking `INSTALL` button at the bottom.

## Homework

Find out the IP address of the device in the log. Open a browser and type the
IP address in the URL bar. See what you can do with the `web_server`
component.

In `switch` configuration, replace `inverted: true` with `inverted: false`.
Upload the firmware. See how the behavior changes.

Replace `3sec` interval with something else, say `10sec`. Upload the firmware.
See how the behavior changes. Try different time period in `delay`.
