---
title: ESP32 and ESP8266 development on FreeBSD
header:
  overlay_image: /assets/img/esp32s2.png
  overlay_filter: 0.6
  show_overlay_excerpt: false
tags:
  - esp32
  - esp8266
  - freebsd
---

I have been developing applications for `ESP32` and `ESP8266` devices on
FreeBSD for quite some time. Here is a summary of how to develop code for the
embedded devices on FreeBSD.

FreeBSD Wiki has [a page](https://wiki.freebsd.org/electronics/arduino/esp32)
about the same topic. However, it includes quite a lot of messy hacks.
{: .notice--info}

To build projects, you need two requirements; SDK (`arduino` people call it
_core_) and toolchain. An SDK provides standard functions and libraries. A
toolchain provides programs to compile and link your code. SDK and toolchain
are tightly coupled. You cannot swap one of it; you have to install a
toolchain for an SDK.

## ESP32 Overview

ESP32 development is easier than `ESP8266`. Unless required, choose `esp-idf`.
Otherwise, use `espressif/arduino-esp32`.

### esp-idf

Choose this SDK, if you want to write C code, or prefer well-documented SDK
and build environment. `espressif` does not support FreeBSD, but they have
been very open to patches.

The SDK depends on the official toolchain, [`espressif/crosstool-NG`](https://github.com/espressif/crosstool-NG).
The port in the official FreeBSD ports tree is lagged behind. Besides, it does
not allow to install multiple versions.

My updated version can be found at [`trombik/xtensa-esp32-elf`](https://github.com/trombik/xtensa-esp32-elf).
The port has `FLAVOR`, `idf3` and `idf4`. Each corresponds to `esp-idf`
version. Choose the one you are using. Note that there is no reason to develop
new application with `esp-idf` version 3.x. The version 4.x is far better. If
you are developing your own code, choose `idf4`.

## `espressif/arduino-esp32`

Choose this SDK, if you want to write C++ code, or to use `arduino` libraries.

The SDK depends on specific version of the official toolchain.
[Their release page](https://github.com/espressif/arduino-esp32/releases)
mentions which `esp-idf` is used for releases. Use `FLAVOR` mentioned above to
choose version.

## ESP8266 Overview

For `ESP8266`, there are two options: [ESP8266 RTOS SDK](https://github.com/espressif/ESP8266_RTOS_SDK),
or `esp-idf`, and [`esp8266/Arduino`](https://github.com/esp8266/Arduino).
ESP8266 RTOS SDK works when it works, but `esp8266/Arduino` is better. 
[esp-open-rtos](https://github.com/SuperHouse/esp-open-rtos) is another
option, but is not updated very often.

### ESP8266 RTOS SDK

Choose this SDK if you want to develop applications compatible with `esp-idf`
for ESP32, or to write pure C code. As I do not like `arduino`, I usually
choose the SDK. The SDK is poorly maintained, but libraries and build
procedures are quite _similar_ &mdash; but not identical &mdash; to `esp-idf`.
You can port code for `ESP32` to `ESP8266` _most of time_. Unfortunately,
libraries in the ESP8266 RTOS SDK are often out-of-sync, especially networking
libraries. Issues and Pull Requests are ignored. The documentation is poor.

The SDK depends on the official toolchain from `espressif`, [espressif/crosstool-NG](https://github.com/espressif/crosstool-NG).
I ported the toolchain based on the one written by others,
which can be found at:
[trombik/freebsd-ports-xtensa-lx106-elf](https://github.com/trombik/freebsd-ports-xtensa-lx106-elf).

ESP8266 RTOS SDK released several versions, but you often have to use `master`
branch because fixes in `esp-idf` are not merged in a timely fashion.
{: .notice--warn}

### esp8266/Arduino

Choose this SDK, when you want to use libraries for `arduino`, or to write
C++. The documentation is better than ESP8266 RTOS SDK, but less than
`esp-idf` for `ESP32`.

The SDK depends on a third-party toolchain, `esp-quick-toolchain`. The
toolchain is developed for specific GCC versions. You must use a version of
the SDK designed for the GCC version used in the `esp8266/Arduino`. At the moment,
`esp8266/Arduino` version 3.x.x uses GCC 10.x, `esp8266/Arduino` version 2.x.x
uses GCC 4.8.

I ported the toolchain for FreeBSD &mdash; `devel/esp-quick-toolchain` &mdash
which can be found at:
[trombik/freebsd-ports-esp-quick-toolchain](https://github.com/trombik/freebsd-ports-esp-quick-toolchain/tree/main/devel/esp-quick-toolchain).

The port has `FLAVORS` so that you can install one toolchain for
`esp8266/Arduino` version 2.x.x, and another for version 3.x.x.

## Build system

A build system is a system to compile, link, and upload your code. You have a
few options:

* `arduino` IDE
* `platformio`
* `esphome`
* `idf.py` of `esp-idf`

[`arduino` IDE](https://www.arduino.cc/en/software) is not recommended because
the GUI is counter-intuitive, hard to maintain projects, and all other reasons
why you should avoid GUI. The FreeBSD ports tree has a port of `arduino` GUI,
but the port is not `esp`-friendly.  The maintainer decided to drop the
library manager all together, which makes it quite useless.  The upstream has
recently released a CLI version, but I have not tried yet.  The FreeBSD ports
tree has two versions:
[`devel/arduino`](https://www.freshports.org/devel/arduino/)
and [`devel/arduino18`](https://www.freshports.org/devel/arduino18/).
Confusingly, `devel/arduino` is very old version, and
should not be used. Use `devel/arduino18` if you really need to.

[`platformio`](https://platformio.org/) works _mostly_ fine on FreeBSD. The
major issue is; they maintain their own binaries. As you would guess, they do
not publish binaries for FreeBSD. However, with my private ports and `symlink`
hacks, it works. You don't have to install random binaries from the Internet.
See how to use my ports with `platformio` in the `README`s of the ports.

[`esphome`](https://esphome.io/) is _sort of_ block programming for `esp32`
and `esp8266`. In most cases, your code does same things, like reading sensor
values in a loop, publishing values over MQTT, displaying results on a display,
performing `OTA`, etc. Even when there are many libraries available, it is
still repetitive, and boring.  `esphome` do these routines, and you can focus
on the core logic. All your code is in a `YAML` file, but you can implement
quite complex logics.  `esphome` is actually using `platformio` as their build
system.  If `platformio` works on your machine, `esphome` should work, too.
`esphome` is C++ framework, using `esp8266/Arduino` behind the scene. That
means you need to install my `devel/esp-quick-toolchain` port.
`esphome` is recommended for sensors and home automation devices. `esphome` is
integrated in [`homeassistant`](https://www.home-assistant.io/),
but not very tightly. You can still write independent devices or sensors
without `homeassistant`.

`idy.py` is a CLI tool for `esp-idf`. With my ports, it works on FreeBSD
(remember to use `esp-idf` version 4.x.x). They still support GNU `make` build
system, but it has been deprecated.

## Conclusion

Embedded development for `ESP32` and `ESP8266` is possible on FreeBSD. Prefer
`esp-idf` SDK, which is very well-documented. For `ESP8266`, your best bet would
be `esp8266/Arduino` version 3.x.x, which is based on `esp-idf` version 4.x.x.
Use `platformio`, or `esphome` for building `arduino` code. Use `idf.py` for
`esp-idf`.
