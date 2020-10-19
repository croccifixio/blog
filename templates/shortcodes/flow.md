{% set len = steps | length %}
{% set output = "" %}

{% for step in steps %}
  {% if loop.index > 1 %}
    {% set_global output = output ~ " &rarr; " %}
  {% endif %}
  {% set_global output = output ~ "<span class='ui-flow'>" ~ step ~ "</span>" %}
{% endfor %}

{{ output }}
