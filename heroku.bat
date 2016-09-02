REM Windows-only bash script
REM To run type the followinf line into the cmd terminal
REM ``` heroku.bat ``` 

REM Due to spotty array support, the decision to opt away from a named array containing the list of fonts has been made
REM Paths to the font files will need to be manually added into the blocks in _both_ for loops

REM The previously considered solution was as follows:
REM ``` for /F "tokens=2 delims==" %%x in ('set font_list[') do echo %%x ```
REM Where "font_list" was an array containing paths to the font files

REM However this for loop also targeted DOSKEY aliases, e.g.
REM ``` DOSKEY middle = middleman server < nul ```
REM This would try to execute the following command:
REM ``` git update-index --assume-unchanged middleman server <nul ```
REM For the most part, this should result in a harmless error message and the batch file carries on executing
REM But for the sake of avoiding possible bugs down the road, this method has been shelved pending further research

for %%x in (
  source/assets/fonts/realtimerounded-semibold-webfont.woff
  source/assets/fonts/realtimerounded-semibold-webfont.woff2
  source/assets/fonts/ttroundscondensed-regular-webfont.woff
  source/assets/fonts/ttroundscondensed-regular-webfont.woff2
  source/assets/fonts/ttroundscondensed-bold-webfont.woff
  source/assets/fonts/ttroundscondensed-bold-webfont.woff2
  ) do (
  git update-index --no-assume-unchanged %%x
)

git commit -am "Push font files to server"
git push -f heroku master

git reset HEAD~1

for %%x in (
  source/assets/fonts/realtimerounded-semibold-webfont.woff
  source/assets/fonts/realtimerounded-semibold-webfont.woff2
  source/assets/fonts/ttroundscondensed-regular-webfont.woff
  source/assets/fonts/ttroundscondensed-regular-webfont.woff2
  source/assets/fonts/ttroundscondensed-bold-webfont.woff
  source/assets/fonts/ttroundscondensed-bold-webfont.woff2
  ) do (
  git reset HEAD %%x
  git update-index --assume-unchanged %%x
)