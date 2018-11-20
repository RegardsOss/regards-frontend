# Two numerical criteria

## Description

This package is a REGARDS criterion plugin. It can be used, with other criterion plugins, to configure a search form module, allowing to search and display DATA in REGARDS user interface.

## Plugin specificities

The two numerical criteria plugin works with a single attribute or two different attributes, according with its configuration (see sections below).  
It requires two numerical types attributes configured.

### Single attribute

When both configured attributes are the same attribute, the criterion let user specifying an inclusive number range. Therefore comparison operators selection is not available in that mode.

### Two attributes

When both configured attributes are different attributes, user can select an operator and a value for each attribute.
The available operators are:
* **≥**
* **≤**
* **=** (Only for integer type attributes)  

## About

You can read more about plugins development and use on [REGARDS documentation website](https://regardsoss.github.io/frontend/plugins/plugins/#section=frontend)
