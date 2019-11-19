---
date: 2016-08-07
description: At times, we may need to keep certain files off a particlar repo. Usually a .gitignore file would suffice. But what if we want those files to be present in another repo? How do we go about setting that up? I will present a short method that tackles this problem.
seo_title: Separation of Concerns with&nbsp;Git
slug: separation-of-concerns-with-git
title: Separation of Concerns with&nbsp;Git
---

When developing a web app or site that has a public-facing repo, there may be a need to have some rudimentary separation of concerns where git is concerned. Certain files that we may want on the production server might seem out of place on the public repo due to licensing, privacy or security concerns.

This method presumes that there are three repos: __production__, __public__ and __local/development__. We will be attempting to prevent some sensitive files from being pushed to the public repo, while allowing them to be sent off to produciton.

To solve this problem, we first add dummies of the sensitive files to the development repo. These dummy files can be empty files, as long as they have the same names as the actual sensitive files we will eventually add.

We will commit the dummy files, then replace them with the actual sensitive files. Now we tell git to assume that the files we have just added have not changed.

This initial setup can be accomplished by running the following commands in the console:

```bash
# Create and commit the dummy file(s)
$$$ touch /path/to/sensitive_file
$$$ git commit -am "Add dummy file"

# Replace the dummy file(s) with the real one(s)
$$$ rm -rf /path/to/sensitive_file
$$$ mv /path/to/actual/sensitive_file /path/to/sensitive_file

# Tell git to act like nothing happened
$$$ git update-index --assume-unchanged /path/to/sensitive_file
```

__NOTE:__ `/path/to/actual/sensitive_file` must be in the .gitignore or outside of the git project. Otherwise, it beats the point of this whole process.

From now on, git should skip over the sensitive files whenever it is checking for diffs. Thus, we can push normally to the __public__ repo where the dummy files reside, while the actual sensitive files remain in our __development__ repo.

To push the sensitive files to the __production__ repo, we will take the following steps:

1. Tell git to no longer assume the files are unchanged.
2. Commit the sensitive files, and push them to production.
3. Tell git, within the scope of our development repo, to go back one commit. Essentially, we undo the previous commit, but only __locally__.
4. Remind git to assume the sensitive files have not changed.

These 4 steps can be packaged into a script, which we will run whenever we want to push some changes to production.

An example script is presented below, with the following assumptions:

- We have some licensed web fonts that we shouldn't distribute on our public repo.
- We want the font files to reside on the same server as our web app/site rather than on a dedicated font server.
- Our production sever is hosted on __Heroku__.

```bash
# Array with paths to font files
FONT_LIST="assets/fonts/title-font.woff
assets/fonts/title-font.woff2
assets/fonts/body-font.woff
assets/fonts/body-font.woff2"

# STEP 1
for FONT in FONT_LIST
do
	git update-index --no-assume-unchanged $FONT
done

# STEP 2
git commit -am "Push font files to server"
git push -f heroku master

# STEP 3
git reset HEAD~1

# STEP 3 & 4
for FONT in FONT_LIST
do
	git reset HEAD $FONT # STEP 3 continued
	git update-index --assume-unchanged $FONT # STEP 4
done
```

The are some minor downsides to using this method:

- The git logs on our production server will always show the "Push font files to server" as the most recent commit. In other words, production will be one commit ahead of the development.
- As a result, we must run this script anytime we want to push changes to production.
- The script will include unstaged changes in the commit that it generates. It is advisable to make sure that there are no pending changes in the master branch before running the script.

However, I would argue that these are inconsequential inconveniences.

To reiterate, we will now use a different command to push to production.


```bash
# OLD command to push to production
$$$ git push heroku master

# NEW command to push to production
# Assuming we save the script to the root of our project
# and name it "deploy"
$$$ sh deploy
```

The method described in this post was used on this very site to keep the web font files out of the [public GitHub repository][1]. As of 14<sup>th</sup> March 2017, the font files are now hosted on a CDN. This blog post describes [how to set up Azure CDN][2].

[1]: https://github.com/Croccifixio/blog
[2]: https://odongo.xyz/blog/2017/setting-up-azure-cdn.html
