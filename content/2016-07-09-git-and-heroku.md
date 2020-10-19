+++
date = 2016-07-09
title = "Git & Heroku"
path = "git-and-heroku"
[taxonomy]
tags = ["git"]
[extra]
description = [
  "Git and Heroku are vital tools in any web developers repertoire. Git for the simplicity it introduces to version control, and Heroku for the ease with which it allows app deployment. The following is quick-start guide to get you up and running."
]
seo_title = "Git & Heroku"
+++

Git and Heroku are vital tools in any web developers repertoire. Git for the simplicity it introduces to version control, and Heroku for the ease with which it allows app deployment.

The following guide shows how to set up both for the very first time on a UNIX-based system.

## Setting up Git

Enter the following commands in the console:

```
$$$ git config --global user.name "__Your_Name__"
$$$ git config --global user.email "__your@email.com__"
$$$ git config --global push.default matching
$$$ git init
```

If you do not have an account at GitHub or a similar repository provider, now is the time to create one.

We can make our first commit. In the console, type:

```
$$$ git status
$$$ git add .
$$$ git commit -m "Initial commit"
```

Now we need to find out what our SSH key is. Copy the output of the following command:

```
$$$ cat ~/.ssh/id_rsa.pub
```

...and on GitHub locate the New Repository page and add the SSH key that you have copied. Give your repository a name, while your at it.
Next, we will push to GitHub:

```
$$$ git remote add origin git@github.com:__Your_Name__/__Repository_Name__.git
$$$ git push -u origin master
```

## Setting up Heroku

Create an account on Heroku and verify your account by clicking the link they provide you by email. Then enter the following into the console:

```
$$$ heroku login
```

Enter you email address and password as prompted.

Next, we will add the same SSH key that we used with Git to Heroku:

```
$$$ heroku keys:add
```

Create a server on Heroku:

```
$$$ heroku create
```

Finally, push the code to the Heroku server.

```
$$$ git push heroku master
```

Just as a side note, if you ever need to check the address of your Heroku server, type the following:

```
$$$ heroku domains
```
