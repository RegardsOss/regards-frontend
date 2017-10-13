## Description

This tool is made to sipmlify the use of global [Material-ui](http://www.material-ui.com/#/components/app-bar){:target="_blank"}
 themes for all REGARDS frontend react components. It is made as a React component and more precisly as a "Provider". 
 A React provider is a React component create to pass through parameters and arguments to other React component.

```javascript
render {
	<ThemeProvider>
		<ReactCompoent/>
		...
	</ThemeProvider>
}
```

The REGARDS `ThemeProvider` can be found in the `@regardsoss/theme` package (web_modules/utils/theme).

# Dependencies

To use the REGARDS `ThemeProvider` you must add the here under package to your package.json dependencies :
 - @regardsoss/theme

## How to

### ThemeProvider

To use the REGARDS `ThemeProvider` you need to surround your component that needs to use the current global theme.  
 
Example :

```javascript
import { ThemeProvider } from '@regardsoss/theme'

export class ExmapleContainer extends React.Component {

	render() {
		return (
			<ThemeProvider>
				<ExampleComponent />
			</ThemeProvider>
		)
	}
}
```

After that, all the material ui widget used in the surrounded react components use the current configured theme.  

Note : The 3 main entry points of the application, define a `ThemeProvider` arroud the whole application. So normally you never need
to define your own.

### Get properties from the current theme

To construct your own styles from the current common theme you can use the current theme defined in the context of all react components 
surrounded by the `ThemeProvider`.

The `themeContextType` can be found from the `regardsoss/theme` package and allow you to access : 
 - this.context.muiTheme : Material-ui current selected theme global configuration.

Example : 

```javascript
import { themeContextType } from '@regardsoss/theme'

export class ExmapleComponent extends React.Component {

	static contextTypes = {
    	...themeContextType,
  	}

	render() {
		const mainColor = this.context.muiTheme.palette.priamy1Color
		...
	}
}

```