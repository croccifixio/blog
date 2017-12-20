###
# Page options, layouts, aliases and proxies
###

# Use Assets directory for CSS, JS, font and image files
set :css_dir, 'assets/stylesheets'
set :font_dir, 'assets/fonts'
set :images_dir, 'assets/images'
set :js_dir, 'assets/javascripts'

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "{year}/{title}.html"
  # Matcher for blog source files
  blog.sources = "blog/posts/{year}-{month}-{day}-{title}.html"
  blog.taglink = "blog/tags/{tag}.html"
  blog.layout = "article_layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".erb"

  blog.new_article_template = File.expand_path("../source/blog/template.erb", __FILE__)
  blog.tag_template = "blog/tag.html"
  # blog.calendar_template = "blog/calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false

# Sitemap
set :url_root, 'https://odongo.xyz/'
activate :search_engine_sitemap

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end

# Activate browser caching
activate :asset_hash

# Use CSS auto-prefixer
activate :autoprefixer

# Add the _headers file to the build folder
# This file is specific to the Netlify webhost
# Middleman assumes files that begin with an underscore to be partials, thus they are ignored by default
after_build do |builder|
  src = File.join(config[:source],"_headers")
  dst = File.join(config[:build_dir],"_headers")
  base = File.expand_path(File.dirname(__FILE__))
  FileUtils.copy_file([base,src].join("/"),[base,dst].join("/"))
end
