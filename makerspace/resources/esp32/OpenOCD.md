---
title: Debugging ESP32 code with OpenOCD
toc: true

---

Stop debugging code with `printf(3)`. Working with `gdb(1)` for ESP32 is
integrated in `eps-idf`, and is far easier than you think.

{: .notice--warning }
If you are using Arduino, instead of `esp-idf`, as a framework, look
elsewhere. I know nothing about Arduino.

{: .notice--warning }
If your machine is Windows, look elsewhere. I know nothing about Windows.

{: .notice--info }
If you have one of the official development boards from espressif, read the
official documentation,
[JTAG Debugging](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/index.html),
instead of this article because it is well-written. This article is written
for those without.

## Summary

To debug your code, you need:

* `esp-idf`
* [OpenOCD for ESP32](https://github.com/espressif/openocd-esp32)
* `gdb` for ESP32 (included in `esp-idf` toolchain)
* A 3.3 V USB JTAG adapter and a device driver for the USB JTAG adapter

## `esp-idf`

Install `esp-idf`. Follow instructions in the official documentation,
[Get Started](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#get-started-set-up-env).

## OpenOCD for ESP32

OpenOCD is an On-Chip-Debugger. OpenOCD accepts debug commands from a debugger,
and controls the MCU.

OpenOCD for ESP32 is installed during `esp-idf` install process. This version
is a fork: OpenOCD package from your distribution will not work unless the
maintainer of the package apply patches to the source (usually, not).

{: .notice--info }
espressif maintains a fork of OpenOCD at [espressif/openocd-esp32](https://github.com/espressif/openocd-esp32).

{: .notice--info }
For FreeBSD users, ports are available at
[trombik/freebsd-ports-openocd-esp32](https://github.com/trombik/freebsd-ports-openocd-esp32).

`openocd` must be in `$PATH` environment variable. If you have another
`openocd` installed on your machine, the `openocd` for ESP32 must come first.

```console
openocd --version
Open On-Chip Debugger  -snapshot (2022-01-06-22:27)
Licensed under GNU GPL v2
For bug reports, read
    http://openocd.org/doc/doxygen/bugs.html
```

## `gdb` debugger for ESP32

`gdb` is GNU debugger. A `gdb` for ESP32 is included in the official
toolchain. You need a specific `gdb` for your target; when the target is ESP32,
you need `gdb` for ESP32. If the target is ESP32S2, you need `gdb` for
ESP32S2.

{: .notice--info }
espressif maintains a fork of `binutils-gdb` at
[espressif/binutils-gdb](https://github.com/espressif/binutils-gdb). If no
official toolchain is available for your machine, you can build `gdb` from the
source.

{: .notice--info }
For FreeBSD users, ports are available at [trombik/xtensa-esp32-elf](https://github.com/trombik/xtensa-esp32-elf).
Install [devel/xtensa-esp32-elf](https://github.com/trombik/xtensa-esp32-elf/tree/devel/devel/xtensa-esp32-elf).

The file name of `gdb` for ESP32 is not `gdb` because it is a `gdb` for a
specific target, and it cannot debug binaries for other targets. The file name
is in the form of `$TARGET-gdb`, for example, `xtensa-esp32-elf-gdb` for ESP32,
and `xtensa-esp32s2-elf-gdb` for ESP32S2. They must be in your `$PATH`
environment variable. If you are not sure, run the `gdb` in your shell without
full path to the file. The result should be like the following instead of
`command not found`.

```console
> xtensa-esp32-elf-gdb --version
GNU gdb (crosstool-NG esp-2021r2) 9.2.90.20200913-git
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

## JTAG Adapter

A JTAG adapter is an interface to the device under test. Some development
boards, such as
[ESP-WROVER-KIT](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-wrover-kit.html),
has a JTAG debugger on board. If your board is one of the official espressif
development boards, read the official documentation,
([JTAG Debugging](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/index.html))
instead.

Here, it is assumed that your development board is one of Chinese clones
without JTAG adapter.

Buy a JTAG adapter supported by OpenOCD. The OpenOCD project has a list of
supported hardware at
[Debug Adapter Hardware](https://openocd.org/doc/html/Debug-Adapter-Hardware.html).
Note that some JTAG adapters are designed for specific MCUs. For example,
ST-LINK works only with STM32 MCUs. My recommendation is a generic FT232H
USB board (usually USD 10 at AliExpress). Another one is FT2232H USB board
(USD 12). FT2232H has two channels; you can debug code with JTAG interface,
and see the UART output from the MCU at the same time. With FT232H, you need
two USB cables; one for FT232H, and another for UART. Both of them support 3.3
V.

The datasheet for FT2232H is available at FTDI website
([FT2232H Datasheet](https://ftdichip.com/wp-content/uploads/2020/07/DS_FT2232H.pdf)).

{: .notice--info }
FT2232H series supports Multi-Protocol Synchronous Serial Engine, or `MPSSE`.
In short, you can talk multiple protocols, not only JTAG but also SPI and I2C,
over USB. This is valuable because you can control sensors or chips from your
machine.

In this article, FT232H is interchangeable with FT2232H.

FT2232H is supported by most of Unix variants by default. You do not need to
install a driver for FT232H. However, `MPSSE` support may vary.

Make sure the device file is accessible. On my FreeBSD machine, the device
file of the JTAG adapter is `/dev/usb/0.7.0`. By default, generic USB device
files are not accessible by average users. `dmesg(8)` shows you the device
name.

```console
> dmesg | tail
ugen0.7: <FTDI Single RS232-HS> at usbus0
uftdi0 on uhub1
uftdi0: <Single RS232-HS> on usbus0
```

```console
> ls -al /dev/usb/0.7.0
crw-------  1 root  operator  0x19a Jan  7 08:22 /dev/usb/0.7.0
```

Change the permission of the file so that you have read and write permission
on the file.

On FreeBSD, you can see details of USB devices by `usbconfig(8)`.

```console
> sudo usbconfig
ugen1.1: <0x8086 XHCI root HUB> at usbus1, cfg=0 md=HOST spd=SUPER (5.0Gbps) pwr=SAVE (0mA)
ugen0.1: <0x8086 XHCI root HUB> at usbus0, cfg=0 md=HOST spd=SUPER (5.0Gbps) pwr=SAVE (0mA)
ugen0.2: <vendor 0x8087 product 0x0a2b> at usbus0, cfg=0 md=HOST spd=FULL (12Mbps) pwr=ON (100mA)
ugen0.3: <Chicony Electronics Co.,Ltd. Integrated Camera> at usbus0, cfg=0 md=HOST spd=HIGH (480Mbps) pwr=ON (500mA)
ugen0.4: <vendor 0x06cb product 0x009a> at usbus0, cfg=0 md=HOST spd=FULL (12Mbps) pwr=ON (100mA)
ugen0.5: <Generic USB3.0-CRW> at usbus0, cfg=0 md=HOST spd=SUPER (5.0Gbps) pwr=ON (200mA)
ugen0.6: <Silicon Labs CP2102 USB to UART Bridge Controller> at usbus0, cfg=0 md=HOST spd=FULL (12Mbps) pwr=ON (100mA)
ugen0.7: <FTDI Single RS232-HS> at usbus0, cfg=0 md=HOST spd=HIGH (480Mbps) pwr=ON (500mA)

> sudo usbconfig -d ugen0.7 dump_device_desc
ugen0.7: <FTDI Single RS232-HS> at usbus0, cfg=0 md=HOST spd=HIGH (480Mbps) pwr=ON (500mA)

  bLength = 0x0012
  bDescriptorType = 0x0001
  bcdUSB = 0x0200
  bDeviceClass = 0x0000  <Probed by interface class>
  bDeviceSubClass = 0x0000
  bDeviceProtocol = 0x0000
  bMaxPacketSize0 = 0x0040
  idVendor = 0x0403
  idProduct = 0x6014
  bcdDevice = 0x0900
  iManufacturer = 0x0001  <FTDI>
  iProduct = 0x0002  <Single RS232-HS>
  iSerialNumber = 0x0000  <no string>
  bNumConfigurations = 0x0001
```

Important bits in this information are `idVendor`, or `vid`, and `idProduct`,
or `pid`. In my case, `vid` is `0x0403`, and `pid` is `0x6014`. You need them
when you configure `OpenOCD` later.

## Wiring

JTAG uses four wires for communication, and one for common GND.

| ESP32         | FT2232H   |
|---------------|-----------|
| GPIO13 (MTCK) | AD0 (TCK) |
| GPIO12 (MTDI) | AD1 (TDI) |
| GPIO15 (MTDO) | AD2 (TDO) |
| GPIO14 (MTMS) | AD3 (TMS) |
| GND           | GND       |

See "3.1.2 Pin Descriptions" in the FT2232H datasheet for more details.

Even when your JTAG board is not FT2232H, the rule is same: connect `TCK`,
`TDI`, `TDO`, and `TMS` to corresponding pins on ESP32.

FT2232H boards usually have 3.3 V output for MCUs, but it is strongly
recommended to provide power to the MCU from an external power source.

{: .notice--info }
Unstable power is one of major causes of instabilities, or unexpected
behaviours. Always ensure the power rail has stable 3.3 V (use an oscilloscope)
. Do not omit decoupling capacitors. Use a better LDO (AMS1117 that often
comes with cheap development boards is not very good). USB port is not a good
source of power. Use an external power source if in doubt.

## Configuring `openocd` for ESP32

TBW

## Running `openocd`

```console
> idf.py openocd --openocd-commands '-f esp32-wrover-kit-3.3v.cfg' gdbgui
Executing action: openocd
OpenOCD started as a background task 67085
Executing action: gdbgui
gdbgui started as a background task 67092
Executing action: post_debug
Open On-Chip Debugger  -snapshot (2022-01-06-22:27)
Licensed under GNU GPL v2
For bug reports, read
    http://openocd.org/doc/doxygen/bugs.html
Info : Listening on port 6666 for tcl connections
Info : Listening on port 4444 for telnet connections
Warn : libusb_detach_kernel_driver() failed with LIBUSB_ERROR_OTHER, trying to continue anyway
Info : ftdi: if you experience problems at higher adapter clocks, try the command "ftdi_tdo_sample_edge falling"
Info : clock speed 20000 kHz
Info : JTAG tap: esp32.cpu0 tap/device found: 0x120034e5 (mfg: 0x272 (Tensilica), part: 0x2003, ver: 0x1)
Info : JTAG tap: esp32.cpu1 tap/device found: 0x120034e5 (mfg: 0x272 (Tensilica), part: 0x2003, ver: 0x1)
Info : esp32.cpu0: Target halted, PC=0x400D63C4, debug_reason=00000001
Info : esp32.cpu1: Target halted, PC=0x4014232E, debug_reason=00000000
Info : starting gdb server for esp32.cpu0 on 3333
Info : Listening on port 3333 for gdb connections
Info : accepting 'gdb' connection on tcp/3333
Warn : No symbols for FreeRTOS!
Info : esp32.cpu0: Target halted, PC=0x40092AEE, debug_reason=00000001
Info : Set GDB target to 'esp32.cpu0'
Info : Flash mapping 0: 0x10020 -> 0x3f400020, 88 KB
Info : Flash mapping 1: 0x30020 -> 0x400d0020, 474 KB
Info : esp32.cpu0: Target halted, PC=0x40092AEE, debug_reason=00000001
Info : Auto-detected flash bank 'esp32.cpu0.flash' size 4096 KB
Info : Using flash bank 'esp32.cpu0.flash' size 4096 KB
Info : esp32.cpu0: Target halted, PC=0x40092AEE, debug_reason=00000001
Info : Flash mapping 0: 0x10020 -> 0x3f400020, 88 KB
Info : Flash mapping 1: 0x30020 -> 0x400d0020, 474 KB
Info : Using flash bank 'esp32.cpu0.irom' size 476 KB
Info : esp32.cpu0: Target halted, PC=0x40092AEE, debug_reason=00000001
Info : Flash mapping 0: 0x10020 -> 0x3f400020, 88 KB
Info : Flash mapping 1: 0x30020 -> 0x400d0020, 474 KB
Info : Using flash bank 'esp32.cpu0.drom' size 92 KB
Info : New GDB Connection: 1, Target esp32.cpu0, state: halted
Warn : Prefer GDB command "target extended-remote 3333" instead of "target remote 3333"
Info : JTAG tap: esp32.cpu0 tap/device found: 0x120034e5 (mfg: 0x272 (Tensilica), part: 0x2003, ver: 0x1)
Info : JTAG tap: esp32.cpu1 tap/device found: 0x120034e5 (mfg: 0x272 (Tensilica), part: 0x2003, ver: 0x1)
Info : esp32.cpu0: Debug controller was reset.
Info : esp32.cpu0: Core was reset.
Info : esp32.cpu0: Target halted, PC=0x500000CF, debug_reason=00000000
Info : esp32.cpu0: Core was reset.
Info : esp32.cpu0: Target halted, PC=0x40000400, debug_reason=00000000
Info : esp32.cpu1: Debug controller was reset.
Info : esp32.cpu1: Core was reset.
Info : esp32.cpu1: Target halted, PC=0x40000400, debug_reason=00000000
Info : esp32.cpu0: Target halted, PC=0x400D63C4, debug_reason=00000001
Info : Set GDB target to 'esp32.cpu0'
Info : esp32.cpu1: Target halted, PC=0x4014232E, debug_reason=00000000
```

The default URL is http://127.0.0.1:5000/.

If you prefer CLI, run `gdbtui` instead of `gdbgui`.

```console
idf.py openocd --openocd-commands '-f esp32-wrover-kit-3.3v.cfg' gdbtui
```

```console
env OPENOCD_SCRIPTS=/usr/local/share/openocd-esp32/scripts idf.py openocd --openocd-commands '-f ../../esp32-wrover-kit-3.3v.cfg' gdbtui
```
