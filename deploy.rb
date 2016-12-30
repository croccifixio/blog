# Get array of font files (.woff and .woff2)
Dir.chdir "source/assets/fonts"
font_list = Dir.glob("*.{woff,woff2}")

# Mark font files as changed
font_list.each do |font|
  system "git update-index --no-assume-unchanged #{font}"
end

# Push to production
system "git commit -am \"Push font files to server\""
system "git push -f heroku master"

# Revert changes locally
system "git rebase HEAD~1"
font_list.each do |font|
	system "git reset HEAD #{font}"
	system "git update-index --assume-unchanged #{font}"
end