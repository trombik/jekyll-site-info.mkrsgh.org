---
title: How I write ansible role
tags:
  - ansible

---

I maintain many `ansible` roles. Some are dated back to a decade ago. I would
like to document how I write `ansible` roles and why.  In this post, I will
describe why I write my own roles, rules I follow, and how I write roles. I
will not explain `ansible` how-to, but how I design my roles. If you are
looking for how to do something with `ansible`, look elsewhere. If you want to
know how others develop roles, read on.

## Why you need `ansible` role

{: .notice--info }
Skip this section if you know why.

The primary reason you need `ansible` roles is that, obviously, you want to
write tasks and use them everywhere. `ansible` role is re-usable. You can
re-use the role in multiple projects. You, or someone else, write a role, and
you can use it for different systems.

However, the role is another important role in system administration; it is
testable. Well, you may (and should) have test cases in your project, but the
tests are very specific to the project. Often, a project tends to have
multiple components, such as a load balancer, an application, and a database,
it is difficult to test parts of it. For example, you write tasks for
`nginx` and use it in a project to run a static web server. Later, you want a
load balancer in another project. Maybe, someone else wants to run a proxy to
a back-end application, such as FPM. You cannot test the tasks in different
projects. Tests in your project should focus on project-specific subjects,
i.e. they are integration tests, such as "when a user provides correct user
name and password, the application should allow the user to login" instead of
"package foo is installed". If you test if an application is installed in your
project, you are doing it wrong.

When you write a role, instead of tasks in an `ansible` playbook, it is
possible to run tests in different scenarios. Running a load-balancing `nginx`
requires different tasks from a simple static web server. You might need to
ensure that the system has required packages and `nginx` plugins. You can
write two test scenarios in the role, and test them.

## Why I write my own roles

There are many roles on the Internet, but few of them are useful to me.

First, most of them are written for some specific Linux distributions. Usually,
they are for Debian variants and Red Hat clones. My primary platforms are BSD
distributions. The roles assume that configuration files are under `/etc`,
`/proc` exists, `/bin/bash` is available, and so on. Hard-coded path is not
only an issue for BSD users. Sometimes, you have to use exotic packages that
reside on `/opt`, `/srv`, and maybe, `/nfs`.

Second, they have too many buttons, or role variables. They are hard to use
and maintain. Authors create a role variable for every single specific need.
An example: "Use `foo_max_memory` to set maximum memory limit, and use
`foo_min_memory` to set minimum memory" while you can just add two lines to a
configuration file. You need to _map_ configuration settings to role
variables. You read an official documentation to achieve your goal,
looking for the right configuration. And you have to make sure the role
somehow _support_ it. If it does, you need to investigate which role variable
you need to tweak. If it doesn't, you need to figure out how to _inject_ the
new configuration (some role authors even make it impossible). This is not
re-usable at all.

Third, they are too complex. The entry point of a role is `tasks/main.yml`. It
`include_tasks` another task file to install packages, and `config.yml` to
configure them, and `CentOS-configure.yml` for specific tasks, and another ... It
is hard to follow the play while you are debugging. In a task file, many tasks
rely on previous tasks, role variables and register variables.

```yaml
- name: Do something
    ansible.builtin.command: "foo"
  when:
    - previous_task['changed']
    - foo_enabled or bar is defined
    - not buz is defined
```

The more `when` clauses, the more possible code paths. That increases
complexity. You don't want to use and maintain complex roles, really.  Why
they are complex? Because the role tries to be _user-friendly_. Often,
`README.md` says: "Set `foo_postgresql` to setup PostgreSQL as a backend. The
role installs the package, run `initdb`, creates a database, and add necessary
configuration to `foo.config` and ...". In my opinion, that is too much. What
if the database is not on the same host? How can I set initial database users
and roles? What if I have another role to manage database? If a role claims
that it setups a load-balancer, application servers, clustered backend nodes,
and whatever, it looks too complex. And often, it is. As a bonus, some roles
depend on another complex roles.

## My rules

Here is my rules. I do not claim they are the best practice. You should
develop your own.

### Abstracting all paths to files and directories

Do not hard-coded path. Create a role variable for a path.

{% raw %}

```yaml
---
# tasks/main.yml

- name: Include default variables
  include_vars: "{{ ansible_os_family }}.yml"

- name: Create foo.conf
  ansible.builtin.template:
    src: foo.conf.j2
    dest: "{{ foo_config_file }}"
    mode: "0644"
```

```yaml
---
# defaults/main.yml
foo_config_dir: "{{ __foo_config_dir }}"
foo_config_file: "{{ foo_config_dir }}/foo.conf"
```

```yaml
---
vars/FreeBSD.yml
__foo_config_dir: /usr/local/etc
```

```yaml
vars/Debian.yml
__foo_config_dir: /etc
```

Instead of:

```yaml
---
# tasks/main.yml
#
# Don't do this

- name: Create foo.conf
  ansible.builtin.template:
    src: foo.conf.j2
    dest: /etc/foo.conf
    mode: "0644"
```

{% endraw %}

By abstracting path, the role allows:

* it to support different OS platforms
* users to override the defaults if necessary

In addition, your role supports `include_role`, which allows a role to run
another role multiple times. This is useful when you manage multiple instances
of an application. Suppose, you are hosting multiple web servers for users.
The applications are reside on `/usr/local/user1` and `/usr/local/user2`. By
supporting `include_role`, now you can run the role with different role
variables in a loop.

{: .notice--warning }
Roles in `ansible` is not a first class citizen. It has
counter-intuitive bugs. See
[Issue #19084](https://github.com/ansible/ansible/issues/19084).

The drawback is, increasing the number of role variables. However, it is
acceptable for me because, in most cases, you do not need to change the
defaults. If you are not comfortable with abstracted path, you can always dump
all the host variables at the beginning of the play.

### Implementing what you need

Do not implement something you do not need. Implement what you actually need,
and create a realistic test case.

It is tempting to add more feature while writing a role. "What if I need to do
this in the future?" This often results in a half-baked implementation. The
role variable for the feature is not very flexible, not what you want to write
in your project. If you think you really need it, create a test that
implements what you need. Testing your role in a realistic test scenario is the
best way to design roles. In the test, you will find requirements you did not
know, other use-cases you did not imagine. Roles by someone else might do more,
but when your role does what you need, it is perfectly fine. The simpler, the
better.

### Less role variables

Do not create too many role variables. For example, provide a single variable
for configuration file.

{% raw %}

```yaml
---
# defaults/main.yml
foo_config: ""
```

```jinja
# templates/foo.conf.j2
{{ foo_config }}
```

```yaml
---
# tasks/main.yml

- name: Create foo.conf
  ansible.builtin.template:
    src: foo.conf.j2
    # XXX but see rule above
    dest: /etc/foo.conf
```

{% endraw %}

This give us flexibility and simplicity.

The drawback is: the role does not work out-of-box. Users need to define
`foo_config`. This is acceptable for me because I don't need predefined
configurations. A role should helps those who know the configuration, instead of
trying to provide out-of-box experience for those with no clue. If you want to
provide out-of-box experience, document a working configuration in `README`,
preferably, your test of the role. This assures that the example is a working
example because the example has been tested.

This helps porting from existing configurations. Say, you have a working
system, but not managed by `ansible` yet. Maybe, it is a test system. You just
need to copy all the content of `foo.conf` instead of porting the config to
the role.

Don't do like this:

{% raw %}

```yaml
---
# defaults/main.yml

# Don't do this
foo_port: 80
foo_address: localhost
foo_enable_tls: no
foo_extra_config: ""
```

```yaml
# templates/foo.conf.j2

# Don't do this
address = {{ foo_address }}
port = {{ foo_port }}
{% if foo_enable_tls %}
tls = yes
{% endif %}

# your config goes here
{{ foo_extra_config }}
```

```yaml
---
# tasks/main.yml

# Don't do this
- name: Create foo.conf
  ansible.builtin.template:
    src: foo.conf.j2
    dest: /etc/foo.conf
```

{% endraw %}

Why this is bad? First, the template is complex and unmaintainable. What if
the upstream project changes the variable names? You need to change the
template whenever it happens. What if new variable is introduced? As older
application does not understand new one, you would need to check application
version and add yet another {% raw %}`{% if %}{% endif %}`{% endraw %}. This is especially painful
when your role supports conservative distributions, like Debian. Many roles
break due to this. Some role authors maintain multiple version of the role to
support multiple versions of packages. Good luck for them.

Second, users need to know what your role's default is in addition to the
_real_ default. Usually, the upstream provides a default configuration. Maybe,
distributions provide their own. And now your role's own. Users now need to
understand three, what modifications you have made, and _why_.

Third, the role has too many buttons and assumes a use-case. When another user
needs another use-case, you would add another role variable to support that
use-case. The number of role variables keeps increasing. If you use role
variables to control task execution flows, the possibility of bugs also
increases. As it is really hard to trace execution flow, you really want to
avoid it. Instead, you should provide a way to allow other use-cases.

### Including fewer tasks

Include fewer tasks. Write straightforward `tasks/main.yml`. Do not include
another task file from included task file.

{% raw %}

```yaml
---
# tasks/main.yml

- name: Include install tasks
  include: "install-{{ ansible_os_family }}.yml"

# other application-specific tasks ...
```

Instead of:

```yaml
---
# tasks/main.yml

# Do not do this
- name: Include install tasks
  include: install.yml

- name: Configure
  include: configure,yml

- name: Run init tasks
  include: init.yml
```

Never include tasks from another task file:

```yaml
---
# tasks/main.yml

# Never do this
- name: Include foo.yml
  include: foo.yml
```

```yaml
---
# tasks/foo.yml

# Never do this
- name: Include bar.yml
  include: bar.yml
```

{% endraw %}

My roles `include_task` only few task files. Usually, {% raw %}`tasks/install-{{
ansible_os_family }}`{% endraw %} only. In most cases, `tasks/main.yml` does everything.
The file is easy to follow the execution flow, just from the top to the
bottom.

I rarely see points when role authors do `include_task`. Exceptions are: the
tasks are included multiple times, which is very rare. Or the tasks are rarely
included, such as initialization at install phase. Or, the tasks are specific to
distributions. `tasks/main.yml` should focus on application-specific tasks.

### Using fewer `when`

`when` is unavoidable but if you have many `when` it indicates your role does
too many things. The more `when`, the more tests. Worse, the more untested
tasks.

Complex `when` is necessary when you are looping over role variables, for
example, creating users, or installing plugins. But try to reduce the number
of `when`.

### Providing means to override defaults

Accept arbitrary parameters in a task, and provide defaults.

{% raw %}

```yaml
---
# tasks/main.yml

- name: Add users
  ansible.builtin.user:
    name: "{{ item['name'] }}"
    create_home: "{{ item['create_home'] | default('yes') }}"
    group: "{{ item['group'] | default(omit) }}"
    # ... more parameters of `user` module ...
  with_items: "{{ users }}"
```

```yaml
---
# in user's var file
users:
  - name: foo
  - name: bar
    group: buz
```

Instead of:

```yaml
---
# tasks/main.yml

# Don't do this
- name: Add users
  ansible.builtin.user:
    name: "{{ item }}"
  with_items: "{{ users }}"

```

```yaml
---
# in user's var file
users:
  - foo
  - bar
```

{% endraw %}

Accepting arbitrary parameters allows users to override defaults when
necessary. Also, users do not need to learn your own data structure of the
role variable.

The drawback is: more typing when writing the task. You have to copy and paste
many parameters from the module documentation. In addition, when the module
introduces new parameter, you have to modify the task. This is acceptable
because I don't have to document the data structure of the variable, and it
will not break when the module introduces new parameters. Adding new
parameters is not difficult, and requires no changes in the role variable.

The bad example disallows users to pass other parameters to the module. Every
time someone needs new parameter to pass, the task and the structure of the
variable must be modified.

### Avoiding dependencies

Avoid dependency on other roles. The role should work without other roles.

Dependency hell is a common problem. We really want to avoid it. Some role
authors requires their own roles in a role because it needs specific tasks
need to be done, or needs specific role variables for the role to work.
Effectively, users are locked-in the role.

However, it is sometimes unavoidable. Some of my roles depends on
[`trombik.x509_certificate`](https://github.com/trombik/ansible-role-x509_certificate)
when TLS is involved because certificates for TLS needs to be created _during_
the role execution. On the other hand, no roles depend on
[`trombik.apt_repo`](https://github.com/trombik/ansible-role-apt_repo),
which manages `apt` repositories, even when the role requires a third-party
repository because roles only require `apt-get install foo` to succeed. It is
not the role's responsibility to add the repository.  Instead, users are free
to choose how to add the repository. It might be their own role, or others.
They are free to use my role, as often used in my examples, but not required.
Many dependencies in projects make the projects unmaintainable in the long
run.

### Testing

Do test your role.

There are several frameworks to test `ansible` role.
[`molecule`](https://github.com/ansible-community/molecule) is popular. I
prefer [`serverspec`](https://serverspec.org/) and
[`kitchen-ansible`](https://github.com/neillturner/kitchen-ansible).

The drawback is: testing roles takes time. Unlike tests in software
development, you cannot test all possible test cases due to this constraint.
It usually requires to run virtual machines. Some of my tests take an hour to
finish.

Unfortunately, my roles does not have automated tests in CI because few CI
services provide nested-virtualisation (no, docker is not an option). Still, I
always run tests on my local machines. If you need full virtualisation, use
on-premiss Jenkins, or other automation server.

### Supporting other platforms

Support other platforms even if you don't use it. Porting reveals many
assumptions and bugs.

My first choice is always FreeBSD or OpenBSD for reasons I do not describe
here. Debian-variants are the next option when I have to, especially when
running services on small machines. I rarely use CentOS. Still, my roles (try
to) support them whenever possible. Of course, it takes more time to write
potable code, but during the development, you will find many assumptions and
bugs. My rule of thumbs is that: when the distribution, or the upstream,  has
a package, port the role on it. If not, avoid. Installing unpackaged binaries
is not easier than it might look, not worth the effort.

The drawback is: time and resources as mentioned above. When a test takes 10
minutes to finish, which is not very unusual, porting another distribution
makes it double. Four distributions and two test cases mean 80 minutes. Is it
acceptable? For me, yes. For you, maybe not.

## Writing a role from scratch

With all the rules, here is how I write a role.

### Create a skeleton role from your own template

A template is a great way to standardize your roles. A template should
include:

* README
* LICENCE
* `defaults/main.yml`
* {% raw %}`vars/{{ ansible_os_family }}.yml`{% endraw %}
* `tasks/main.yml`
* `handlers/main.yml`
* `meta/main.yml`
* tests
* scripts for CI

If you do not have your template, write many roles. You will find repetitive
tasks, role variables, and common scripts. Develop a script to generate a role
from these repetitions.

### Use the same convention for variables

My conventions are:

* Use `_file` for file names
* Use `_dir` for directories
* Use `_pacckage` for packages
* Use plural for lists
* Use singular for dict
* Use `_config` for contents of configuration files
* Use `_enable` for variables that expect `yes` or `no`
* Use `__` prefix for internal variables that users should not use
* Use indented YAML style instead of one-liner
* Use `foo['bar']` to access dict, instead of `foo.bar`

It helps to prevent common mistakes and typos.  Whatever your convention is,
stick with it.

### Investigate various file names

I always start from:

{% raw %}

```yaml
---
# tasks/install-FreeBSD.yml
- name: Install foo
  ansible.builtin.pkgng:
    name: "{{ foo_package }}"
    state: installed
```

{% endraw %}

{% raw %}

Play the role, login to the test system, read the official documentation, and
poke around. There should be configuration files. Some application installs
commands to manage plugins. Where is the log file? List them and add them to
`defaults/main.yml`. Do not hard-code path. Use `vars/{{ ansible_os_family }}.yml`
to abstract path. For example, if the application installs everything
under `/usr/local/app`, `defaults/main.yml` should have:

{% endraw %}

{% raw %}

```yaml
___
# defaults/main.yml
foo_root_dir: "{{ __foo_root_dir }}"
foo_command: "{{ foo_root_dir }}/command"
```

```yaml
---
# vars/FreeBSD.yml
__foo_root_dir: /usr/local/app
```

{% endraw %}

### Write tests

Whatever you choose as test framework, write tests first. Here is an example
of `serverspec`.

```ruby
foo_conf_file = case os[:family]
                when "freebsd"
                  "/usr/local/app/foo.conf"
                else
                  "/etc/app/foo.conf"
                end
service = "foo"

describe file foo_conf_file do
  it { should exist }
  it { should be_mode 644 }
  it { should be_file }
  its(:content) { should match(/something/) }
end

describe service service do
  it { should be_enabled }
  it { should be_running }
end
```

Test tasks as much as you can so that you do not have to test the role in your
projects. When you are sure the role works and well-tested, you can focus on
tests on project-specific aspects in your projects.

### Create configuration files

As stated above, configuration files should be almost empty.

{% raw %}

```yaml
# templates/foo.conf.j2
{{ foo_config }}
```

```yaml
---
# tasks/main.yml
- name: Create foo.conf
  ansible.builtin.template:
    src: foo.conf.j2
    dest: "{{ foo_conf_dir }}/foo.conf"
    # XXX always use `mode`. Do not rely on `umask`
    mode: "0644"
```

{% endraw %}

### Run the tests

Run the tests and repeat until you are happy with it. Extend your test
scenario to use more application's feature. Enable authentication, use
plugins, add or remove users, etc. The point is, to create realistic test
scenario, and to design role variables how you want to write in projects.

### Create another test scenario

The tests passed. You have finished the first iteration. Your role, say
`nginx` role, now manages `nginx` that serves static files. Create another
test scenario, such as `nginx` as a load balancer, or TLS termination proxy.
The more realistic your test scenario is, the better. Install web application
in the test scenario, and see how your role handles the scenario.

For example, my
[`trombik.cfssl`](https://github.com/trombik/ansible-role-cfssl), which
manages [`cfssl`](https://github.com/cloudflare/cfssl), a certification
service, has
[a complete example](https://github.com/trombik/ansible-role-cfssl/blob/b063f80cd43965a16b3b2cd247a4d4bf914a34d0/tests/serverspec/api.yml)
to run `cfssl` and `haproxy` that provide certification signing services to
API clients over TLS with a certificate signed by the CA the example creates.
Details might need more modifications, but the example test can be used in my
project almost as-is.

### Use the role in your project

Use the role in the real world. As your imagination is limited, you will find
that more features are required in the role. For `nginx` example, what if you
need a `lua` script to do something tricky? The role should provide a role
variable that handles the situation (but only _IF_ you really need it). Maybe
you find a bug in the role. Write a test case that reveals the bug in the role.

## Conclusions

This is how I write roles.  If you think this is too much for you, use roles
developed by someone else, cross your fingers, and good luck.

If you think this is worth the efforts, try:

* Develop your own rules and self discipline
* Test the role
* Keep the role simple

It is more difficult than it sounds, actually (especially, the last one!). I
did many automated deployments in the past. But when I looked back, I always
am ashamed how bad they were and I am proud that I do better now.
