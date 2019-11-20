---
to: blog/<%- h.date() %>-<%- h.kebabCase(postTitle) %>.md
---
---
date: <%- h.date() %>
description: ...
seo_title: <%- h.titleCase(postTitle) %>
slug: <%- h.kebabCase(postTitle) %>
title: <%- h.nbsp(h.titleCase(postTitle)) %>
tags: <%- tags %>
---
