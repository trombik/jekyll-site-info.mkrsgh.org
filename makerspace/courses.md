---
title: Courses

---

We provide courses for beginner members. All courses include necessary
texts, materials and parts. Participants will receive [badges](../badges) after
accomplishing each course. The language used in courses is strictly English.

Courses are open to members and non-members. Non-members are welcome to
participate, but not allowed to use work areas, tools, and machines after the
course.

Some courses are designed for kids as a *STEM* education program.

{% include local/linked_quote.html
    title = "What is STEM Education?"
    text = "STEM is a curriculum based on the idea of educating students in four specific disciplines — science, technology, engineering and mathematics — in an interdisciplinary and applied approach. Rather than teach the four disciplines as separate and discrete subjects, STEM integrates them into a cohesive learning paradigm based on real-world applications."
    url = "https://www.livescience.com/43296-what-is-stem-education.html"
%}

## Free courses for Cambodian nationals

Courses are free for Cambodian nationals. Please contact us for availability.
We provide free courses for a group of Cambodian students, too. If you are an
educator who wants to use our courses as part of your education programs, we
are happy to help ([how?](../education)).

## Available courses

{% comment %}
  XXX you cannot create a list in liquid. an ugly hack to workaround it
{% endcomment %}
{% assign courses = '' | split: '' %}
{% for p in site.pages %}
{%   assign parent_dir = p.url | split: "/" | slice: -2, 1 %}
{%   if parent_dir contains "courses" %}
{%     assign courses = courses | push: p %}
{%   endif %}
{% endfor %}

{% for course in courses %}

### {{ course.title }}

{% if course.tagline %}
_{{ course.tagline }}_
{% endif %}

{{ course.excerpt }}

{% include local/linked_button.html
    class = "text-right"
    url = course.url
    text = "Read more ..."
%}
{% endfor %}

## Planned courses

This is a list of planned courses.

### Routing

You will learn basics of L3 routing and TCP/IP.

### WiFi

You will learn basics of WiFi networking, including basic 802.11 technologies,
site survey, and designing access point locations.

### Laser cutting and engraving

You will learn how to cut and engrave woods, papers, and stones (not yet
available).
