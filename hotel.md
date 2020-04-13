---
title: Hotel Portal
keywords: ""
tags: [getting_started]
sidebar: hotel_sidebar
permalink: /hotel/
toc: false
hotel_menu:
  - icon: fa-file-text-o
    title: Hotel policy
    summary: <p>Please have a look at our hotel policy, including checkout time, opening hours, etc</p>
    href: /hotel/policy/
  - title: Services
    icon: fa-cutlery
    summary: <p>Available our services during your stay, food, drinks, common spaces, utilities.</p>
    href: /hotel/services/
  - icon: fa-car
    title: Getting around
    summary: <p>Access to Angkor Wat, temples, night spots, restaurants, markets, and more!</p>
    href: /hotel/getting-around/
  - title: Tours
    icon: fa-camera-retro
    summary: <p>Our local tuk-tuk tours! Not only Angkor Wat, but water reservoirs, local markets.</p>
    href: /hotel/tours/
  - title: Understanding
    icon: fa-database
    summary: <p>The history, facts, and culture of Cambodia</p>
    href: /hotel/understanding/
---

{% include note.html
    content = 'Need to contact staffs? Please call: <a href="tel:+855-96-575-6592">+855 (0)96 575 6592</a>'
%}

{% include local/kb_menu.html
    title = '<i class="fa fa-hotel"></i> For hotel guests'
    items = page.hotel_menu
%}
