# Two temporal criteria

## Description

This package is a REGARDS criterion plugin. It can be used, with other criterion plugins, to configure a search form module, allowing to search and display DATA in REGARDS user interface.

## Plugin specificities

The two temporal criteria plugin works with a single attribute or two different attributes, according with its configuration (see sections below).  
It requires two date types attributes configured.

### Single attribute

When both configured attributes are the same attribute, the criterion let user specifying an inclusive date range for that attribute.

### Two attributes

When both configured attributes are different attributes, the criterion let user select a date range [**D1**; **D2**] for attributes [T1; T2].  
The results will then have to respect the following conditions: **T2 ≥ D1 AND T1 ≤ D2**. That mechanism allows searching period ranges.

## About

You can read more about plugins development and use on [REGARDS documentation website](https://regardsoss.github.io/frontend/plugins/plugins/#section=frontend)
