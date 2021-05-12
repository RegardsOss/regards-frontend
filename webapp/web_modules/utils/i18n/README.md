## Description

This tool is made to sipmlify the internationalization of all messages in the REGARDS frontend. It is made as a React component and more precisly as a "Provider". A React provider is a React component create to pass through parameters and arguments to other React component.

```javascript
render {
	<Provider>
		<ReactCompoent/>
		...
	</Provider>
}
```

The REGARDS internationalization provider is made using the [react-intl](https://github.com/yahoo/react-intl){:target="_blank"} librabry.

The REGARDS `I18nProvider` can be found in the `@regardsoss/i18n` package (web_modules/utils/i18n).

## Dependencies

To use the REGARDS `I18nProvider` you must add the here under package to your package.json dependencies :
 - @regardsoss/i18n
 - react-intl

## How to

### I18nProvider

To use the REGARDS I18nProvider you need to surround your component that needs internationalization with the I18nProvider.  
The `I18nProvider` only needs one parameter :
 - **messages** : messages object, containing one field for each locale language then i18n keys and values 
 
Example :

```javascript
import { I18nProvider } from '@regardsoss/i18n'
import messages from '../i18n'

export class ExmapleContainer extends React.Component {

	render() {
		return (
			<I18nProvider messages={messages}>
				<ExampleComponent />
			</I18nProvider>
		)
	}
}
```

After that, there is two ways to get internationalized messages : 
 - Using the `formatMessage` method. This way is used when you need to construct your message out of the html renderer.
 - Using the `FormattedMessage` component. This way is used when you display your message directly into the html renderer.
 
**Note :** To use the `formatMessage` method of the [react-intl](https://github.com/yahoo/react-intl){:target="_blank"} library,
you need to define the react component context with the react-intl properties. To do so, you can use the `i18nContextType` 
of the `@regardsoss/i18n` package.

```javascript
import { i18nContextType } from '@regardsoss/i18n'


export class ExmapleComponent extends React.Component {

	static contextTypes = {
    	...i18nContextType,
  	}

	render() {
		const internationalizedMessage = this.context.intl.formatMessage({ id: 'example.message' })
		return (
			<div>
				<span>{internationalizedMessage}</span>
				{formatMessage({ id: "example.message" })}
			</div>
		)
	}
}

```
### I18n messages files

As explained in the previous section, the `I18nProvider' component use only one parameter that is the directory containing the internationalized messages files.  
Those files must be named with the here under syntaxe :  
messages.<**language**>.i18n.js  
Where languga can be :
 - fr : French
 - en : English

Example for a messages.en.i18n.js :

```javascript

import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'example.message' : 'Example message to display',
  'other.example.message' : 'Other example message to display'
}, Locales.en);

```

Example for a messages.fr.i18n.js :

```javascript

import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'example.message' : 'Message d\'exemple à afficher',
  'other.example.message' : 'Un autre message d\'exemple à afficher'
}, Locales.en);

```

### Use parameter in messages

With the reac-intl library, it is possible to use parameters in internationalizzed message.  
To do so you : 

in your message file define a message with a parameter : 

```javascript
'example.message.with.parameter': 'Hello {name} ?'
```

in your component (surrounded) by the `I18nProvider` :

```javascript
	static contextTypes = {
    	...i18nContextType,
  	}
  	
	render() {
		const name = 'jhon'
		const message = this.context.intl.formatMessage({ id: 'example.message.with.parameter' }, { name })
		return (
			<div>
				<span>{message}</span>
				formatMessage({ id: AAA }) 
					id="example.message.with.parameter"
					values={{name: name}} 
				/>
			</div>
		)
	}

```

### More informations

As the REGARDS I18nProvider is used only to provide messages to the [react-intl](https://github.com/yahoo/react-intl){:target="_blank"} library all
components surrounded by `I18nProvider` can use all [react-intl](https://github.com/yahoo/react-intl){:target="_blank"} functionalities.  So, you can refer to the official documentation to see more functioanlities like `Date internationalization` or `HTML display`.

