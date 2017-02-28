# Push to public repo
puts "DEPLOY SCRIPT > Pushing to public repo\n"
80.times { print "=" }
print "\n"
system "git push origin master"

# Get array of font files (.woff and .woff2)
Dir.chdir "source/assets/fonts"
font_list = Dir.glob("*.{woff,woff2}")

# Mark font files as changed
font_list.each do |font|
  system "git update-index --no-assume-unchanged #{font}"
end

# Push to production
puts "\n\nDEPLOY SCRIPT > Pushing to production"
80.times { print "=" }
print "\n"
system "git commit -am \"Push font files to production\""
system "git push -f gitlab master"

# Revert changes locally
system "git rebase HEAD~1"
font_list.each do |font|
	system "git reset HEAD #{font}"
	system "git update-index --assume-unchanged #{font}"
end