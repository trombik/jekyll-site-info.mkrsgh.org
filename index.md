---
title: Makers Guesthouse Customer Portal
keywords: ""
tags: [getting_started]
sidebar: mydoc_sidebar
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
    href: hotel/access/
  - title: Tours
    icon: fa-camera-retro
    summary: <p>Our local tuk-tuk tours! Not only Angkor Wat, but water reservoirs, local markets.</p>
    href: hotel/tours/
  - title: Understanding
    icon: fa-database
    summary: <p>The history, facts, and culture of Cambodia</p>
    href: hotel/knowledge/

makers_menu:
  - title: Safety
    icon: fa-warning
    summary: <p>Safety is a critical part of <em>building</em> things. Some tools are dangerous, and others are lethal.</p>
    href: makerspace/safety/
  - title: Available Tools
    icon: fa-microchip
    summary: <p>List of available tools and equipment at Makers.</p> <p></p> <p></p> <p></p>
    href: makerspace/tools/
  - title: Courses
    icon: fa-book
    summary: <p>You can learn something new everyday!</p>
    href: makerspace/courses/
  - title: Parts and Supplies
    icon: fa-shopping-cart
    summary: <p>We sell parts and supplies. Here is stocked parts and supplies.</p>
    href: makerspace/supplies/

---

{% include local/kb_menu.html
    title = '<i class="fa fa-hotel"></i> For hotel guests'
    items = page.hotel_menu
%}

{% include local/kb_menu.html
    title = '<i class="fa fa-gavel"></i> For maker space guests'
    items = page.makers_menu
%}

{% include note.html
    content = 'Need to contact staffs? Please call: +855 (0)96 575 6592'
%}
