---
title: Voltage Divider
course: electronics_basic
layout: lesson
tagline: Voltages and resistors in series
mathjax: true

---

In this lesson, you will create a smaller voltage from a bigger voltage with series resistors.

## Resistors in series

<img src="../series-resistors.svg" class="mx-auto w-50 img-fluid d-block" alt="Voltage Divider">

When two resistors, R1 and R2, are connected in series, the total resistance is:

$$ Rtotal = R_{1} + R_{2} $$

For example, when $ R_{1} $ is 1 ohm, and $ R_{2} $ is 2 ohm, then $ Rtotal $ is:

$$ Rtotal = R_{1} + R_{2} = 1 ohm + 2 ohm = 3 ohm $$

When you have $ n $ resistors, simply add all the values:

$$ Rtotal = R_{1} + R_{2} + R_{3} + ... + R_{n} $$

## Current and series resistors

When a voltage is applied to series resistors, the current that flows the
resistors is same. This is true even when values of resistors are different,
or the number of resistors increases.

$$ Itotal = I_{1} = I_{2} $$

$$ Itotal = I_{1} = I_{2} = I_{3} = ... = I_{n} $$

## Voltages in series resistors

When $ R_{1} $ is 10 ohm and $ R_{2} $ is 20 ohm, and 3.3 V is applied to the
series resistors, the current is:

$$ I = { V \over Rtotal } = { V \over { R_{1} + R_{2} } } = { 3.3 \over { 10 +
20 } } = 0.11 (A) $$

110 mA, $ I_{1} $, is flowing through each resistor. $ R_{1} $ is 10 ohm. The voltage
across $ R_{1} $, $ V_{1}, $ is:

$$ V_{1} = I_{1} R_{1} = 0.11 \times 10 = 1.1 (V) $$

110 mA, $ I_{2} $, is flowing through each resistor. $ R_{2} $ is 20 ohm. The voltage
across $ R_{2} $, $ V_{2}, $ is:

$$ V_{2} = I_{2} R_{2} = 0.11 \times 20 = 2.2 (V) $$

The total of voltage drops is:

$$ V_{1} + V_{2} = 1.1 + 2.2 = 3.3 (V) $$

## Other lessons
