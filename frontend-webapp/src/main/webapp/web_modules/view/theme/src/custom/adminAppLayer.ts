// Default theme

import { grey100, indigo500 } from "material-ui/styles/colors"
export default {
  // Reset some part of the material-ui framework
  drawer: {
    width: "100%"
  },
  toolbar: {
    backgroundColor: indigo500,
    titleFontSize: 23,
    height: 50
  },
  toolbarTitle: {
    color: grey100,
    marginLeft: "40px"
  },
  adminApp: {
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
        classes: ["col-sm-75", "col-sm-offset-1"],
        styles: {
          marginTop: "10px"
        }
      },
      sidebarContainer: {
        classes: ["col-sm-22", "col-sm-offset-1"],
        styles: {
          position: "relative",
          marginTop: "10px"
        }
      },
    },
    datamanagement: {
      home: {
        section1: {
          container: {
            classes: ["row"],
            styles: {}
          },
          items: {
            classes: ["col-xs-50", "col-sm-40", "col-lg-33"],
            styles: {
              padding: "10px 0",
              textAlign: "center",
              marginBottom: "30px"
            }
          },
        },
        action: {
          classes: ["row"],
          styles: {
            display: "flex",
            justifyContent: "center",
            marginTop: "30px"
          }
        }
      }
    }
  }
}
