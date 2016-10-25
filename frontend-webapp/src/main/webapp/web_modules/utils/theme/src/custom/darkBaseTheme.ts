// Default theme
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"
import { merge } from "lodash"
import { red900, white } from "material-ui/styles/colors"
const backgroundColor = "#2a2a2a"
export default merge({}, darkBaseTheme, {
  palette: {
    errorColor: red900
  },
  toolbar: {
    backgroundColor: backgroundColor,
  },
  toolbarTitle: {
    color: white
  },
  linkWithoutDecoration: {
    textDecoration: "blink",
    color: white
  },
  adminApp: {
    loginForm: {
      backgroundColor: "transparent",
      backgroundImage: "url('/img/background.jpg')"
    }
  }
})
