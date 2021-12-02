---
title: Current Divider
course: electronics_basic
layout: lesson
tagline: Voltages and resistors in parallel
mathjax: true

---

In this lesson, you will create a smaller current from a bigger current with
parallel resistors.

## Resistors in parallel

<img src="../parallel-resistors.svg" class="mx-auto w-50 img-fluid d-block" alt="Current Divider">

## Voltage and parallel resistors

When two resistors, R1 and R2, are connected in parallel, the voltages across
the resistors are identical.

$$ V = V_{1} = V_{2} $$

## Current and parallel resistors

Each current thorough a resistor is:

$$ I_{1} = { V_{1} \over R_{1} } = { V \over R_{1} } $$

$$ I_{2} = { V_{2} \over R_{2} } = { V \over R_{2} } $$

For example, when $ V = 10 V $, $ R_{1} = 10 ohm $, and $ R_{2} = 20 ohm $,

$$ I_{1} = { V \over R_{1} } = { 10 V \over 10 ohm } = 1 (A) $$

$$ I_{2} = { V \over R_{2} } = { 10 V \over 20 ohm } = 0.5 (A) $$

When $ R_{1} = R_{2} $, the same amount of current flows.

$$ I_{1} = { V_{1} \over R_{1} } = { V \over R_{1} } $$

$$ I_{2} = { V_{2} \over R_{2} } = { V \over R_{1} } $$

$$ I_{1} = I_{2} $$

The total current is:

$$ I_{total} = I_{1} + I_{2} = { V \over R_{1} } + { V \over R_{2} } $$

$$ I_{total} = I_{1} + I_{2} = 1 A + 0.5 A = 1.5 (A) $$

## Resistance and parallel resistors

The total resistance is:

$$ R_{total} = { V \over I } = { V \over I_{total} } = { V \over { { V \over R_{1} } + { V \over R_{2} } } } $$

$$ { R_{total} } = { 1 \over { 1 \over R_{1} } + { 1 \over R_{2} } } $$

$$ { R_{total} } = { V \over I_{total} } = { 1 \over { 1 \over 10 ohm } + { 1 \over 20 ohm } } = { 10 \over 1.5 } \approx 6.666 (ohm) $$

## Quick formulas

With $ N $ resistors:

$$ { R_{total} } = { 1 \over { 1 \over R_{1} } + { 1 \over R_{2} } + \dots + { 1 \over R_{N} } } $$

With two resistors:

$$ R_{total} = { 1 \over { 1 \over R_{1} } + { 1 \over R_{2} } } = { { R_{1} \times R_{2} } \over { R_{1} + R_{2} } } $$

## Other lessons
