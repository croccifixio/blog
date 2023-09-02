build:
  docker build --tag middleman-legacy .
  docker run --rm -v $PWD:/app middleman-legacy middleman build
  
