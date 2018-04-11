## Description

This module provides tools to simplify plugins writing. It provides tools to initilize it and abstract plugin component to easily connect a plugin

# Dependencies

To use the REGARDS `plugins-api` you must add the here under package to your package.json dependencies :
 - @regardsoss/plugins-api

## How to

### Initialize a plugin

```javascript
// in main.js of the plugin / service (or the file reference)
import MyRootContainer from './containers/MyRootContainer'
import { initPlugin } from '@regardsoss/plugins-api'
import messages from './i18n/messages'
import pluginInfo from './plugin-info.json'
import reducer from './model/pluginReducer'

initPlugin(MyRootContainer, reducer, messages, pluginInfo)

```

### Extends default plugin