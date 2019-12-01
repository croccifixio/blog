---
date: 2017-10-28
description:
  - This guide covers how to set up a WiFi hotspot on Linux using a single adapter. The scenario it aims to solve is one where only one device (for instance a laptop) is connected to a WiFi network that has a whitelist of permitted MAC addresses. The connected device can then be used to create a hotspot that other devices can connect to for internet access.
seo_title: Sharing WiFi on Linux
slug: sharing-wifi-on-linux
title: Sharing WiFi on&nbsp;Linux
tags: linux
---

1. ## Installing create_ap

  To create a WiFi hotspot, we will make use of a handy script available on GitHub. It can be installed on Ubuntu by runnnig the following commands:

  ```
  $$$ git clone https://github.com/oblique/create_ap
  $$$ cd create_ap
  $$$ make install
  ```

  For other linux distros, take a look at the [installation guide](https://github.com/oblique/create_ap#installation).

2. ## Finding your wireless interface name

  The next step (assuming your device is already connected to WiFi) is to find the name of your wireless interface. Run the following command in a console:

  ```
  $$$ iwconfig | grep SSID | awk '{print $1}'
  ```

  This should print out a list of network interfaces with a note beside the ones that do not have an active connection. Running the above command on my laptop gave me the following output:

  ```samp
  enp9s0    no wireless extensions.

  lo        no wireless extensions.

  wlp8s0
  ```

  Since I was connected to WiFi at the time, I was able to conclude that `wlp8s0` is the name of my wireless interface.

3. ## Launching the hotspot
  The hotspot can then be launched by running the following command, filling in the relevant fields:

  ```
  $$$ sudo create_ap __wireless_interface__ __wireless_interface__ __hotspot_name__ __hotspot_password__
  ```

  In my case, the filled in command looks something like this:

  ```
  $$$ sudo create_ap wlp8s0 wlp8s0 MyHotspot MyPassword
  ```

## Footnotes:
Since the script runs a process in the console, once the terminal is closed the hotspot will be closed as well. To circumvent this consider using a terminal multiplexer such as [tmux](https://github.com/tmux/tmux/wiki) or [screen](https://www.gnu.org/software/screen/), which allows you to close a terminal and still have it running in the background.
A simplified workflow using tmux is presented below:

```bash
# Create a tmux session called "hotspot"
$$$ tmux new -s hotspot

# Run the hotspot (consider aliasing the command below)
$$$ sudo create_ap __wireless_interface__ __wireless_interface__ __hotspot_name__ __hotspot_password__

# Enter your user password when prompted
```

At this point you may close the terminal window. Alternatively, detach from the terminal by pressing ^^^^Ctrl^^ + ^^B^^^^ followed by ^^D^^.
If you wish to stop the hotspot manually, run the following command in any terminal to kill the tmux session named __hotspot__:

```
$$$ tmux kill-session -t hotspot
```

## Sources:
- [[AskUbuntu] How do I create a WiFi hotspot sharing wireless internet connection (single adapter)?](https://askubuntu.com/a/324785/672916)
- [[Github] __oblique/create_ap__ - A script that creates a NATed or Bridged WiFi Access Point](https://github.com/oblique/create_ap#internet-sharing-from-the-same-wifi-interface)
