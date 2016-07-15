# This script checks out to the 'heroku' branch, which contains font files that
# are not present on the publically available master branch.

# It rebases so that it is up to date with the master branch, then pushes the
# changes to Heroku.

# Finally it checks out back to the master branch for further development.

git checkout heroku
git rebase master
git push heroku heroku:master
git checkout master
