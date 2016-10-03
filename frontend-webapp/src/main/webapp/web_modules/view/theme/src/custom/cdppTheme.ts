import { merge } from "lodash"
import {
  lightGreen500,
  lightGreen700,
  grey300,
  grey700,
  blueGrey800,
  brown50,
  amber50,
  deepOrange900,
  blueGrey900,
  cyan500,
  darkBlack,
  brown900,
  red900
} from "material-ui/styles/colors"
import { fade } from "material-ui/utils/colorManipulator"
import spacing from "material-ui/styles/spacing"
// http://www.material-ui.com/#/customization/colors

/**
 * You can redefine here some spacing
 * @see 'material-ui/styles/spacing' source code for a list of available properties
 */
const customSpacing = merge({}, spacing, {
  desktopGutter: 50,
  desktopDropDownMenuItemHeight: 10,
  desktopDropDownMenuFontSize: 20,
})

/**
 *  Custom theme for cdpp project.
 *  Only provide the keys you wish to customize, they will be merged to default
 *  theme variables when calling 'material-ui/styles/getMuiTheme'
 */
export default {
  appBar: {
    height: 100
  },
  spacing: customSpacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen700,
    primary3Color: grey300,
    accent1Color: deepOrange900,
    accent2Color: grey300,
    accent3Color: grey700,
    textColor: blueGrey800,
    secondaryTextColor: fade(blueGrey800, 0.54),
    alternateTextColor: brown50,
    canvasColor: amber50,
    borderColor: grey300,
    disabledColor: fade(brown900, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: blueGrey900,
    errorColor: red900
  },
  linkWithoutDecoration: {
    textDecoration: "blink"
  },
  adminApp: {
    loginForm: {
      backgroundColor: grey700
    },
    layout: {
      backgroundColor: "transparent",
      backgroundImage: "url('/img/background.jpg')",
    }
  }
}
