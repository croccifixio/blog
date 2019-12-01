---
date: 2019-12-01
description:
  - Media queries are a vital tool in making websites responsive. This typically involves increasing/decreasing various properties' values in a step-like manner (e.g. bumping the font-size up by a few pixels at particular breakpoints).
  - Using a preprocessor allows us to cut down on the amount of boilerplate. We could pass breakpoint-value pairs to a mixin that generates media queries with the property set to its corresponding value. In this instance, we will limit the number of breakpoint-value pairs to two, and smoothly scale the value between the two breakpoints.
seo_title: CSS Locks In Sass And Stylus
slug: css-locks-in-sass-and-stylus
title: CSS Locks In Sass And&nbsp;Stylus
tags: css
---

A CSS lock is an interpolating function used to transition a numerical value in CSS between two breakpoints. This is typically done to make web pages responsive, although, it could also be used in more creative ways, such as, in art direction.

1. ## Responsive values

  Suppose we wanted to change the font size of given heading on a web page at given breakpoints in the viewport width. We may end up with the following styles:

  ```scss
  h2 {
    font-size: 2rem;

    @media (min-width: 400px) {
      font-size: 3rem;
    }

    @media (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
  ```

  The code snippet shown above utilises a step-like approach to responsiveness. The font-size increases in steps as the viewport becomes wider. The font size is 2rem for viewports that are narrower than 400px, and 4.5rem for viewports wider than 1000px. For the remaining viewport widths, the font size is 3rem.

2. ## CSS locks

  The is no particular reason  for the sudden jump in font size around the 400px and 1000px marks. Certainly there is no satisfactory explanation why a user whose viewport is 399px wide should have a such a significantly smaller font than if their viewport was 401px wide.

  The step-like behaviour that our heading's font size now exhibits is purely an artefact of the way in which we have implemented its responsiveness.

  Perhaps, a more sensible way of going about this, would be to let the font size retain its minimum and maximum values, and transition between these two values. This will likely be more consistent with the overall design of the page.

  A CSS lock does just that. It sets a given CSS property to a one value below a lower breakpoint, and to a second value above an upper breakpoint. In between breakpoints, the CSS property's value is transitioned from its value at one breakpoint to its value at the other breakpoint.

  ```scss
  h2 {
      font-size: 2rem;

    @media (min-width: 400px) {
      font-size: calc(/* some formula */);
    }

    @media (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
  ```

  Without the help of JavaScript, the only way to achieve such a transition is to make use of the CSS `calc()` function. While this article doesn't go into how the formula that we shall use in the `calc()` function was derived, [Florens Verschelde's article on CSS locks][1] provides an in-depth explanation of the math, for those so inclined.

3. ## Units in calc() functions

  ```scss
  h2 {
    font-size: 2rem;

    @media (min-width: 400px) {
      font-size: calc(2rem + (4.5 - 2) * ((100vw - 400px) / (1000 - 400)));
    }

    @media (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
  ```

  If everything worked correctly, we can expect the font size to be just above 2rem when the viewport is slightly over 400px wide. If we test it out in a browser, this is actually the case.

  Conversely, for a viewport width just below 100px, we expect a font size that is slightly smaller than 4.5rem. This is sadly not the case. Around the 1000px mark, the font size jumps from around 2.155rem to 4.5rem. We expected the value returned by our `calc()` function when the vieport width was just below 100px to be approximately 4.5rem, but it returned a value that was just barely greater that 2rem.

  <div id="disjointed-css-lock">

  ![Disjointed CSS lock](https://cdn.odongo.xyz/images/lock-error.gif)

  </div>

  The reason for the strange behaviour of our `calc()` function is the mixing of units. Currently, our formula uses `px`, `rem` and `vw` units. Assuming the base font size of the document was not changed, 1rem corresponds to 16px in most browsers. We could replace all the `rem` based values with their equivalent `px` based values.

  ```scss
  h2 {
    font-size: 2rem;

    @media (min-width: 400px) {
      font-size: calc(32px + (72 - 32) * ((100vw - 400px) / (1000 - 400)));
    }

    @media (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
  ```

  ![CSS lock](https://cdn.odongo.xyz/images/lock-fixed.gif)

  Alternatively we could replace the `px` based values with their equivalent `rem` based values.

  ```scss
  h2 {
    font-size: 2rem;

    @media (min-width: 400px) {
      font-size: calc(2rem + (4.5 - 2) * ((100vw - 25rem) / (62.5 - 25)));
    }

    @media (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
  ```

4. ## CSS lock mixins

  Writing out the formula in `calc()` function by hand can be cumbersome. We could make use of a CSS preprocessor like sass to write a reusable mixin that generates the formula for us. Since the formula uses
  the other two values of the font size found outside the `calc()` function &mdash; 2rem and 4.5rem &mdash; the entire snippet above can be encaspsulated in a mixin.

  ```scss
  @mixin css-lock($prop, $unit, $min-size, $max-size, $min-width, $max-width) {
    #{$prop}: #{$min-size}#{$unit};

    @media (min-width: #{$min-width}#{$unit}) {
      #{$prop}: calc(#{$min-size}#{$unit} + (#{$max-size} - #{$min-size}) * ((100vw - #{$min-width}#{$unit}) / (#{$max-width} - #{$min-width})));
    }

    @media (min-width: #{$max-width}#{$unit}) {
      #{$prop}: #{$max-size}#{$unit};
    }
  }

  h2 {
    @include css-lock('font-size', 'rem', 2, 4.5, 25, 62.5);
  }
  ```

  We use the mixin by using the `@include` at-rule. The mixin takes six arguments: a property name, a unit, 2 property values and 2 breakpoints. It is importatnt to remember that the property values and breakpoints must use the same unit; otherwise, the transition will be disjointed, as [previously demonstrated](#disjointed-css-lock).

  While it is quite reasonable to expect various CSS properties to use different units in a given project &mdash; for instance, `px` for margins and paddings, and `rem` for font sizes &mdash; it is highly likely that the breakpoints within a codebase all use the same units. We can take advantage of this to improve the ergonomics of our mixin.

  ```scss
  @function convert-from-px($unit, $value) {
    @if ($unit == 'rem') {
      @return $value / 16;
    } @elseif ($unit == 'px') {
      @return  $value;
    }
  }

  @mixin css-lock($prop, $unit, $min-size, $max-size, $min-width, $max-width) {
    $min-width: convert-from-px($unit, $min-width);
    $max-width: convert-from-px($unit, $max-width);

    #{$prop}: #{$min-size}#{$unit};

    @media (min-width: #{$min-width}#{$unit}) {
      #{$prop}: calc(#{$min-size}#{$unit} + (#{$max-size} - #{$min-size}) * ((100vw - #{$min-width}#{$unit}) / (#{$max-width} - #{$min-width})));
    }

    @media (min-width: #{$max-width}#{$unit}) {
      #{$prop}: #{$max-size}#{$unit};
    }
  }

  h2 {
    @include css-lock('font-size', 'rem', 2, 4.5, 400, 1000);
    @include css-lock('margin-bottom', 'px', 30, 45, 400, 1000);
  }
  ```

  In the code snippet above, it is assumed that the breakpoint values are always given in pixels. By using an `@function` at-rule, we can automatically convert the breakpoint values to the relevant units each time the mixin is called. This means that we don't have to manually perform any conversions if the property in our mixin uses a unit other than `px`.

  The snippet below shows the same implementation in stylus:

  ```stylus
  convert-from-px($unit, $value)
    if $unit == rem
      $value / 16
    else if $unit == px
      $value

  css-lock($property, $unit, $min-size, $max-size, $min-width, $max-width)
    $min-width = convert-from-px($unit, $min-width)
    $max-width = convert-from-px($unit, $max-width)

    {$property} "%s%s" % ($min-size $unit)

    @media (min-width "%s%s" % ($min-width $unit))
      {$property} "calc(%s%s + (%s - %s) * ((100vw - %s%s) / (%s - %s)))" % ($min-size $unit $max-size $min-size $min-width $unit $max-width $min-width)

    @media (min-width "%s%s" % ($max-width $unit))
      {$property} "%s%s" % ($max-size $unit)

  h2
    css-lock(font-size, rem, 2, 4.5, 400, 1000)
    css-lock(margin-bottom, px, 30, 45, 400, 1000)
```

[1]: https://fvsch.com/css-locks/
