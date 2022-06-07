---
title: Simple doorbell button example with esphome
tags:
  - esp8266
  - esphome

---

`esphome` is a framework for ESP32 and ESP8266 with which you can create
simple devices by just writing YAML files instead of writing code. I choose
`esphome` when the device I need is simple because, in simple devices, I do
not have to write same code again and again. `esphome` provides components for
common tasks, such as OTA, Web interface of the device, and Home Assistant
integration.

I need a doorbell-over-WiFi that does a simple thing, notifying me when
pressed. I used a slack channel for notifications from my devices. That means,
the device should send a message to the channel, and my phone pops up a
notification on screen.

## Requirements

* it posts a message to a [slack](https://slack.com/) channel when a button is
  pressed
* it works on a battery so that I can install it anywhere
* it is a simple device that anyone can build in a few minutes as an example of
  `esphome`

From the requirements, you definitely need to deep sleep the device. ESP8266
is a WiFi device, and WiFi requires more power than other wireless protocols.
The device should wake up only when the button is pressed. Otherwise, sleep.

I chose slack for the notification channel, but many chat services provide
APIs to post messages. With small modifications to the configuration, it
should be easy to post messages to other services.

## ESP8266 and deep sleep

ESP8266 in deep sleep consumes very few power, like a few micro ampere. You
can run ESP8266 on battry more than a year ([How to Run Your ESP8266 for
Years on a Battery](https://makecademy.com/esp8266-battery)).

To enable deep sleep, you need to connect `GPIO16` to `RST`. On NodeMCU,
`GPIO16` is labeled as `D0`. During the sleep, the voltage is HIGH.

To wake up the device, you need a rising edge signal on `RST` pin. As the
voltage is HIGH in deep sleep, you need to pull the voltage of the pin to LOW,
and then HIGH. This can be implemented with a simple button (normally open).

A pin of the button is connected to `GPIO16` and `RST`, and another to `GND`.
When the button is not pressed, the voltage is HIGH. When pressed, the voltage
is LOW, and when released, the voltage is HIGH. This creates a rising signal.

As a feedback and for debugging, an LED should indicate request status. Say,
short blinks on success, and a longer blink on failure.

## Materials

* a ESP8266 development board
* a USB cable
* an LED and a resistor to limit current through the LED (1K ohm should work
  fine)
* a tact switch, or a button
* some wires and a breadboard

## Schematic

{% include figure
  image_path="/assets/img/posts/esp-doorbell-schematic.svg"
  alt="esp-doorbell schematic"
  caption="the schematic of esp-doorbell"
%}

## The `esphome` configuration

Here, I will explain the configuration sections. The latest code in GitHub can
be found at
[my GitHub repository](https://github.com/trombik/esphome-makers/blob/main/config/backgarden-switch-doorbell-1.yml).

Each section has links to the official documentation. Remember to read them.

### Substitutions section

```yaml
---

# common strings used throughout the program. something unique to the device.
substitutions:
  myname: backgarden-doorbell-1
  location: "backgarden"
```

`substitutions` is used to replace strings. They are like macros. You can
reference them in the configuration. My devices always have `location` in
`substitutions` because I need to know device's location, and embed the
location in messages or logs. To reference them, use `${location}`.
When `esphome` parses and compiles the configuration, `${location}` is
replaced with its value.

See the official documentation at
[Substitutions](https://esphome.io/guides/configuration-types.html?#substitutions).

### esphome section

This is the core of the configuration. All the logics to meet the requirements
are implemented here.

```yaml
esphome:
  name: ${myname}
  on_boot:
    # post a message to slack upon boot. with priority higher than 200, the
    # network is available.
    # see:
    # https://esphome.io/components/esphome.html#on-boot
    # https://esphome.io/components/http_request.html
    priority: 200
    then:
      - http_request.post:
          # the URL of slack web hook.
          url: !secret slack_webhook_url_esphome_doorbell
          # disable TLS verification because it does not work on ESP8266.
          verify_ssl: false
          headers:
            Content-Type: application/json
          json:
            # see how to format at:
            # https://api.slack.com/reference/surfaces/formatting
            text: !lambda |-
              snprintf(id(buf), sizeof(id(buf)), "@here Someone pushed me at %s", "${location}");
              return id(buf);
            # enable group mention, makes `@here` work
            link_names: "true"
          # give feedback to users. was it successful?
          on_response:
            then:
              - if:
                  condition:
                    lambda: "return status_code == 200;"
                  # when success, blink the LED twice
                  then:
                    - output.turn_on: led
                    - delay: 0.3s
                    - output.turn_off: led
                    - delay: 0.3s
                    - output.turn_on: led
                    - delay: 0.3s
                    - output.turn_off: led
                  # when error happens, blink the LED once, and longer
                  else:
                    - output.turn_on: led
                    - delay: 3s
                    - output.turn_off: led
              # then, regardless of status code, deep sleep.
              - deep_sleep.enter:
                  id: deep_sleep_1
```

`esphome` component has several options to configure, and here, I need
`on_boot`, which is an Automation that runs on boot. When the device boots,
`on_boot` runs once. It then post a HTTP request to slack web-hook URL.

The web-hook URL is encrypted because anyone with the URL can post messages to
the slack channel, which is not what you want.

`http_request.post` is an action that posts HTTP requests. The body is a JSON
object, and the HTTP header must include `Content-Type: application/json`.
The JSON object is an API call to slack API. The API are documented at
[Reference: Message payloads](https://api.slack.com/reference/messaging/payload).
`@here` is used in the message text so that slack application on mobile
devices or web browser application will notify me of the message.

When `http_request.post` has received a HTTP response from the API, the device
blinks a LED, short blinks on success, and longer blinks on failure.

It then enters into deep sleep by calling `deep_sleep.enter` action.

See the official documentation at
[ESPHome Core Configuration](https://esphome.io/components/esphome.html),
and
[Automations and Templates](https://esphome.io/guides/automations.html).

### Other sections

```yaml
esp8266:
  board: nodemcuv2
```

`esp8266` section configures architecture-specific settings. At least, you
need to specify `board`.

See the official documentation at
[Generic ESP8266](https://esphome.io/devices/esp8266.html).

```yaml
logger:
  level: debug

debug:
  update_interval: 5s
```

It is always a good idea to enable debug log. You can see logs over WiFi, or
serial port.

See the official documentation at
[Logger Component](https://esphome.io/components/logger.html) and
[Debug Component](https://esphome.io/components/debug.html).

```yaml
api:
  password: !secret api_password
```

`api` component enables the device to communicate to other devices, such as
`esphome` web UI, or Home Assistant. Use `password` and protect the
communication.

See the official documentation at
[Native API Component](https://esphome.io/components/api.html)

```yaml
# OTA is enabled here but it does not work because the device is almost always
# in deepsleep.
ota:
  password: !secret ota_password
```

With `ota` component, it is possible to update firmware over WiFi. However, as
documented in the comment above, it is very difficult to use OTA if the device
is sleeping.

See the official documentation at
[OTA Update Component](https://esphome.io/components/ota.html).

```yaml
# the WiFi SSID and password for your network.
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
```

`wifi` component configures WiFi and network settings. Simply provide `ssid`
and `password`.

See the official documentation at
[WiFi Component](https://esphome.io/components/wifi.html).

```yaml
globals:
  # a buffer to hold the message string because snprintf(3) is used to create
  # the message.
  #
  # you may remove this and snprintf(3) above if the message is a static,
  # fixed message.
  - id: buf
    type: char[512]
    restore_value: no
    initial_value: ""
```

`globals` is a section to define global variables that you can use in code.
Because the message is dynamically created, you need a variable to keep the
string.

See the official documentation at
[Global Variables](https://esphome.io/guides/automations.html).

```yaml
# to post HTTP requests, you need http_request component.
http_request:
  useragent: esphome/${myname}
  timeout: 10s
```

`http_request` component is required to sent HTTP requests.

See the official documentation at
[HTTP Request](https://esphome.io/components/http_request.html).

```yaml
text_sensor:
  - platform: wifi_info
    ip_address:
      name: ESP IP Address ${myname}
    ssid:
      name: ESP Connected SSID ${myname}
    bssid:
      name: ESP Connected BSSID ${myname}
    mac_address:
      name: ESP Mac Wifi Address ${myname}
    scan_results:
      name: ESP Latest Scan Results ${myname}

sensor:
  - platform: wifi_signal
    name: "WiFi Signal Sensor ${myname}"
    update_interval: 60s

  - platform: uptime
    name: Uptime Sensor ${myname}
```

`wifi_info` `text_sensor` and `wifi_signal` `sensor` publish WiFi-related
diagnosis information. Useful for debugging. All my devices have these.
The information is published to Home Assistant, and you can see it on the web
interface.

See the official documentation at
[WiFi Info Text Sensor](https://esphome.io/components/text_sensor/wifi_info.html),
[WiFi Signal Sensor](https://esphome.io/components/sensor/wifi_signal.html),
and [Uptime Sensor](https://esphome.io/components/sensor/uptime.html).

```yaml
# the pin to give feedback with an LED.
output:
  - platform: gpio
    pin: D6
    id: led
    inverted: false
```

`gpio` `output` is a component to control GPIO pins. The pin is used to give
HTTP status. The component has an `id`, and the value is `led`. This `id` is
required to reference this component from other part of the code,
`http_request.post` action in this example.

See the official documentation at
[GPIO Output](https://esphome.io/components/output/gpio.html).

```yaml
deep_sleep:
  id: deep_sleep_1
  # sleep indefinitely. the max value of sleep_duration on ESP8266 is about 3
  # hours 46 minutes. a value bigger than this makes ESP8266 in deep sleep
  # indefinitely.
  sleep_duration: 4h
```

`deep_sleep` component is used to enter into deep sleep. The component has
`id` because the component is referenced from the `on_boot` automation. As I
would like to keep the device in deep sleep until someone presses the button,
the `sleep_duration` is longer than the max value of `sleep_duration`.

See the official documentation at
[Deep Sleep Component](https://esphome.io/components/deep_sleep.html).

## Limitations

The device needs a few seconds to post a message because it needs to boot,
configure the WiFi interface, obtain an IP address from DHCP server. It is
mostly harmless in this application because I do not need real time
notifications. A few seconds delay is acceptable. If you need quick response,
here is some ideas.

Using static IP address reduces the delay because the devices does not ask
DHCP server for an IP address. However, you need to configure a static IP
address for the device, and maintain it. To use a static IP address,
see `manual_ip` option in
[WiFi Component](https://esphome.io/components/wifi.html).

Disabling WiFi scanning also reduces the delay because it skips scanning for
WiFi access points. See `fast_connect` option in
[WiFi Component](https://esphome.io/components/wifi.html).

Using a power source, and disabling deep sleep. The device is up and running
all the time, and the response is immediate. However, you have to give up
battery operation, and the configuration must be modified.

## Final words

Building an `esphome` device is easy. However, that does not necessarily mean
you don't have to lean C or C++. Some concepts require understanding of C or
C++.  `esphome` looks simple but it can implement complicated logics, too. You
need to understand event-driven programming.

Always read the official documentation. Their documentation is generally good
(except internal APIs).

Happy hacking!
