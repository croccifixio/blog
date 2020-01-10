---
date: 2020-01-01
description:
  - A while ago, my subscription to a certain cloud storage provider came to its end, which led me to comparing prices between alternative providers. While reeling at the of migrating multiple gigabytes of data and coming to terms with just how much of my data I hadn't accessed in ages, I began coming to terms with the fact that I might be a digital hoarder.
  - So to distract myself, I decided that just as one might optimise images for the web to save on bandwidth and improve loading times, I could losslessly optimise the images I was ~~hoarding~~ storing in the cloud to potentially shave off hundreds if not thousands of megabytes of data that didn't really need to be part of my digital footprint (nevermind that images were only a tiny fraction of all the data I had).
seo_title: Parallelising Asynchronous Tasks
slug: parallelising-asynchronous-tasks
title: Parallelising Asynchronous&nbsp;Tasks
tags: rxjs,iterators
---

A while ago, my subscription to a certain cloud storage provider came to its end, which led me to comparing prices between alternative providers. While reeling at the thought of having to migrate gigabytes of data and coming to terms with just how much of my data I hadn't accessed in ages, it started to dawn on me that I might be a digital hoarder.

So to distract myself, I decided that just as one might optimise images for the web to save on bandwidth and improve loading times, I could losslessly optimise the all images I was ~~hoarding~~ storing in the cloud. This could potentially shave off hundreds if not thousands of megabytes of data that didn't really need to be part of my digital footprint (nevermind that images were only a tiny fraction of all the data I had).

## 1. Operators or bust

Having fairly recently delved into a number of RxJS tutorials, I was eager to apply some of the knowledge that I had acquired (perhaps a little too eager). And this was a perfect opportunity to do just that.

To start off, I needed a list of image files. My plan was to pass a directory to my image optimisng script and have it optimise all the images in that directory and its nested directories. Fortunately for me, there's a node module for that.

```js
const recurse = require('recursive-readdir')

const srcDir = process.argv[2]

const getPaths = dir => recurse(dir)
  .then(
    files => files,
    err => {
      console.error(err)
      return []
    }
  )

const run = async () => {
  const filePaths = await this.#getPaths(dir)
}

run(srcDir)
```

The above script can then be ran as follows:

```
node script.js path/to/images
```

For the time being, besides storing a list of all files within a directory in a variable, our script does not do much else. Next, we will filter out files that do not match our list of supported image formats.

```js
const Path = require('path')
const recurse = require('recursive-readdir')
const { from, pipe } = require('rxjs')
const { filter } = require('rxjs/operators')

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png']

const srcDir = process.argv[2]

const isNotImage = path => {
  const extension = Path.extname(path)

  return !SUPPORTED_IMAGE_FORMATS.includes(extension)
}

const getPaths = dir => recurse(dir)
  .then(
    files => files,
    err => {
      console.error(err)
      return []
    }
  )

const run = async () => {
  const filePaths = await this.#getPaths(dir)
  const imagePaths$ = from(filePaths).pipe(
    filter(isNotImage)
  )
}

run(srcDir)
```

Now that we have an observable containing paths to image files, we can pass these paths to an external utility that asynchronously optimises the images (TODO: add appendix with the image processing snippet).

```js
const Path = require('path')
const recurse = require('recursive-readdir')
const { from, pipe } = require('rxjs')
const { filter, map } = require('rxjs/operators')
const processImage = require('./image-processor')

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png']

const srcDir = process.argv[2]

const isNotImage = path => {
  const extension = Path.extname(path)

  return !SUPPORTED_IMAGE_FORMATS.includes(extension)
}

const getPaths = dir => recurse(dir)
  .then(
    files => files,
    err => {
      console.error(err)
      return []
    }
  )

const run = async () => {
  const filePaths = await this.#getPaths(dir)
  const imagePaths$ = from(filePaths).pipe(
    filter(isNotImage)
  )
  const processImages$ = imagePaths$.pipe(
    map(processImage)
  )

  imagePaths$.subscribe()
  processImage$.subscribe()
}

run(srcDir)
```

If we now provide our script with a path to a directory with a few images, in a matter of seconds, we should end up with some optimised images. Job done, right? Well...technically yes. However, if you happen to pass in a directory containing hundreds of images as I did, prepare to have your computer's fans come whirring to life, as your computer struggles to process all of them at once.

In my case, after a solid 10 mintues of a flickering screen and a non-responsive cursor, my script had finally completed. Lesson learned. Don't process hundreds of images in parallel. We need some form of a queue in which images wait in line to be processed, so once the image processor is done optimising a particular image, we pass in the next image in line. This should help reduce the load we place on the CPU, but more importantly will probably allow the script to run without causing the computer to freeze up.

RxJS provides the `concatMap` operator, which we can use to have our image processing happen in series.

```js
const Path = require('path')
const recurse = require('recursive-readdir')
const { from, pipe } = require('rxjs')
const { filter, concatMap } = require('rxjs/operators')
const processImage = require('./image-processor')

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png']

const srcDir = process.argv[2]

const isNotImage = path => {
  const extension = Path.extname(path)

  return !SUPPORTED_IMAGE_FORMATS.includes(extension)
}

const getPaths = dir => recurse(dir)
  .then(
    files => files,
    err => {
      console.error(err)
      return []
    }
  )

const run = async () => {
  const filePaths = await this.#getPaths(dir)
  const imagePaths$ = from(filePaths).pipe(
    filter(isNotImage)
  )
  const processImages$ = imagePaths$.pipe(
    concatMap(processImage)
  )

  imagePaths$.subscribe()
  processImage$.subscribe()
}

run(srcDir)
```

This solves the problem of giving our computer to much too do at once buy having the images be processed one after the other. Running our script now presents us with a new issue: it is excruciatingly slow. If you monitor the CPU usage of your computer while running the above script, you will likely observe that the CPU is being underutilised.

What if, instead of having a single line in which all images wait to be processed, we had multiple lines each with their own image processor. This is like having multiple cashiers/checkout terminals at a supermarket: too few and you will have some customers waiting a long time; too many, and due to space limitations (the size of the store does not expand after all), chaos ensues as people start bumping into each other and getting in each others way.

That leaves it to us to find a happy middle ground between the 2 methods that were presnted. We want the script to process more than one image at a time, but not so many that it takes up all the CPU cycles. From the point of view of our code, we will be splitting up the list of paths to images into smaller chunks. Each chunk will then have its own dedicated image processor.

```js
const Path = require('path')
const recurse = require('recursive-readdir')
const { from, pipe } = require('rxjs')
const { concatMap, filter, shareReplay } = require('rxjs/operators')
const processImage = require('./image-processor')

const PARALLEL_THREAD_COUNT = 3
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png']

const srcDir = process.argv[2]

const isNotImage = path => {
  const extension = Path.extname(path)

  return !SUPPORTED_IMAGE_FORMATS.includes(extension)
}

const getPaths = dir => recurse(dir)
  .then(
    files => files,
    err => {
      console.error(err)
      return []
    }
  )

const run = async () => {
  const filePaths = await this.#getPaths(dir)
  const imagePaths$ = from(filePaths).pipe(
    filter(isNotImage),
    shareReplay,
  )
  const processImages$ = imagePaths$.pipe(
    reduce(countImages, 0),
    tap(total => {
      const chunkSize = Math.ciel(total / PARALLEL_THREAD_COUNT)
      const processImage$ = imagePaths$.pipe(
        windowCount(chunkSize),
        map(stream$ => stream$.pipe(
          concatMap(processImage)
        ))
      )

      processImage$.subscribe()
    })
  )

  imagePaths$.subscribe()
  processImage$.subscribe()
}

run(srcDir)
```

TODO: try to avoid the nesting in the snippet above
Let's go over what we are doing in the snippet above.

Since the `imagePath$` obserable is used twice, we can make a small optimisation by piping to `shareReplay` in its definition. This makes is so that the actual filtering out of paths that are not images happens only once and the results are saved to be passed on to any subscriber.

`windowCount` splits a stream into multiple shorter streams. It accepts one argument which determines the number of events each created stream can have. Once the first stream is filled up, it creates a second, then a third and so on. This is the reason why we needed to count the total number of image paths and dividing that by 3 (the number of parallel threads: PARALLEL_THREAD_COUNT).

## 2. Focusing on the subject matter

## 3. Async in, async out

readFileSync -> readFile

does [Symbol.iterator] fit in the picture somehow, technically I could make an infinite stream of files being read, but then I would need to throttle the calls from the queue manager for new files. Then again, the idea is to have a script that runs and then finishes and not one that is constantly waiting for  new files.
