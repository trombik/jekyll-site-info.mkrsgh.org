---
title: Courses

---

We provide courses for beginner members. All courses include necessary
texts, materials and parts. Participants will receive [badges](../badges) after
accomplishing each course. The language used in courses is strictly English.

## Available courses

{% assign courses = site.data.courses %}

{% for course in courses %}
{% assign path = "makerspace/courses/" | append: course[0] | append: "/index.md" %}
{% assign course_page = site.pages | where: "path", path | first %}

### {{ course_page.title }}

{% if course.tagline %}
_{{ course_page.tagline }}:_
{% endif %}

{{ course_page.content | strip_html | truncatewords: 30 }}

{% assign more_label = site.data.ui-text[site.active_lang].more_label %}
{% include local/linked_button.html
    class = "text-right"
    url = course_page.url
    text = more_label
%}
{% endfor %}

## Admission

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
