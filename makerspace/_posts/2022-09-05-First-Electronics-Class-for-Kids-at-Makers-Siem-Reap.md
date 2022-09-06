---
title: First electronics class for kids at Makers Siem Reap
header:
  overlay_image: /assets/img/posts/kids-soldering.jpg
  show_overlay_excerpt: false
  caption: "A shot of the electronics class"
  overlay_filter: 0.4
tags:
  - stem

---

The last Sunday was the longest day in my life in Cambodia: the first day of
my class for kids at Makers Siem Reap. Here is the summary.

{% responsive_image
    path: "assets/img/posts/the-led-candle.jpg"
    alt: "top and bottom view of the LED candle"
    caption: "The LED candle"
%}

The project the students worked on was an LED candle with ATtiny13a, a project
I designed a few weeks ago. The project is simple to design, yet challenging
to implement. Two subjects in the class; understanding different noises and
soldering. The latter is the most difficult part.

## Pink noise, or 1/f noise

Pink noise, or 1/f noise, is a noise human being feel comfortable with. Pink
noise can be found everywhere. Sound of river, speed of breeze, and activities
of neurons, all of them have pink noise. Unlike a pure random noise, or white
noise, it has a specific tendency in its frequencies. It is used in many
products and services; modern electric fans have a button to change rhythm of
wind speed, music broadcasting services often provides "natural sounds" to
which users listen before sleeping. LED candles in the market realistically
**flick** the fire in one way or another. My LED candle has a simple pseudo
pink noise generator to flick the fire, using simple math operations. Students
saw the difference between white and pink noise, and how they look.

## Soldering

I have been soldering for decades, yet, I am not very good at it. Some might
say soldering is too difficult for kids. I would say "it is difficult for
anyone". The circuit board used was a paper universal board, which is cheap,
and easy to cut. The following video, which is edited very well, explains
basic techniques and common mistakes.

{% youtube "https://www.youtube.com/watch?v=6rmErwU5E-k" %}

The components are: an LED, two 3D objects (fire and candle),
a resistor, a sliding switch, a paired wire, and a coin-cell battery holder.
The circuit is super simple; nothing more than
[the Blink](https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink)
circuit. However, it turned out that routing signal lines on the board was the
most difficult part.  I will design a proper PCB with printed copper traces so
that students need to solder just components. Students learnt soldering
techniques, such as the basics and pre-soldering. As a safety measure, which
has the lowest priority in this country, they had to wear protective goggles
during the work. Luckily, nobody got burns. From now on, they can proudly say
"I did it before!".

{% responsive_image
    path: "assets/img/posts/kids-soldering.jpg"
    alt: "Kids are soldering in the class for the first time in their life"
    caption: "Soldering for the first time in their life"
%}

In a conversation with a mother, there seems to be a real demand for modern
educational programs. There are international schools for expats (naturally,
they have better programs and environments than local ones), yet no STEM
program exists. It was my guess, but a conviction now.

After longer-than-planned hours, they finished their work. The final ritual of
making a circuit: powering the circuit. It's always a mix of a hope and an
anxiety. You made a lot of efforts to do everything right, yet are unsure that
the efforts were enough. When not enough, you usually see "magic smoke", the
smoke as a result of short circuits. Or, nothing at all. Luckily, they shouted
"it worked!". The words all engineers love to hear. The LED candles were
happily flickering.

## The lesson learnt

I will make a printed PCB with component marking silk on it, instead of a
universal board, so that students can focus on soldering components. With that
improvements, the class will be shorter.

I will give more information to possible students and parents, Some were not
able to join the class due to limited resources. Definitely, I need extra
activities which requires less supervision so that others can enjoy them while
I am teaching and monitoring the class for possible accidents. I already have
some ideas, but I was too focused on my first class for kids yesterday. Here,
I would like to apologize them for not meeting their expectations.

## The LED candle project

![the schematic of the LED candle](https://raw.githubusercontent.com/trombik/kicad-led-candle/main/kicad/led-candle.svg)

The project is published on GitHub, including the schematic, and the 3D
objects, which can be found at:
[trombik/kicad-led-candle](https://github.com/trombik/kicad-led-candle).
The code,
[main.c](https://github.com/trombik/kicad-led-candle/blob/main/src/main.c),
is written in Arduino, but there are very few Arduino functions (`pinMode()`
and `digitalWrite()`). They are easy to replace with pure C counterparts. It
is possible to replace the logic of noise generation, from pink to white noise,
using a C preprocessor variable to see the difference.

## Final words

The class was hit-and-miss. I did well in some areas, but not in others. The
class will be better. If you are interested, let us know. You can contact me
on Telegram (the user name is [@mkrsgh](https://t.me/mkrsgh)) in advance. A
kid must be attended with a parent or a guardian. We are open for public any
time. I will explain what kids and parents can do at Makers when you stop by.
On weekends, from 10:00 to 14:00, there will be various activities for kids
(and parents!).  We are just next door to
[Babel Guesthouse](https://www.babelsiemreap.com/),
near the National 6 and Wat Bor road.  If kids have specific subjects to learn,
I love to hear.  I promise your kids will have a unique experience.

  <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=103.86054039001466%2C13.357663974686954%2C103.86401116847993%2C13.361995949512423&amp;layer=mapnik&amp;marker=13.359829971822904%2C103.8622784614563" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=13.35983&amp;mlon=103.86228#map=18/13.35983/103.86228&amp;layers=N">View Larger Map</a></small>
