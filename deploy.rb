# Push to origin first to prevent mix-ups
system "git push -f origin master"

# Get array of font files (.woff and .woff2)
Dir.chdir "source/assets/fonts"
font_list = Dir.glob("*.{woff,woff2}")

# Mark font files as changed
font_list.each do |font|
  system "git update-index --no-assume-unchanged #{font}"
end

# Push to production
system "git commit -am \"Push font files to production\""
system "git push -f gitlab master"

# Revert changes locally
system "git rebase HEAD~1"
font_list.each do |font|
	system "git reset HEAD #{font}"
	system "git update-index --assume-unchanged #{font}"
end