---
title: Rust on ESP for FreeBSD
lang: en
tags:
  - freebsd
  - Espressif
  - esp32
  - rust
---

I have been working on FreeBSD ports of Rust on ESP. In addition to C/C++
tool-chains,
[trombik/xtensa-esp32-elf](https://github.com/trombik/xtensa-esp32-elf/)
includes the following Rust on ESP ports.

* `lang/rust-esp`
* `lang/rust-esp-src`
* `devel/esp-llvm-embedded-toolchain`
* `devel/esp-llvm-embedded-toolchain-libs-clang`
* `devel/espflash`
* `emulators/qemu-esp`
* `emulators/wokwi-server`

`espup` &mdash; `rustup` for ESP &mdash; has not been ported. The tool is
sort of "a package manager for rust tool-chains" to switch Rust versions.
Currently, I don't think it is necessary for me.

With these ports, you can follow instructions on
[The Rust on ESP book](https://docs.esp-rs.org/book/). The ported packages can
successfully compile Both of "bare-metal" (`no_std`), and "esp-idf" (`std`)
projects. Some environment variables must be configured. Here is
[my script to set environment variables for `esp-idf` and Rust on ESP](https://gist.github.com/trombik/8c3b964bcdc010bca0a6f02734dba1c1).
To compile them, clone the repository and create an overlay with `poudriere(8)`.

[The Rust on ESP book](https://docs.esp-rs.org/book/)
is a great book in addition to
[The Embedded Rust Book](https://docs.rust-embedded.org/book/).

Here is my favourite links to learn Rust on ESP:

* [ESP32 Standard Library Embedded Rust: GPIO Control](https://blog.theembeddedrustacean.com/esp32-standard-library-embedded-rust-gpio-control)
* [ESP32 with Embedded Rust at the HAL](https://blog.theembeddedrustacean.com/series/esp32c3-embedded-rust-hal)
* [Edge IoT with Rust on ESP: Connecting WiFi](https://blog.theembeddedrustacean.com/edge-iot-with-rust-on-esp-connecting-wifi)
* [Awesome ESP Rust](https://github.com/esp-rs/awesome-esp-rust)

## My impression about Rust

It certainly excels at what it promises; type safety and memory safety.
String is easier to handle. Library management is a bit tricky sometimes. It
requires you to understand new ideas; lifetime and ownership. I like the Rust
project provides standard tools; you don't have to choose tools to use for
library management or code formatter. Supporting different architectures is
easier and less messy. I'm still learning, but Rust looks very fun to play
with.

The state of Rust on ESP is more than what you expect but less than what you hoped for.
`esp-idf` has extensive documentations. With decent C knowledge, it is not
difficult to write an application by following the official documentation. In
case of Rust on ESP, library reference manuals are a bit sparse. However,
Espressif has been investing on Rust for years. I am sure that they will
create ones as nice as `esp-idf`.
