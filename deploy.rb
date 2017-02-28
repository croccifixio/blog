class Deploy
	@count = 0

	class << self
		attr_reader :count
	end

	def initialize
		Deploy.instance_eval { @count += 1 }
	end

	def deploy_msg(msg)
		print "\n" if Deploy.count > 1 
		puts msg
		msg.length.times { print "=" }
		print "\n"
	end
end

# Push to public repo
Deploy.new.deploy_msg("DEPLOY SCRIPT > Pushing to public repo")
system "git push origin master"

# Get array of font files (.woff and .woff2)
Dir.chdir "source/assets/fonts"
font_list = Dir.glob("*.{woff,woff2}")

# Mark font files as changed
font_list.each do |font|
  system "git update-index --no-assume-unchanged #{font}"
end

# Push to production
Deploy.new.deploy_msg("DEPLOY SCRIPT > Pushing to production")
system "git commit -am \"Push font files to production\""
system "git push -f gitlab master"

# Revert changes locally
system "git rebase HEAD~1"
font_list.each do |font|
	system "git reset HEAD #{font}"
	system "git update-index --assume-unchanged #{font}"
end