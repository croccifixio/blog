{% set len = keys | length %}
{% set output = "" %}

{% if len > 1 %}
  {% set output = output ~ "<kbd>" %}
{% endif %}

{% for key in keys %}
  {% if loop.index > 1 %}
    {% set_global output = output ~ "&nbsp;" %}
    {% if separator %}
      {% set_global output = output ~ separator %}
    {% else %}
      {% set_global output = output ~ "+" %}
    {% endif %}
    {% set_global output = output ~ "&nbsp;" %}
  {% endif %}
  {% set_global output = output ~ "<kbd class='key'>" ~ key ~ "</kbd>" %}
{% endfor %}

{% if len > 1 %}
  {% set output = output ~ "</kbd>" %}
{% endif %}

{{ output }}
