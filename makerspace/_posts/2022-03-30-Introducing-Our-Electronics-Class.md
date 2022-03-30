---
lang: en
title: Introducing our electronics class
header:
  overlay_image: /assets/img/our-students-in-a-class.jpg
  overlay_filter: 0.4
  show_overlay_excerpt: false
  caption: ""
tags:
  - stem
---

It has been a while since I started my electronics basic class for local
students. I have four students, most of them knew nothing about electronics,
or programming. On every weekends, I teach them in a two-hours class.

The course started from the very basic of electronics, like voltage, current,
and resistance. They made a circuit on a breadboard, learnt how to use
multi-meters, how LEDs work, and tried soldering pins on a universal board.
It was the last week when they made their first program on a micro computer.

{% responsive_image
    path: "assets/img/our-students-in-a-class.jpg"
    alt: "Two students exploring their circuit using a multi-meter in the class"
    caption: "An essential skill in electronics: making sure that every
    component on a circuit is connected to the right place."
%}

The goal of the class is: understanding circuit basics, and programming a
simple code that accepts inputs &mdash; sensors and switches &mdash; and
control external components. In other words, becoming a maker.

Some resources I am using in the class:

* [Simple Circuits & Measurements Fundamentals](https://canvas.colorado.edu/courses/63227/pages/workshop-outline-intro-to-circuits),
  kindly provided by University of Colorado Boulder for learning electronics
  basic
* [CODE.org](https://code.org/) for teaching very basic idea of programming to
  programming beginners
* [tinkercad.com](https://www.tinkercad.com/) for Arduino programming and
  simulator
* [makecode.microbit.org](https://makecode.microbit.org/) for Micro:bit
  programming and simulator

Four, or five at most, students attend the class.  Students are expected to
bring their own computers, but I have a computer for a student. All other
materials and equipment are provided for free. Two one hour classes and a
ten-minutes break in-between.

{: .notice--info }
You can read an overview of the course at
[Electronics Basic Course](makerspace/courses/electronics_basic/) page.

While I am teaching them, I am also learning because I am not a teacher in
any way. Understanding something does not mean being able to teach it. As it
was several decades ago when I was a beginner in programming, I don't know
where they stuck in programming. In that sense, the class is my own
opportunity to learn how to teach.

## Some findings in the class

Theories &mdash; while they are important &mdash; are boring. You cannot avoid
[the Ohm's law](https://en.wikipedia.org/wiki/Ohm's_law), but it is easier for
students to learn and practice it in a real circuit when they need it.

Students love something that can show their achievements. However simple, it
is best to build something that does it.

They love using their own hands: they enjoy breadboarding and soldering more
than anything else.

You have to be very careful while they are experimenting, especially when
playing a live circuit. Battery should be used in that case to prevent
accidents and injury, not PSU or bench power source.

Use small USB power banks when a circuit needs power from USB cable,
instead of powering from a laptop. A short-circuit can kill the laptop. I use
several 1-cell 18650 power banks.

## Where to go from here

Firstly, having more students. The challenge is that it is extremely difficult
to teach even a few students. Watching for potential dangers is one thing,
taking care of students at different skill levels is another.

Secondly, another classes for students with basic knowledge to build a working
project, such as a switch with a PIR motion sensor. The class should have a
lesson to teach 3D modeling and printing objects.

Lastly, teaching networking-enabled devices, such as ESP32, including basic
networking and TCP/IP. That would be the most challenging.

Stay tuned for updates!
