# Shortcodes

The shortcodes used in this project are listed below:

- __`flow`__

  This shortcode is used to represent steps that a user can go through (typically in the form of button or link text).

  _Example usage:_

  - _Open_

  ```
  {{ flow(steps=["Open"]) }}
  ```

  Generates the following HTML:

  ```html
  <span class='ui-flow'>Open</span>
  ```

  - _File_ -> _Save_

  ```
  {{ flow(steps=["File", "Save"]) }}
  ```

  Generates the following HTML:

  ```html
  <span class='ui-flow'>File</span> &rarr; <span class='ui-flow'>Save</span>
  ```

- __`kbd`__

  This shortcode is used to represent keyboard shortcuts.

  _Example usage:_

  - _Esc_

  ```
  {{ kbd(keys=["Esc"]) }}
  ```

  Generates the following HTML:

  ```html
  <kbd class='key'>Esc</kbd>
  ```

  - _Ctrl_ + _C_

  ```
  {{ kbd(keys=["Ctrl", "C"]) }}
  ```

  Generates the following HTML:

  ```html
  <kbd><kbd class='key'>Ctrl</kbd>&nbsp;+&nbsp<kbd class='key'>C</kbd></kbd>
  ```

  - _Esc_ -> _W_ -> _Q_ -> _Enter_

  ```
  {{ kbd(keys=["Esc", "W", "Q", "Enter"], separator="&rarr;") }}
  ```

  Generates the following HTML:

  ```html
  <kbd><kbd class='key'>Esc</kbd>&nbsp;&rarr;&nbsp<kbd class='key'>W</kbd>&nbsp;&rarr;&nbsp<kbd class='key'>Q</kbd>&nbsp;&rarr;&nbsp<kbd class='key'>Enter</kbd></kbd>
  ```
