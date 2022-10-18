---
title: "Open House at Makers: micro:bit"
header:
  overlay_image: "/assets/img/posts/screenshot-makecode-led-rainbow.png"
  show_overlay_excerpt: false
  caption: "Code to show rainbow"
  overlay_filter: 0.4
tags:
  - stem

---

[micro:bit](https://www.microbit.org/)
is a pocket-sized computer board designed by BBC, to encourage kids to learn
how computers work, rather than simply consuming. The fourth Open House event
at Makers Siem Reap, kids met the board and learnt programming.  Here is the
summary of the event.

## The micro:bit

{% responsive_image
    path: "assets/img/posts/microbit-on-keyboard.jpg"
    alt: "A micro:bit on a eyboard"
    caption: "A micro:bit"
%}

micro:bit is a direct successor of
[BBC Micro](https://en.wikipedia.org/wiki/BBC_Micro),
a 8-bit computer in the 1980s, designed for educational programs, with unique
interfaces to expand the ability of the computer, supporting not only BASIC
but also Pascal, C, and LISP(!).

![BBC Micro](/assets/img/posts/BBC_Micro_Front_Restored.jpg)

After decades, BBC released an open-source hardware in 2016, distributed many
free boards to schools in UK. Instead of 8-bit CPU at 2 Mhz clock, micro:bit,
it runs on 16 MHz 32-bit ARM Cortex-M0 microcontroller. Expandability is also
properly inherited; the board has many input and output pins on an edge
connector, a USB interface, and 2.4 Ghz Bluetooth. The on-board LED array and
sensors provide out-of-box experience.

The board is now popular not only in UK, but many other countries, including
EU countries, Singapore, Taiwan, and Japan. You can see
[reports](https://microbit.org/impact/foundation-reports/)
at the official web site.

## MakeCode, an online platform to code

The kids were first introduced into an online platform by Microsoft,
[MakeCode](https://makecode.microbit.org/),
in which kids write code, see the code in action on a simulator, and download
the compiled code to run it on micro:bit. The platform is also a place to find
resources, such as tutorials with video, and example projects. You can choose
a computer language from Blocks, with which you put together to write code,
Python, or JavaScript. Blocks was chosen for primary school kids.

{% responsive_image
    path: "assets/img/posts/screenshot-makecode-org.png"
    alt: "Screenshot of makecode"
    caption: "Screenshot of makecode"
%}

The interface is easy to understand and use. Some have already learnt other
block programming languages, like
[Scratch](https://scratch.mit.edu/),
which made a huge difference in catching up with a new platform. Block
programming languages have a common interface; many blocks to choose from a
panel, and a work space. They share the same goal &mdash; get them into
programming and engineering at a young age &mdash; but with micro:bit, there
is a distinct difference; real feedbacks from the code. You can see the code
in action on a real hardware, interact with the code and the hardware with
hands, and bring the code elsewhere to experiment, play a game with others, or
to show off your achievement.

## The lesson

Kids learnt the basics of MakeCode and micro:bit in several tutorials, such as
using the on-board LED display, seeing the code on the in-browser simulator,
and uploading the code to micro:bit. The workflow is simple; put blocks into
the work space, see how it works on the simulator, download the firmware in
hex, and copy-and-pate the firmware to micro:bit.

{% responsive_image
    path: "assets/img/posts/kid-show-off-her-work.jpg"
    alt: "A kid explaining what she learnt in the class to her mother"
    caption: "She is explaining what she learnt in the class to her mother."
%}

For some kids, the tutorials were bit too easy. I decided to make the class
more challenging to these kids. On Sunday, the second part involved an
external component; an addressable full colour LED ring. LED strips are
ubiquitous these days. Display stands at shops, lighting systems on passenger
aircraft, even food carts have LED strips. However, the LED ring we used in
the class is *smart*, meaning you can control not only brightness of all LEDs,
but also colour of each pixel individually, hence *addressable*.

{% responsive_image
    path: "assets/img/posts/screenshot-makecode-led-rainbow.png"
    alt: "Code to show rotating rainbow"
    caption: "Code to show rotating rainbow"
%}

Addressable LED is becoming very popular in smart device market. Some examples
of smart devices include smart speakers that understand voice commands, smart
wall switches that you can turn on or off devices physically and remotely, and
smart locks that do not require physical keys. With addressable LED, you can
change the colour of lighting system in rooms, show patterns of colours, and
control the lights from your smartphone or via voice commands. With a bit of
computer skills, you can even automate them &mdash; turn on the light when I
enter the room, change the colour to light blue at 11:00 p.m., turn off the
light when I am sleeping and such.

The LED ring is, essentially, a display in a different form. Displaying a
desired pattern on a display always requires some efforts. However, thanks to
a library for addressable LEDs, kids can show simple patterns on the LED ring
without hassle. In a few minutes, kids could display a rainbow pattern.

{% responsive_image
    path: "assets/img/posts/rotating-rainbow-and-microbit.jpg"
    alt: "micro:bit is displaying a pattern of rotating rainbow"
    caption: "micro:bit is displaying a pattern of rotating rainbow"
%}

In addition to the LED ring, they used a few other electronic components in
the experiment; a breadboard, alligator clips, an external battery, and wires.
They are building blocks in electronics.  Breadboard is a quick solution in
prototyping. Instead of building a complete circuit on a circuit board, you
can quickly experiment your idea on a breadboard. No soldering is required.
Just connect pins with wires. If you are curious why it is called "breadboard",
watch the following video.

{% youtube "https://www.youtube.com/watch?v=HrG98HJ3Z6w" %}

## Thoughts after the classes

I found that the real feedbacks from the reality was surprisingly great in
educational programs. Most of other online block programming languages run in
a browser, and the result can be seen in the browser. They are great, too, but
micro:bit gives you real feedback and interactions. You can show your work to
others. In software development, almost all your works are invisible except
for some lucky developers, like frontend engineers. This is why I like
electronics. I'll remember kid's face when they see their code in action.

Luckily, all of kids have past experience in other block programmings; they
knew not only how to put blocks together, but also what a variable is, what
can be done with conditions and flow controls, and how program works in
general. All of them made a huge difference in the class. If you master one
computer language, learning another is far easier because computer languages
share many same ideas. There are, of course, differences between languages,
but what you have learnt in another language will not be wasted. If they knew
almost nothing in programming and using a computer &mdash; like some local
students I taught before &mdash; it would have took longer. This is why BBC
developed micro:bit; "get them into programming and engineering at a young
age". Unlike when computers were "new thing" in decades ago, these skills are
now a must, and you should get started as earlier as possible, not when you
are *forced* to learn. Many teachers had to learn how to teach in online class
after COVID-19 without proper trainings or support.

I have personal experiences with people who are not familiar with modern
technologies. They don't know how to share files, collaborate with others on a
file or a document, or get things done effectively. They are mostly from older
generations, and at higher positions. They will retire soon, and young
generation should know better. Good engineers love to be "the worst guy in the
band" because it is fun to work with competent, productive team members, and
everyone in the team learns a lot from others.

## Final words

We had Open House events for kids on every weekends. In the past classes, kids learnt
how to [solder components on an electronic circuit](/blog/makerspace/2022/09/05/First-Electronics-Class-for-Kids-at-Makers-Siem-Reap/),
[built a paper craft glider](/blog/makerspace/2022/09/30/Open-House-at-Makers-Paper-Crafts/),
and [model 3D objects](/blog/makerspace/2022/10/03/Open-House-3D-Modeling/).

We post upcoming Open House events to
[Siem Reap Parenting](https://www.facebook.com/groups/SiemReapParenting/)
Facebook group and
[Twitter](https://twitter.com/makers_gh).
If you have a kid, and would like to help the kid to develop technology skills,
please join the group or follow us on Twitter.  For details and reservation,
please
[contact us on Telegram](https://t.me/mkrsgh).
