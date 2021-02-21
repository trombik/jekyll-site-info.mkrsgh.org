---
lang: en
title: "Review: ESP32-S2-Saola-1 and nanoESP32-S2"
header:
  overlay_image: /assets/img/esp32s2.png
  overlay_filter: 0.4
  show_overlay_excerpt: false
tags:
  - review
  - esp32
  - esp32s2
---

I recently bought two ESP32-S2 development boards, `ESP32-S2-Saola-1` and
`nanoESP32-S2`. ESP32-S2 is a recent addition to ESP32-family, a scaled-down
version of ESP32 with new peripherals and features. I have several ESP32 (and
tons of ESP8266) for developments, but not many ESP32-S2. While waiting
for the latest products &mdash; [ESP32-C3](https://www.espressif.com/en/news/ESP32_C3) &mdash;
from espressif, I would like to test the libraries and projects I maintain
with ESP32-S2. Here is my review.

## `ESP32-S2-Saola-1`

The official development board from espressif, or maybe a copy of it (the
seller claims it is genuine). espressif has, as always, [a great documentation
about the board](https://docs.espressif.com/projects/esp-idf/en/latest/esp32s2/hw-reference/esp32s2/user-guide-saola-1-v1.2.html).

{% responsive_image
    path: "assets/img/posts/esp32-s2-saola.png"
    alt: "Top and bottom views of ESP32-S2-Saola-1"
    caption: "ESP32-S2-Saora-1"
%}

The board uses 9 columns on a regular breadboard. Only a single column can be
used. You need to remove headers and solder long female strip connectors if
you would like to use a column on each side (or a hack similar to my
[Mini breadboard holder](https://github.com/trombik/3d-two-mini-breadboards)).

## `nanoESP32-S2`

`nanoESP32-S2` is another ESP32-S2 development board I found while looking for
ESP32-S2 at AliExpress. Interestingly, it has two USB Type C receptacles. I was
curious about it as the major new feature in ESP32-S2 chip is its USB stack.
Fortunately, the designer released the schematic and the firmware on GitHub,
which is a great plus.

{% responsive_image
    path: "assets/img/posts/nanoESP32-S2.png"
    alt: "Top and bottom views of nanoESP32"
    caption: "nanoESP32-S2"
%}

`nanoESP32-S2` is a pin-to-pin compatible development board designed by
[muselab](https://www.muselab-tech.com/) ([the official store at AliExpress](https://muselab-tech.aliexpress.com/store/5940159)).
The most noticeable difference is its two USB Type C receptacles, one for the
onboard USB-to-serial chip to download the firmware and serial communication
over USB, the other for ESP32 as USB device. To use USB stack on ESP32-S2, it
is a matter of routing two GPIOs, GPIO 20 for `DATA+`, GPIO 19 for `DATA-`,
but the Type C receptacle is a convenient addition for quick experiments.

`nanoESP32-S2` has pre-installed firmware (the source code is in [a GitHub
repository](https://github.com/wuxx/nanoESP32-S2)), which blinks the onboard
`WS2812`, and acts as a USB mass storage device. On my FreeBSD, the device is
detected, but the file system is not (it should work with Windows, I guess).

```console
kernel: ugen0.6: <TinyUSB TinyUSB Device> at usbus0
kernel: umodem0 on uhub0
kernel: umodem0: <TinyUSB CDC> on usbus0
kernel: umodem0: data interface 1, has no CM over data, has no break
kernel: umass1 on uhub0
kernel: umass1: <TinyUSB MSC> on usbus0
kernel: umass1:  SCSI over Bulk-Only; quirks = 0x0000
kernel: umass1:1:1: Attached to scbus1
kernel: da1 at umass-sim1 bus 1 scbus1 target 0 lun 0
kernel: da1: <TinyUSB Mass Storage 1.0> Removable Direct Access SCSI-2 device
kernel: da1: Serial Number 123456
kernel: da1: 1.000MB/s transfers
kernel: da1: 0MB (16 512 byte sectors)
kernel: da1: quirks=0x2<NO_6_BYTE>
```

Here is the log of serial port.

```console
ESP-ROM:esp32s2-rc4-20191025
Build:Oct 25 2019
rst:0x1 (POWERON),boot:0x8 (SPI_FAST_FLASH_BOOT)
SPIWP:0xee
mode:DIO, clock div:2
load:0x3ffe8100,len:0x4
load:0x3ffe8104,len:0x17f0
load:0x40050000,len:0x14b0
load:0x40054000,len:0x210c
entry 0x400502d8
I (48) boot: ESP-IDF v4.2-dev-1415-ga2263571b 2nd stage bootloader
I (48) boot: compile time 13:25:39
I (48) boot: chip revision: 0
I (51) boot.esp32s2: SPI Speed      : 40MHz
I (56) boot.esp32s2: SPI Mode       : DIO
I (61) boot.esp32s2: SPI Flash Size : 2MB
I (66) boot: Enabling RNG early entropy source...
I (71) boot: Partition Table:
I (75) boot: ## Label            Usage          Type ST Offset   Length
I (82) boot:  0 nvs              WiFi data        01 02 00009000 00006000
I (89) boot:  1 phy_init         RF data          01 01 0000f000 00001000
I (97) boot:  2 factory          factory app      00 00 00010000 00100000
I (104) boot: End of partition table
I (109) esp_image: segment 0: paddr=0x00010020 vaddr=0x3f000020 size=0x05a24 ( 23076) map
I (124) esp_image: segment 1: paddr=0x00015a4c vaddr=0x3ffbe3d0 size=0x03f28 ( 16168) load
I (131) esp_image: segment 2: paddr=0x0001997c vaddr=0x40024000 size=0x00404 (  1028) load
I (136) esp_image: segment 3: paddr=0x00019d88 vaddr=0x40024404 size=0x06290 ( 25232) load
I (153) esp_image: segment 4: paddr=0x00020020 vaddr=0x40080020 size=0x19868 (104552) map
I (182) esp_image: segment 5: paddr=0x00039890 vaddr=0x4002a694 size=0x03d30 ( 15664) load
I (194) boot: Loaded app from partition at offset 0x10000
I (194) boot: Disabling RNG early entropy source...
I (194) cache: Instruction cache   : size 8KB, 4Ways, cache line size 32Byte
I (202) cpu_start: Pro cpu up.
I (206) cpu_start: Application information:
I (210) cpu_start: Project name:     cdc_msc_freertos
I (216) cpu_start: App version:      6109c3e
I (221) cpu_start: Compile time:     Jul  8 2020 13:25:56
I (227) cpu_start: ELF file SHA256:  0341bd08bb34f761...
I (233) cpu_start: ESP-IDF:          v4.2-dev-1415-ga2263571b
I (240) cpu_start: Single core mode
I (244) heap_init: Initializing. RAM available for dynamic allocation:
I (251) heap_init: At 3FFC3B70 len 00038490 (225 KiB): DRAM
I (257) heap_init: At 3FFFC000 len 00003A10 (14 KiB): DRAM
I (263) cpu_start: Pro cpu start user code
I (323) spi_flash: detected chip: generic
I (323) spi_flash: flash io: dio
W (324) spi_flash: Detected size(4096k) larger than the size in the binary image header(2048k). Using the size in the binary image header.
I (334) cpu_start: Starting scheduler on PRO CPU.
```

## Differences

Although it claims pin-to-pin compatibility, there are some differences. From [the
schematic in the GitHub repository](https://github.com/wuxx/nanoESP32-S2/blob/master/schematic/nanoESP32S2-v1.2.pdf)
and my observation of the two, I picked them up for comparison.

|                            | [`Saola-1`](https://docs.espressif.com/projects/esp-idf/en/latest/esp32s2/hw-reference/esp32s2/user-guide-saola-1-v1.2.html) | [`nanoESP32-S2`](https://www.muselab-tech.com/nanoesp32-s2kai-fa-ban/) |
|----------------------------|----------------------------|---------------------|
| Schematic                  | [ESP32-S2-SAOLA-1_V1.1_schematics.pdf](https://dl.espressif.com/dl/schematics/ESP32-S2-SAOLA-1_V1.1_schematics.pdf) | [nanoESP32S2-v1.2.pdf](https://github.com/wuxx/nanoESP32-S2/blob/master/schematic/nanoESP32S2-v1.2.pdf) |
| Chip                       | ESP32-S2-WROOM             | ESP32-S2-WROVER     |
| `LDO`                      | `SGM2212`                  | `AMS1117`           |
| Size of `WS2812`           | 3.5 mm x 3.3 mm            | 3.2 mm x 2.5 mm     |
| USB receptacle             | USB Micro-B * 1            | USB Type C * 2      |
| Buttons                    | 2.8 mm x 2.0 mm (oval) * 2 | 1.5 mm (circle) * 2 |
| USB to serial              | `CP2102`                   | `CH340C`            |
| Pin headers                | soldered                   | not soldered        |
| Price (as of 2021-02)      | USD 14.80                  | USD 13              |

In general, `nanoESP32-S2` consists of cheaper components. The silkscreen is
very readable on both boards. The clearance from the pin header to the
silkscreen is bit too short on `nanoESP32`; this might become an issue when
you solder long female pin headers.  Most of, if not all, `Saola-1` sold in
AliExpress has the header pins soldered (I could not find any `Saola-1` copies
without pin headers soldered).  `ESP32-S2-SAOLA-1` has many thermal and
stitching vias, while `nanoESP32-S2` has none, which might work in most cases,
but may cause stability issues. The smaller buttons on `nanoESP32-S2` are bit
difficult to push, but I am fine with it. `ESP32-S2-SAOLA-1` has more passive
components not only for `CP2102`, but also for protection, such as clamping
diodes and current limiting resistors. `nanoESP32-S2` only has a fuse for
protection.

Note that, while my `nanoESP32-S2` has `ESP32-S2-WROVER` module, you can
choose `ESP32-S2-WROOM` if you like. IPEX antenna connector versions are also
available.

The major issue in `nanoESP32-S2` to me is: the LDO. `AMS1117` is the de-facto
LDO on many ESP32 and ESP8266 boards, but the LDO tends to cause stability
issues. On the other hand, `ESP32-S2-SAOLA-1` uses `SGM2212`. The `SGM2212`
looks like a LDO produced by a Chinese manufacturer. Quick search gave me some
_incomplete_ product pages by a Chinese distributor, which show part of the
data sheet.  They claims `SGM2212` is a drop-in replacement of `AMS1117`. Here
is the summary:

|                 | `SGM2212`       | `AMS1117`        | Unit |
|-----------------|-----------------|------------------|------|
| `Vin`           | 2.7 - 20        | 3 - 20           | V    |
| `Iout`          | 800             | 800              | mA   |
| `Iq`            | 80              | 5,000            | uA   |
| `Vdrop`         | 420 (at 800 mA) | 1300 (at 800 mA) | mV   |
| Line regulation | 0.03            | 0.2              | %/V  |
| Load regulation | 0.1             | 0.4              | %/A  |

[SLVA079 Understanding the Terms and Definitions of LDO Voltage Regulators](https://www.ti.com/lit/an/slva079/slva079.pdf)
by TI explains line regulation:

> Line regulation is a measure of the circuit’s ability to maintain the
> specified output voltage with varying input voltage.

and load regulation:

> Load regulation is a measure of the circuit’s ability to maintain the
> specified output voltage under varying load conditions.

In short, `SGM2212` drops `Vout` less than `AMS1117` under high `Vin` and
heavy load. The lower quiescent current means the chip runs better with a
battery than `AMS1117`, which is notorious in its transient response and high
power consumption. IMO, `AMS1117` should not be used with ESP32 (and ESP8266)
and other high-current applications.

## Conclusion

`ESP32-S2-SAOLA-1` is your first ESP32-S2 development board. It is
well-designed by the chip vendor, and has a (possibly) better LDO, which
avoids hard-to-debug issues caused by power stability.

`nanoESP32-S2` is better alternative if you are hard-supporter of USB Type C,
or those who want to explore USB stack on ESP32-S2 quickly and easily.

The other day, I wrote [a post](/blog/makerspace/2020/12/04/Review-LILYGO-TTGO-T8-ESP32-S2-WOOR/)
about another ESP32-S2 development board by LilyGo. It is cheap (USD 5) and,
thus, a good board for projects that need many ESP32-S2, but `ESP32-S2-SAOLA-1`
and `nanoESP32-S2` will be my primary development boards for ESP32-S2.
