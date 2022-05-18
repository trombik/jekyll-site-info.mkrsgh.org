---
title: "Review: fab-manager"
tags:
  - review

---

Recently, I found a hidden gem; fab-manager. I was looking for a solution to
manage machine reservations for customers. Possible alternatives are: writing
a custom Google Forms application, using other generic resource management
system, or &mdash; drum roll &mdash; _Excel_. I do not like any of them, and
accidentally found fab-manager. It looked great, and it actually is. If you
are a makerspace with unique subscription models, or need tight integration
with other systems, you might better wait for a while. But if you are flexible,
fab-manager is a great candidate.

Here is my review &mdash; or my feature requests. I hope my review does not
sound like rants.

## About fab-manager

It is a rails application for makerspaces. You can manage users, machines,
reservations, subscriptions, and training classes.
[The official website](https://www.fab-manager.com/quotation-workshop)
explains better than my poor English does. As they have a live demo, give it a
try. If you are running a makerspace, you will quickly understand what it does
and why you need it.

## The documentation is sparse

This is the first issue I encountered.

The official user guide is
[a PDF file](https://github.com/sleede/fab-manager/tree/master/doc/fr),
written in French. If you don't speak French, you have to cross your fingers
and hope Google Translate does a good job. The PDF is not generated from code
or files in the repository. That means it is possible that the file is
out-of-date. I don't understand French, but noticed some screen captures in
the file are not the latest.

Managing items like machines, users and other _simple_ settings is not very
difficult. They are very similar to ones in other systems. However, settings
related to business logics, such as payment, subscriptions, and pricing, are
very complicated and, quite possibly, they might cause serious troubles if you
don't understand correctly.

Each management UI has _feature tour_, which navigates you to each UI component
and tabs in the page. It is helpful for beginners to learn general ideas.

The most difficult part was pricing and subscriptions. The system assumes a
business logic, probably a common sales strategy. I cannot find what their
assumption is. After a few hours of trial-and-error, I, kind of, was able to
guess how they implemented pricing, subscriptions, groups, and tags. If you
have a different strategy, it is not possible in the current system.

Created subscriptions are shown to users, but it is not clear that what users
will get from the subscription. Usually, a subscription offers cheaper rate
for reserving machines, and free trainings, but the system shows just
subscription name, and expiration date. You can add a text to a subscription,
but it is a fixed explanation, meaning, it will not reflect changes when you
change the subscription settings. It is possible to attach a file to a
subscription, but, of course, the file will not reflect changes.

It would be nice to have English documentation.

It would be nice if each form fields has a clickable tool-chip help button so
that help texts have more details and explanations, and do not overwhelm UI.

It would be nice to have a knowledge base article to explain how to implement
a sales strategy.

It would be nice to have the official knowledge base so that users can jump
to a knowledge base article of the current UI.

It would be nice to show subscription details with rates, the amount of
discount, and other benefits. A comparison table would be nice, too.

## OAuth2 support

At the moment, OAuth2 authentication support is limited. It is all or nothing.
The default authentication uses the database. If you enable OAuth2, you cannot
use the default authentication in addition to OAuth2. It was a surprise that,
when I tested OAuth2, my administration account, the one created during the
initial installation, was disabled, and I could not manage the system because
the account was in the disabled database. You can configure OAuth2  from the
web UI, but CLI access is required to actually switch. You are out of luck if
you want to support multiple OAuth2 providers.

It would nice to have an wizard to setup OAuth2 for common OAuth2 providers,
such as GitHub and Google.

It would be nice to support multiple OAuth2 providers.

## Registration process asks too much private information

The sign-up form asks 11 questions, including nine required fields. It asks
"Sex", "Birthday", and a cryptic checkbox, "I am an organization". Optional
fields include "Phone" and "Address". You can make them required or optional
field, but you cannot remove the fields.

The current trend in sign-up process is that, ask fewer questions. If some
fields are necessary, such as real name, ask the user to add the field after
registration is completed, saying "To use this and that, you need to register
your real name". I hope the developers to follow the trend. All I want is an
easier sign-up process, and let them explore what they can do with the system.

## Too many `Save` buttons

Almost everywhere, you have to click a _Save_ button whenever you change a
setting. If you forget to do so, and move to another management module, your
change will be lost without a warning. There is no _Save changes_.

It would be nice to have a "Save changes" to save all the changes you have
made.

It would be nice if the system ask "you have unsaved changes, do you want save
them? Otherwise, your changes will be lost".

## Slot management needs improvements

Trainings and machines are managed by _slot_. A slot is a duration of time,
such as one hour, and assigned to machines or trainings. Users choose slots of
machines or trainings they want to reserve. You need to create slots for
machines and trainings. That means users cannot reserve a specific slot if the
slot does not exist. You may create a training at 13:00, but what if it is not
convenient time for users? Users cannot ask a reservation at different time
or date. For that, you need to create all the possible slots for each machine
or training. Creating slots is not a great user experience, requiring many
clicks.

You can create recurring slots, slots assigned to dates at specific interval,
say, "once in a week", or "once in a month, but no "everyday", "every
weekends", or "every Monday".

You can create tags. Tags are, probably (I can only guess), designed for a
proof of clearance. Tags are assigned to users and machines (actually slots of
machines) so that you can require users to achieve a tag before using a
machine. Say, "you need to take a safety training before reserving and using
3D printer", which is a very common criteria. The tags tab in "Users
Management" does not explain anything. When a user does not have a required
tag to reserve a machine, the slots in the calender are simply hidden. There is
no way to know why 3D printer is not shown, what requirements users should
have, and how to achieve the requirements.

Hopefully, slot management will improve in the future as it is one of the
planned features.

## Single language in i18n

The system supports i18n, but you can choose only one language. Users cannot
choose their languages.

It would be nice if the system supports multiple languages at the same time.
Of course, you would have to manage all your own texts in multiple languages.
That would be a lot of efforts, but with default fallback language, it would
be possible.

## Development

Even as a amateur programmer, I am scary when I see a huge commit with a line
of commit log without tests. Thousand lines of code need detailed commit log,
and tests. In the repository, I could not find automated tests other than a
vulnerability scanning.

## Final words

As an administrator, I hope the user experiences will improve. I can only
imagine how hard to improve the system, and how complicated the business
logics in the system are. Time will tell.

Current limitations, or _features_, probably come from their marketing
strategy. It seems like the majority of their customers are a makerspace at a
university. They probably don't need registration, or paid subscriptions. They
need Active Directory support than OAuth2. Just my guess.

If you are thinking about hosting the system on premises, think carefully.
The development is active, and they do not support skipping releases. You have
to follow every release and update your installation. Is that worth the effort?
I deployed my instance on AWS because I had been a system administrator for a
long time, I know how to make it easier, and I need my local patches to the
code. If you are new to Unix, or don't know system administration, you should
choose one of the cloud offerings. The cost of AWS EC2 instance is not very
cheaper than their price. If you are still interested in self-hosting,
my ansible fole,
[trombik.fab_manager](https://github.com/trombik/ansible-role-fab_manager),
may help. My deployment project is also available at
[trombik/ansible-project-fab](https://github.com/trombik/ansible-project-fab).

Fab-manager is a great system for makerspaces. I do appreciate their decision
to make it open-source for a very niche market. The system implements common
business requirements, such as machine reservation, training course, pricing,
and subscription. I researched on alternatives before finding fab-manager, but
none is practical. I don't want to manage reservations in Excel sheets.
Without doubt, fab-manager is the way to go.
