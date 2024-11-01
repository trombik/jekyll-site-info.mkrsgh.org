---
title: Rust on ESP Cheat Sheet
lang: en
toc: true
tags:
  - espressif
  - esp32
  - rust
---

My cheat sheet for Rust on ESP. For Rust in general, see
[The Rust Programming Language](https://doc.rust-lang.org/stable/book/) and
[The Embedded Rust Book](https://docs.rust-embedded.org/book/).

I'm very new to Rust. This is a list of things I had to spend more than five
minutes to find solutions or I cannot remember yet, not a How-To.

## Creating a project

```console
cargo install cargo-generate
cargo generate esp-rs/esp-template
cd $MY_PROJECT
cargo build
cargo espflash flash --monitor
```

### Generating Projects from Templates

Install `cargo-generate`.

```console
cargo install cargo-generate
```

For `no_std` projects:

```console
cargo generate esp-rs/esp-template
```

For `std`, or `esp-idf`-based projects:

```console
cargo generate esp-rs/esp-idf-template cargo
```

See also:
[Generating Projects from Templates](https://docs.esp-rs.org/book/writing-your-own-application/generate-project/index.html)

### "blink" example

See
[blinky.rs](https://github.com/esp-rs/esp-idf-hal/blob/master/examples/blinky.rs).

See
[ESP32 Embedded Rust at the HAL: GPIO Button Controlled Blinking](https://blog.theembeddedrustacean.com/esp32-embedded-rust-at-the-hal-gpio-button-controlled-blinking)
for a more detailed example.

### Building a project for a non-default target

```console
cargo build --target=xtensa-esp32s2-espidf
```

### Supporting multiple targets in a project

Some HAL crates, such as `esp-hal`, require a feature to be enabled. In
`Cargo.toml`:

```toml
...

[features]
# define a feature of `esp-hal` by defining a project feature.
# my_feature = ["crate_name/feature"]

# when `esp32` feature is requested, enable `esp32` feature of `esp-hal`.
esp32 = ["esp-hal/esp32"]

# when `esp32s2` feature is requested, enable `esp32s2` feature of `esp-hal`.
esp32s2 = ["esp-hal/esp32s2"]

...

[dependencies]
# disable `default-features`. required features are defined by `features`
# above.
esp-hal = { version = "0.21.0", default-features = false }
```

Build the project for `esp32s2`.

```console
cargo build --features esp32s2
```

See also: [Features](https://doc.rust-lang.org/cargo/reference/features.html)

### Formatting files

```console
cargo fmt -v
```

Check only:

```console
cargo fmt --check -v
```

Or, directly invoke `rustfmt`.

```console
rustfmt src/main.rs
```

Linting only:

```console
rustfmt --check src/main.rs
```

See also:

* [Rustfmt](https://rust-lang.github.io/rustfmt/)
* [Rust Style Guide](https://doc.rust-lang.org/beta/style-guide/index.html)
* [rust-lang/rust.vim](https://github.com/rust-lang/rust.vim)

### Using a C library from a Rust application

See
[Rust FFI and bindgen: Integrating Embedded C Code in Rust](https://dev.to/theembeddedrustacean/rust-ffi-and-bindgen-integrating-embedded-c-code-in-rust-26j6).

See also:

* [Foreign Function Interface](https://doc.rust-lang.org/nomicon/ffi.html)
* [Linking to C library with Rust FFI](https://github.com/esp-rs/esp-hal/discussions/481)

## Crates and Dependencies

### Displaying a dependency tree

```console
cargo tree
```

See also: [cargo-tree(1)](https://doc.rust-lang.org/cargo/commands/cargo-tree.html)

### Adding a dependency

```console
cargo add esp_idf_hal
```

See also: [cargo-add(1)](https://doc.rust-lang.org/cargo/commands/cargo-add.html)

### Specifying versions

```toml
[dependencies]
regex = ">= 1.2.0"
```

```toml
[dependencies]
regex = ">= 1.2.0, < 1.3.0"
```

```toml
[dependencies]
regex = "~1.2.3"
```

See also: [Specifying Dependencies](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html)

### Using a crate from a `git` repository

```toml
[dependencies]
regex = { git = "https://github.com/rust-lang/regex.git", tag = "1.10.3" }
```

See also: [Specifying Dependencies](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html)

### Reading documentation of a crate

Reading the documentation of `esp-println` in a browser.

```console
cargo doc -p esp-println --target xtensa-esp32-espidf --open
```

Note that you might need to define `CRATE_CC_NO_DEFAULTS` (see Known Issues).

### Building examples of a crate

Check out the crate:

```console
git clone ${GIT_URL}
cd ${CRATE_DIR}
```

Build all examples for the default target.

```console
cargo build --examples
```

Build an example for the default target.

```console
cargo build --example=i2c_ssd1306
```

Build all the examples for a different target

```console
cargo build --examples --target=xtensa-esp32-espidf
```

### Crates for devices (device drivers)

See
[esp-rs/esp-hal-community](https://github.com/esp-rs/esp-hal-community) (not
so many as of this writing) and [crates.io](https://crates.io/search?q=esp).

## Known Issues

### riscv32-esp-elf-gcc: error: unrecognized command-line option

```console
  Using activated esp-idf v5.2.2 environment at '/home/trombik/github/trombik/esp-idf'
  CMake Error at /usr/local/share/cmake/Modules/CMakeTestCCompiler.cmake:67 (message):
    The C compiler

      "/usr/local/riscv32-esp-elf-idf53/bin/riscv32-esp-elf-gcc"

    is not able to compile a simple test program.

    It fails with the following output:

      Change Dir: '/usr/home/trombik/github/trombik/rust-lesson/esp-idf-hal/target/riscv32imc-esp-espidf/debug/build/esp-idf-sys-38033159c7cd8eee/out/build/CMakeFiles/CMakeScratch/TryCompile-QQrZad'

      Run Build Command(s): /usr/local/bin/ninja -v cmTC_e4aec
      [1/2] /usr/local/riscv32-esp-elf-idf53/bin/riscv32-esp-elf-gcc   -march=rv32imc_zicsr_zifencei  -ffunction-sections -fdata-sections --target=riscv32imc_zicsr_zifencei-esp-espidf -o CMakeFiles/cmTC_e4aec.dir/testCCompiler.c.obj -c /usr/home/trombik/github/trombik/rust-lesson/esp-idf-hal/target/riscv32imc-esp-espidf/debug/build/esp-idf-sys-38033159c7cd8eee/out/build/CMakeFiles/CMakeScratch/TryCompile-QQrZad/testCCompiler.c
      FAILED: CMakeFiles/cmTC_e4aec.dir/testCCompiler.c.obj
      /usr/local/riscv32-esp-elf-idf53/bin/riscv32-esp-elf-gcc   -march=rv32imc_zicsr_zifencei  -ffunction-sections -fdata-sections --target=riscv32imc_zicsr_zifencei-esp-espidf -o CMakeFiles/cmTC_e4aec.dir/testCCompiler.c.obj -c /usr/home/trombik/github/trombik/rust-lesson/esp-idf-hal/target/riscv32imc-esp-espidf/debug/build/esp-idf-sys-38033159c7cd8eee/out/build/CMakeFiles/CMakeScratch/TryCompile-QQrZad/testCCompiler.c
      riscv32-esp-elf-gcc: error: unrecognized command-line option '--target=riscv32imc_zicsr_zifencei-esp-espidf'
      ninja: build stopped: subcommand failed.
```

See [esp-idf-sys build started fail on arm mac os #287](https://github.com/esp-rs/esp-idf-sys/issues/287).

A workaround: Use `CRATE_CC_NO_DEFAULTS` environment variable.

```console
CRATE_CC_NO_DEFAULTS=1 cargo build
```
