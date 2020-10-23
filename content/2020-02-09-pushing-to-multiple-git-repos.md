+++
date = 2020-02-09
title = "Pushing To Multiple Git&nbsp;Repos"
path = "pushing-to-multiple-git-repos"
[taxonomy]
tags = ["git"]
[extra]
description = [
  "Pushing a change to multiple git repos, while probably not something you would want to do in most cases, does not have to be a multi-step process. A fairly simple adjustment to the git config can enable pushing to multiple remote repositories with a single command."
]
seo_title = "Pushing To Multiple Git Repos"
+++

## The problem

Assume that you had a repo that was hosted on github, and you decided that for some reason you would like to have a copy of your repo on gitlab as well. Perhaps the obvious solution would be to add another remote to your git config.

```
$$$ git remote add gitlab git@gitlab.com/username/my-repo.git
```

Pushing to both repos would then be achieved as follows:

```
$$$ git push origin main
$$$ git push gitlab main
```

Having to do this each time you wanted to push your changes could certainly become overwhelming and would likely be hard to remember to do every time. Luckily this needn't be the case.

## The solution

A good place to start implementing our solution to this problem would be to check for existing remotes.

```
$$$ git remote -v
```

The above command lists out our fetch and push remotes, which may look something like this:

```
origin  git@github.com:username/my-repo.git (fetch)
origin  git@github.com:username/my-repo.git (push)
```

We will then clear the `origin` remote just to be sure that there's nothing in our config that could cause some unexpected issues later on.

```
$$$ git remote remove origin
```

Next, we will add the `origin` remote again, setting its single pull url and making sure to set 2 push urls.

```
$$$ git remote add origin git@github.com:username/my-repo.git
$$$ git remote set-url --add --push origin git@github.com:username/my-repo.git
$$$ git remote set-url --add --push origin git@gitlab.com:username/my-repo.git
```

We then set the upstream branch of our choosing (`main` in this case).

```
$$$ git fetch origin main
$$$ git branch --set-upstream-to origin/main
```

From now on, whenever we run `git push origin main`, git will push our changes to both remote repositories (github and gitlab). Fetching or pulling changes from origin will always refer to just the one repo (github).

## Bonus points

As a final touch, we can give both of our remotes a unique name in case we ever need to explicitly push or fetch from a particular one.

```
$$$ git remote add github git@github.com:username/my-repo.git
$$$ git remote add gitlab git@gitlab.com:username/my-repo.git
```

Once this is done, listing our remotes with `git remote -v` gives the following output:

```
github  git@github.com:username/my-repo.git (fetch)
github  git@github.com:username/my-repo.git (push)
gitlab  git@gitlab.com:username/my-repo.git (fetch)
gitlab  git@gitlab.com:username/my-repo.git (push)
origin  git@github.com:username/my-repo.git (fetch)
origin  git@github.com:username/my-repo.git (push)
origin  git@gitlab.com:username/my-repo.git (push)
```
