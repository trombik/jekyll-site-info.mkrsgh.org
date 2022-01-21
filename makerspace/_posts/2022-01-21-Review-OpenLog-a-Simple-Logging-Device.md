---
title: "Review: `OpenLog`, a simple logging device"
tags:
  - review

---

I bought a small module built around `ATMega328p`. It is a serial port logger
device with an SD card slot. Here is why you need it, why it is useful, and how
you use it.  The official documentation, [`OpenLog` Hookup Guide](https://learn.sparkfun.com/tutorials/openlog-hookup-guide),
was written by a developer &mdash; probably the author of the code &mdash;
not a technical writer. The documentation is confusing &mdash; sometimes
conflicting &mdash;, includes _friendly_ expressions, which are not friendly
at all to non-native English speakers, and lacks critical information such as
absolute maximum ratings. Here is my interpretation and the findings in my
test.

## The problem

Last year, I wrote a firmware for `ESP8266` and `ESP32`. The firmware &mdash;
[`roomPing`](https://github.com/trombik/roomPing) &mdash; is a sensor that
periodically reads `RSSI`, or signal strength, and sends `ICMP` echo requests
to destinations. The device then sends the results to a `MQTT` broker. Another
`MQTT` client reads the values, transform them, and sends the data to
`influxdb`. That way, I can monitor signal strength and network health in
multiple rooms. Several devices have been deployed, and I was happy with the
visualization.

The problem is, the firmware reboots every day or two. Sometime the uptime is
more than three days, but no more than a week. The firmware probably crashes,
and reboots. From the practical point of view, it does not really matter. The
interval is 5 minutes, and missing few data points do not affect the result.
However, I am not happy with the bug. It should be resolved. All I need is a
crash log. One way to do it is, obviously, connecting a computer, and to log
all the logs. But I wanted a simpler &mdash; and cheaper &mdash; solution.
This is what `OpenLog` is designed for; logging characters from serial port, and
save them on SD card.

When managing physical servers, I built a network dedicated for serial
console. Some consoles were implemented with `IPMI`, and others were plain old
serial console. They were tremendously useful when you need console access,
i.e. upgrading operation system, changing BIOS settings, and debugging.
However, for two dozens of small IoT devices, it is not very practical.
Besides, I also have many ARM System-on-a-Chip servers, too. I would like to
record all the serial console log, too. A central, remote serial console
server is the best solution, but that would be very expensive. While you
cannot interact with the console, logging would be useful for debug.

## Overview

`OpenLog` is a small and cheap logger, is able to log outputs from other
devices over serial, and saves the logs on SD card. The device is quite useful
when you debug bugs on long-running devices, collect data from other devices,
and monitor small System-on-a-Chip boards. It does not perform very well when
baud rate is fast, but covers most of use cases.

`OpenLog` was designed and open-sourced by [sparkfun](https://www.sparkfun.com/).
The code is available on
[the official GitHub repository](https://github.com/sparkfun/OpenLog).
The price at sparkfun is USD 15.50 (as of 2022-01). My favorite AliExpress
seller sells a copy of it at USD 2.17 excluding shipping fee.

The board has a microcontroller, `ATMega328p`, an SD card slot, breakout
headers, and a few passive components.

| | Rating |
|-|--------|
| `Vcc` | 3.3 V - 5 V (12 V max) |
| `RX` voltage | 2.0 V - 3.8V (6 V max) |
| `TX` voltage | 3.3 V |
| Current draw | 20 mA - 23 mA |

The `ATMega328p` runs at 3.3V even when you supply 5V (or more), the onboard
3.3V regulator drops the `VCC` to 3.3V.

The official documentation says `OpenLog` supports 64MB to 32GB while the
datasheet page in the Wiki says the maximum is 16GB. The page also says they
tested 64GB SD card. It's up to you to believe which. My SD card used in the
test is 32GB. Make sure the SD card is formatted in `FAT16` or `FAT32`.

Although the official documentation does not mention it, the maximum voltage
on `RXI` pin is 6V according to
[the wiki page on GitHub repository](https://github.com/sparkfun/OpenLog/wiki/Datasheet).
You can monitor 3.3V and 5V devices with `OpenLog`.

The input buffer of `ATMega328p` is small. Writing data on SD card takes time.
If the monitored device outputs many logs, or the baud rate is fast, `OpenLog`
cannot catch up with it. If you need more performance, use other loggers.

All in all, `OpenLog` covers most of my use cases with the cheap price tag.

## Usage

In the following sections, I will describe the possibly simplest usage,
hooking up `OpenLog` and a device &mdhash; the monitored device &mdash;,
configure `OpenLog`, and logging serial outputs from the monitored device.

## Materials

What you need are:

- a device you want to record logs from
- a breadboard and a few jumper wires
- an SD card reader
- a micro SD card (64MB - 32GB, `FAT16` or `FAT32`, no `NTFS`)

## Hooking up

You need to connect at least two pins to the monitored device, `RXI` to `TX`
pin of the monitored device, `GND` to the `GND` of the monitored device.
`VCC` _MAY_ be connected to `5V` or `3.3V` of the monitored device if you are
fine with a few missing logs after power cycle.

The board has 10 breakout headers. The four on one side is used to upload
`OpenLog` firmware to `ATMega328p`. Unless you would like to modify the
firmware, or upload the latest firmware, you do not need to use them. Six on
the other side are bit confusing. The official documentation mentions the
headers, but did not explain what they are, other than simply calling them
_the FTDI header_.

| Pin name (pin name on copy) | Description | Required for logging? |
|-----------------------------|-------------|-----------------------|
| `GRN` (`DTR`) | Connected to reset pin of `ATMega328p`. Used to reset the `OpenLog` from an external device by pulling LOW | No |
| `RXI` | `RX` input. Serial data output pin (TX) from the monitored device should be connected to this pin | Yes |
| `TXO` | `TX` output. Normally, `OpenLog` does not send data over serial when monitoring a device. However, it has a console interface to modify settings of `OpenLog` from your computer. When you interact with the console of `OpenLog`, the pin is used for the communication | No |
| `VCC` (`RAW`) | `VCC` input. You _MAY_ provide `VCC` from the monitored device to the pin, but early logs will be lost when the monitored device boots faster than `OpenLog` does. If you need complete logs, provide independent power source and ensure that `OpenLog` boots earlier than the monitored device | Yes |
| `GND` | `GND`. Make sure `OpenLog` and the monitored device shares the common ground | Yes |
| `BLK` | This pin is tied with `GND`. Probably used by _the FTDI cable_, which I don't use | No |

## Configuring

If the baud rate of the monitored device is 9600, you do not need to configure
anything. If not, keep reading.

`OpenLog` reads a configuration file, `config.txt`, from the SD card. It creates
the file, if the file does not exist on the SD card. Simply power the both
`OpenLog` and the monitored device. `OpenLog` creates the default configuration
file even when the baud rate is wrong. Turn off the devices and put the SD
card to your SD card reader. There should be `config.txt`.

Open `config.txt` and replace `9600` with the baud rate. The default baud rate
of `ESP8266 RTOS SDK` is `74880`, while `esp-idf` is `115200`. Other common baud
rates are:

- `9600` (default for old devices and `arduino`)
- `19200` for various Unix operating systems

As stated in the official documentation, the read buffer of `OpenLog` is small.
Increasing baud rate increases possibility to miss some logs.

`config.txt` has other parameters you can modify, but &mdash; unless you have weird
devices &mdash; the defaults should work fine.

## Logging

Now `config.txt` has the correct baud rate, just simply insert the SD card to
the SD card slot, and boot `OpenLog` and the monitored device. You should see
one of the onboard LED flushing while `OpenLog` receives characters from the
monitored device. Turn off the devices, and read the SD card.  There should be
`LOGXXXXX.TXT`, where `XXXXX` is the number of the log.

Some frameworks enable colors in logs by default. For example, `ESP_LOGI`
&mdash; a macro of `esp-idf` to print texts &mdash; appends green color
control sequences to the texts. If you would like to keep the code intact but
to remove them, use:

```console
sed -e 's/\x1B\[[0-9;]*[JKmsu]//g' LOGXXXXX.TXT
```

If you want to the log intact but make it eye-friendly, use `less(1)`:

```console
less -R LOGXXXXX.TXT
```

Also, [`AnsiEsc.vim`](https://www.vim.org/scripts/script.php?script_id=302)
`vim` plug-in highlights the colored text.

## Further reading

[The Wiki pages](https://github.com/sparkfun/OpenLog/wiki) has more
information than the official documentation. If you need to configure `OpenLog`
over serial port, or to access to the console interface of `OpenLog`, the wiki
pages _and_ the source code are your friends. In most cases, you don't.

## Possible improvements

The code is written in `arduino`. You might be able to port the code to
`ESP8266` or `ESP32` so that you can view the log over WiFi.

Adding `18650` battery shield to `OpenLog`. `OpenLog` sleeps when no data is
available. It might be possible to run `OpenLog` on a battery a few days or a
week.

## Final words

I like `OpenLog`. It is cheap and small, easy to use, does one thing, and does
it well. I bought five of them, and will place another order. You should have
a few of them in your gadget bin, too.
