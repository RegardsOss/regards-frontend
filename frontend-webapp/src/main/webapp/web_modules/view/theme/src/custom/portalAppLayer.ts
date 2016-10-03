// Default theme

import { grey100, indigo500 } from "material-ui/styles/colors"
export default {
  portalApp: {
    loginForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    },
    layout: {
      app: {
        classes: [],
        styles: {
          backgroundColor: "transparent",
          background: "url('/img/background.jpg') top right no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "10px",
          paddingRight: "1px", // Quick fix for bootstrap grid .row
        }
      },
      headContainer: {
        classes: ["col-sm-98", "col-sm-offset-1"],
        styles: {
          // See toolbar
        }
      },
      bodyContainer: {
        classes: ["row"],
        styles: {}
      },
      contentContainer: {
        classes: ["col-sm-98", "col-sm-offset-1"],
        styles: {
          marginTop: "10px"
        }
      }
    },
  }
}
