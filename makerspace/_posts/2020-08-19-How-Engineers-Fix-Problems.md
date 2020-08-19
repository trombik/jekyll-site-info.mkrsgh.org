---
title: How engineers fix problems
header:
  overlay_image: /assets/img/posts/resized/Alley_Being_Renovated-800x450.jpg
  overlay_filter: 0.4
  show_overlay_excerpt: false
tags:
  - micronews

---

As [I wrote
before](/blog/makerspace/2020/07/02/Pave-the-Way-to-a-Better-Future/), the
small alley in front of the property will be paved soon. Everyone in the alley
needs to give up some part of their lands. That also means major constructions
of walls, gates, gardens, and swimming pools.  All the owners are renovating.
[Babel Guesthouse](https://www.babelsiemreap.com/) is not an exception.  They
had a nice garden, but it's gone. They are working on new garden. As the
network devices and cables were installed at a counter in the garden, someone
decided to cut every cable to clear the place without consideration of the
outcome, i.e. Babel Guesthouse lost Internet access. I reconstructed the
network so that kids can watch online video over WiFi. After a few weeks, the
network stopped working. Here is a story of how engineers fix problems. The
story tells you how we think, what we do, and what we need to master when
fixing problems.

{% responsive_image
    path: "assets/img/posts/Alley_Being_Renovated.jpg"
    alt: "The alley is being renovated"
    caption: "The alley has been quite busy as owners renovate walls, gates, and gardens. Wat Bo, Siem Reap. &copy; Tomoyuki Sakurai"
%}

## The network

The network was used to consist of two subnets; one for guests, and another
for office network. A router forwarded packets between the subnets, and
perform network address translation, or NAT, for outgoing packets to the
Internet. Each subnet had WiFi access points.

While the renovation is in progress, someone cut the fibre, which provided
upstream link to the Internet. As they accept no guest during the renovation,
they do not need the office network to which devices for business operations,
such as PoS, were connected.

The requirements were:

- The users have access to the Internet over WiFi
- The office network can be omitted

There was no network diagram. The passwords provided by the vendor that
designed and installed the network didn't work, which add extra requirements:

- the existing network cannot be modified

My solutions were:

- Install a CAT6 cable from my property for the Internet
- Create the same subnet in my network
- Configure the interface for the subnet on my router
- Provide DHCP, DNS, and NAT for the subnet
- Connect every WiFi access point to a network hub

Simply put, the network is a simple L2 network. It was not super easy because
all the cables were tagged with a small piece of paper, and the texts on the
tags were blurred  after a decade. Anyway, I managed to recreate new network.
The network had been working since then.

## Initial problem report

One morning, Katrine, the owner of the guesthouse, reported that the network
was not working.

Here is what she reported:

- They are unable to access the Internet at the top floor
- At the ground floor, everything works
- Devices can connect to WiFi, but no access to the Internet

My first thought was: my network is working fine. The problem should be in
their network. My network has many devices including sensors, IoT devices,
laptops, servers, and home appliances.  Google Home speakers play music all
the time. One of my systems in the network includes a monitoring system. When
my network has issues, I will be notified. I will notice problems faster than
anyone else.

As the network is a simple L2 network, L3 problems were ruled out.  It must be
specific problems to a WiFi access point, or a link to it, because other
clients in the same network had no issues. To prove it, I captured traffics
on my router, and saw normal traffic from other clients.

The WiFi access point must be working because devices were able to see the AP, and
associate with the AP. This strongly suggests that the problem is at layer 2,
or physical layer.

## The investigation

As there was no network diagram, I needed to identify the physical cable to
the WiFi access point, which was surprisingly difficult. I had to climb a wall
to reach where I could visually verify where each cable goes to.

Then, I needed to see if the WiFi access point had established link to the
network. WiFi access point usually has two interfaces; one for WiFi interface
for WiFi clients, and another for the upstream network, usually via physical
Ethernet cable. If WiFi access point is working but the physical interface
cannot establish link, WiFi devices usually notifies users that "the network
has no internet access", which was what the users were seeing. It turned out
that the WiFi access point had established the link. This suggested that the
WiFi access point had no issue. The problem must be somewhere between my
router and the WiFi access point, including cables, and network hubs.

Once the cable was identified, I connected the cable to my laptop so that I
can capture and see all the traffic. When a device is associated with WiFi
access point, the device requests IP address and other information, called DHCP
request.  Luckily, they have a Chromecast in a room, which periodically sent
DHCP request, trying to connect to the network. The request was correctly
shown in my console. Packets were forwarded from the AP to other end of the
cable. Where the packets goes? My router must be able to see it to send a
reply to the request.

Another packet capture on my router revealed that the router indeed received
the request, and sent a reply packet to the client. When a device receives
DHCP reply, called DHCP ACK, it then reconfigures network setting, and starts
sending and receiving packets. It appeared that devices under the AP never
received DHCP ACK. Where does the reply go? It is relatively easy to find if
you have right equipment. Expensive network devices (USD 1000 - 2000 price
range) come with _port mirroring_, which duplicates every single packet to
another port so that one can see all the packets. You can also buy a special
hardware device (a few hundred USD), which does the same thing, but you can
install it anywhere in network. Several times in the past, I used it in large
networks for monitoring. I had neither this time.

I was stacked. Every component in the network was suspicious because they were
installed in a harsh environment. The cables was installed with little
protection from sun light, heat and physical damage. All the devices,
including power supplies, had been in outdoor nearly a decade.

Eventually, I could reproduce the problem. I tried to request IP address using
my laptop through the network hub. My laptop cannot see the reply from my
router although the packet was sent from the router. That means two things:
the physical cable from the WiFi access point to the network hub has no
problem, and the reply disappeared somewhere between my router and the network
hub. The physical cable between them is new, and unlikely to cause problems.
The only suspect was the network hub. I replaced the network hub with my
spare.  Voila, it worked. My laptop got the reply and it configured network
setting.  With my smartphone, I went up to the floor where the WiFi access
point was installed. It worked. Further investigation revealed that the
network hub worked fine a minute or so after powered on. Then, it failed to
forward broadcast packets (packets that everyone on the same network can see
and DHCP uses as transport) _in one direction_. Surprisingly, it kept
forwarding unicast packets, which have specific destination and source
address. This is a rather rare failure mode. It might be possible to identify
the problem in the circuit if I tear up the network hub, but it did not look
worth doing so when the device costs around USD 10. It took eight hours in
total to identify the problem because: I did not have a network diagram and
physical layouts, the location of the network devices was far from the WiFi
access point (ground floor and 4th floor), and I was less equipped for this
kind of problems.  Anyway, it made a can of beer so great after the successful
investigation.

I guess the story sounds Greek to end users, but the troubleshooting process
applies to any problem. Verify everything, prove rather than assuming,
understand how things work (networking, DHCP, WiFi, etc), isolate one factor
from the problem at a time, and narrow down possible causes of the problem.
When you work on projects to create something cool, you need to master this
skill ([you can learn the skill at Makers!](/makerspace/)).

## A surprise

When I was drinking beer to celebrate my success, Katrine sent a surprise to
me. She filmed their kids watching an online video in their room. In my
career, it was rare for me to receive feedback from users. Even when there
was, the feedback was usually negative. People hated me because I was in a
position to _enforce_ rules in the name of "compliance and governance", and
they assumed everything should work all the time, 24/7/365 (and I was
"stubborn" and a "difficult" employee, I admit). I was not paid for being
appreciated, but appreciation from users gives you motivation, and gives your
job a meaning. We work for money, but money is not only the reason. As such, I
always say "thank you" to chefs in the kitchen when a food is good. In Europe
and UK, where I have been in the past, many customers say "thank you" to
cashiers, staff members, cabin crews, or employees for their service. Majority
of Japanese rarely do, especially in big cities, like Tokyo. People expect
good services anytime and anywhere. When it's bad, they get furious. Many of
you might not have seen "furious" Japanese because they never do the same in
"developed" foreign countries, or to "white" foreign tourists in Japan. We
evaluate people or services by _demerit_ point system, or how bad it is. I
cannot remember when the last time someone appreciated my work. That is why
the video Katrine sent to me was a nice surprise.

My life is far from successful, but I feel like my humanity is being
revitalized.
