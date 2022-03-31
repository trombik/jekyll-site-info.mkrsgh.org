---
lang: en
title: Say goodbye to ESP8266
header:
  overlay_image: /assets/img/esp32s2.png
  overlay_filter: 0.4
  show_overlay_excerpt: false
  caption: "ESP32S2 chip"
tags:
  - esp8266
  - esp32

---

ESP8266 has been quite popular. After years of community efforts, it was the
de-facto platform for WiFi-enabled projects. Espressif, the chip vendor of
ESP8266, has been releasing ESP32-based products. ESP32C3, supposed to be a
successor of ESP8266, was introduced into market in 2020. Should we switch to
it? Or ESP32? I would say it is time to say goodbye to ESP8266.

## Summary

Use ESP8266 where you don't need reliability or security. Use ESP32 and its
variants where you need reliability and security. Use ESP32C3 or ESP32 where
possible. If you are a commercial user of ESP8266, good luck.

## `esp-idf` and ESP8266 RTOS SDK

[`esp-idf`](https://github.com/espressif/esp-idf/), Espressif's official IoT
Development Framework, is one of the greatest SDKs by vendors. It is a fully
open-sourced, _truly_ community-driven SDK for ESP32 series. Its
documentation is well-written, maintained, and up-to-date. The SDK supports
all the ESP32 series.

[ESP8266 RTOS SDK](https://github.com/espressif/ESP8266_RTOS_SDK), the
official SDK for ESP8266, is not maintained as much as `esp-idf` is. The
documentation is sparse, and out-dated. Its README says they have a plan to
integrate the SDK into `esp-idf`, but the statement has been there for many
years without progress. While the SDK has incorporated many features and
compatibilities from `esp-idf`, but not quite compatible (SPI driver, for
example. I ported [many drivers](https://github.com/UncleRus/esp-idf-lib/)
from ESP32 to ESP8266, but not SPI-based ones).

There is another official SDK, ESP8266 Non-OS SDK. This SDK does not include
FreeRTOS, and Arduino ESP8266 is built on top of it. However, this SDK is now
obsolete, and Espressif will not maintain it. It is unlikely for Arduino
ESP8266 to support ESP8266 RTOS SDK (see the discussion in
[Issue #5790](https://github.com/esp8266/Arduino/issues/5790)). That means
ESP8266 Non-OS SDK, and Arduino ESP8266 as well, will not have a bright
future.

## Instability

I use many ESP8266 at Makers. Most of them are for simple purposes, such as
ambient sensors or relays for non-critical machines. The problem is, these
ESP8266 devices reboot &mdash; actually crash &mdash; sometimes. The crash is
not very reproducible; even an identical firmware crashes every 10 minutes, or
keeps running for several weeks. There are many similar reports in `esphome`
repository. One developer guessed the cause might be corrupted flash memory,
or a bug deep inside of the chip. For ambient sensors, reboot is not critical
if it reboots and becomes online again. But for relays that control critical
machines, such as 3D printers, the impact is much bigger. If reliability is
important, I will not use ESP8266.

## Security

ESP8266 does not support hardware encryption, or tamper protection. That means
you can dump the firmware, including secrets, from the flash memory. It is
impossible to secure the chip. When your secrets on the device is just WiFi
SSID and password, that might be acceptable, assuming the device has a certain
level of physical security. Otherwise, ESP32 is the only answer.

Encryption at software layer, i.e. HTTPS, requires lots of memory, and some
chips do not have enough memory, i.e. `esp01`. Recent ESP01 has more memory,
but you might give up OTA, or Over the Air update.

## Alternatives

As officially stated, ESP32C3 is the direct descendant of ESP8266. The price
cannot compete with ESP8266 yet, but cheaper than ESP32. `esp-idf` fully
supports it, and quite usable from my experiments. Less GPIO pins than ESP32,
but more than ESP8266.

ESP32-S3-MINI is another alternative, but not very commonly available.

ESP32 is also an alternative, but its power requirement is much higher than
ESP8266.

## Where to use ESP8266

I would choose ESP8266 for ambient sensors, and other non-critical purposes
only. I might use it as an alternative for AVR series because it has more
memory (but less GPIOs, less ADC, and power hungry). Light control with PIR
motion sensor? Maybe. Relays? No. I have several Sonoff relays, but will use
them for lighting systems or fans where a short disruption is acceptable.
Mobile use cases are good for ESP8266, where physical security is guaranteed.
Deep-sleeping devices are another use case for ESP8266, where the random crash
issue I mentioned is not a problem.

## Conclusion

Although it is not EoLed, ESP8266 is approaching to its end of life. Use
modern ESP32 series with `esp-idf`. It was a great product that made ESP32
possible. We loved it. Thank you, ESP8266.
