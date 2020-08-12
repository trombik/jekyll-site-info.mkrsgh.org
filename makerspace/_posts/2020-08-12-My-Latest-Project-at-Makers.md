---
title: My latest project at Makers
lang: en
tags:
  - project
---

While working on my introduction talk about the makerspace and what you can do
at a makerspace, I also have been working on my own project. I will explain
the project in a series of posts. In the first post of the series, I would
like to explain what the project is trying to solve, and challenges I faced.

At Makers, I would like to make sure everyone enjoys stable, and reliable
networking because creative works need faster and reliable networking. It is
so frustrating when you are working on a serious project and the network
cannot provide enough performance. After Covid-19, people have found that
their 10Mbps ADSL subscription is not adequate for live streaming or video
conference in a hard way. As I had been working from remote more than a decade
as an IT engineer, I can tell you how networks suck in various places,
including five star hotels and budget guesthouses.  Networking is often
neglected at hotels, guesthouses, cafes, and even some co-working spaces. Many
think that expensive Internet subscription means faster networking at your
place. It might be true at your home where you only need to cover a few
computers and mobile devices in a room or two, but not true when you have
dozens or hundreds. Have a look at online booking site. Many customers
complain because "WiFi is slow".

## The problems

As an owner, I would like guests to enjoy fast and reliable networking
wherever they are at Makers. I would like to ensure my network is stable by
monitoring its performance so that I can identify and fix problems when they
don't.

## The requirements

Now I have identified the problems to solve. Let's create requirements.

My solution should:

* Monitor the network performance and visualize the performance
* Notify me when a device fails

Sounds simple, doesn't it? The devil is in the details.

## The challenges

My budget is limited, and the solution must be affordable.  When I was an
administrator of organisations, I never used consumer products for networks.
Your cheap WiFi router cannot handle a large number of devices and users.
Enterprise products are far more capable and designed for easier
administration. Sadly, I do not have that option now. That means I cannot buy
hardware solutions for hotels. I cannot buy advanced monitoring systems.

As a network admin, I would like to reduce the cost of maintenance to manage
the network. I am a sole administrator and responsible for everything, not
only networking.  When you have a few devices, it is not very difficult to
manage them. Modern households probably have laptops, tablets, smartphones,
and possibly some devices for entertainments, such as smart TVs. Some devices
show up as they are connected to network, but others are not. When they don't,
you have to type IP address, an address of a device in network. Even if you
are a gadget lover, the number of devices would be 10 or so, and you might be
able to remember these addresses. I have six laptops, four desktops, six small
servers, three routers, eight WiFi access points, two smartphones, and five
Google Home devices at Makers (and many more in the future). I cannot remember
all the IP addresses.  The standard solution for this problem is called DNS, a
network system that translates human-readable name to IP address.  When you
browse websites, you type a friendly name, such as `facebook.com`, instead of
cryptic `192.168.1.1` thanks to DNS.

I don't want to manually configure IP address on each device. When you join to
a network, your device will be given an IP address automatically. Your WiFi
router does that for you.  The system to assign IP address to network devices
is called DHCP. All consumer WiFi routers have a DHCP server. However, the
DHCP server might give different address to your device. To ease network
administration, you need fixed IP address and corresponding name for it while
automatically assign the address to the device. An address in DHCP and DNS
must match. That means you need to sync addresses in both systems; register
the device and its address to DHCP, and register the address and its DNS name
in DNS when you add a new device.

My solution will consist of several systems and they work each other. The
systems are far more complicated than average network at home. The systems
will have many moving parts and every single part can fail. I would like to
test the systems before deploying changes to production environment by
performing tests. The test environment should be isolated from the production
system, and as identical as possible to the production system.

## The extra requirements

With these challenges, I have extra requirements.

The solution should:

* Be affordable
* Assign fixed IP address to all servers and sensors
* Register DNS name of assigned IP address
* Be able to register IP addresses and DNS names in one place
* Be tested before deployment, and tests should be reproducible

## The solutions

For monitoring, I designed a small network sensor on a cheap microcontroller
with WiFi, called [ESP8266](https://en.wikipedia.org/wiki/ESP8266)
(Wikipedia). ESP8266 costs USD 3 or less. The sensor monitors WiFi signal
strength, and actual network performance by measuring latency and packet loss
rate. The result are forwarded to a database, and the collected data
can be viewed as beautiful graphs. The sensor automatically shows up in the
visualization without manual configuration.

For visualization, I chose [`grafana`](https://grafana.com/), a software that
visualize various numeric values in time series. The data is stored in
[`influxdb`](https://grafana.com/). With these, I can view trends of network
performance in different time range, such as past 12 hours, one month, or even
an year. As a bonus, I can use this system to monitor other things, such as
temperature, water level, or moisture level in soil.

DNS and DHCP servers run on a micro computer. When adding new device, I only
need to register MAC address (unique physical address of a device), IP
address, and the name of the IP address in one place. DHCP server lookup
MAC address when a client requests IP address, and assign the registered IP
address. I do not need to remember the address because the address can be
looked up in DNS. As the record of MAC address, IP address, and DNS name is in
one place, the address and DNS name always match.

For monitoring, I chose [`sensu-go`](https://sensu.io/), a subscription-based
monitoring system.  Unlike traditional monitoring software, it does not
require you to register monitored hosts. You just need to define
subscriptions, which tell the subscribers to monitor what. In traditional
monitoring software, you need to add monitored hosts whenever you add one. It
is tedious when you have a dozen of nearly identical hosts. Instead, you
install an agent on monitored hosts, and the agent subscribes to defined
subscriptions. That way, the agent will monitor local resources without manual
configuration.

All the systems are running on small servers. They cost USD 20-30. One of my
favorite is [Orange Pi Lite
2](http://www.orangepi.org/Orange%20Pi%20Lite%202/). They are small, but yet
powerful enough to run simple applications. As a bonus, you can connect many
of them to UPS because power consumption is a few Watt.  That means the
systems will continue to work during a blackout, which is not unusual in the
town. Blackout is when you need a monitoring system. My network devices are
connected to a UPS, and I would like to know if they are working as usual when
the main power is off.

I will follow up the systems in subsequent posts in details. I am hoping that
the posts will explain what System Administrators actually do, too. A product
manager, whose responsibility is to manage product developments in a company I
used to work, once said that he did not understand what I was doing everyday
in the office. Although _his products_ were running on the system I managed,
he never understand how the systems work, why the systems are up and running
everyday.  I was just a _tech guy_ who did something complicated. It might be
an innocent comment for him, but I will never forget the comment.

I am trying to sound geeky not too much (yes, I am, really) so that average
person can understand what kind of problems I was trying to solve, what
challenges I faced, and how I solved the problems. Stay tuned.
