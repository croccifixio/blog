{% if path is starting_with("./") %}
  {% set content_dir = page.relative_path | split(pat="/") | nth(n=0) %}
  {% set file_name = path | split(pat="/") | nth(n=1) %}
  {% set full_path = ["content", content_dir, file_name] | join(sep="/") %}
{% else %}
  {% set full_path = path %}
{% endif %}

{% set meta = get_image_metadata(path=full_path) %}
{% set width_2x = meta.width %}
{% set width_1x = meta.width / 2 | round() | int() %}
{% set webp_2x = resize_image(path=full_path, op="fit", height=9999, width=width_2x, quality=90, format="webp") %}
{% set webp_1x = resize_image(path=full_path, op="fit", height=9999, width=width_1x, quality=90, format="webp") %}
{% set image_2x = resize_image(path=full_path, op="fit", height=9999, width=width_2x, quality=75) %}
{% set image_1x = resize_image(path=full_path, op="fit", height=9999, width=width_1x, quality=75) %}

<picture>
  <source
    srcset="{{ webp_2x.url }} 2x, {{ webp_1x.url }} 1x"
    type="image/webp"
  >
  <img
    alt="{{ alt }}"
    src="{{ image_2x.url }}"
    srcset="{{ image_2x.url }} 2x, {{ image_1x.url }} 1x"
    width="{{ width_1x }}"
  >
</picture>
