---
title: Makers Guesthouse Customer Portal
keywords: ""
tags: [getting_started]
sidebar: home_sidebar
permalink: index.html
toc: false

hotel_menu:
  - icon: fa-file-text-o
    title: Hotel policy
    summary: <p>Please have a look at our hotel policy, including checkout time, opening hours, etc</p>
    href: hotel/policy/
  - title: Services
    icon: fa-cutlery
    summary: <p>Available our services during your stay, food, drinks, common spaces, utilities.</p>
    href: hotel/services/
  - icon: fa-car
    title: Getting around
    summary: <p>Access to Angkor Wat, temples, night spots, restaurants, markets, and more!</p>
    href: hotel/getting-around/
  - title: Tours
    icon: fa-camera-retro
    summary: <p>Our local tuk-tuk tours! Not only Angkor Wat, but water reservoirs, local markets.</p>
    href: hotel/tours/
  - title: Understanding
    icon: fa-database
    summary: <p>The history, facts, and culture of Cambodia</p>
    href: hotel/understanding/

makers_menu:
  - title: Policy
    icon: fa-file-text-o
    summary: <p>Please have a look at our policy at makerspace, including opening hours, dos and donts, and qualifications</p>
    href: makerspace/policy/
  - title: Safety
    icon: fa-warning
    summary: <p>Safety is a critical part of <em>building</em> things. Some tools are dangerous, and others are lethal.</p>
    href: makerspace/safety/
  - title: Tools and Equipment
    icon: fa-microchip
    summary: <p>List of available tools and equipment at Makers.</p> <p></p> <p></p> <p></p>
    href: makerspace/tools/
  - title: Courses
    icon: fa-book
    summary: <p>You can learn something new everyday!</p>
    href: makerspace/courses/
  - title: Supplies and Parts
    icon: fa-shopping-cart
    summary: <p>We sell parts and supplies. Here is stocked parts and supplies.</p>
    href: makerspace/supplies/

---

{% include note.html
    content = 'Need to contact staffs? Please call: <a href="tel:+855-96-575-6592">+855 (0)96 575 6592</a>'
%}

{% include local/kb_menu.html
    title = '<i class="fa fa-hotel"></i> For hotel guests'
    items = page.hotel_menu
%}

{% include local/kb_menu.html
    title = '<i class="fa fa-gavel"></i> For maker space guests'
    items = page.makers_menu
%}
