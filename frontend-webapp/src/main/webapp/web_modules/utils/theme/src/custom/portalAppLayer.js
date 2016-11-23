import { grey100, indigo500, white } from 'material-ui/styles/colors'

export default {
  menu: {
    bar: {
      backgroundColor: indigo500,
      titleFontSize: 23,
      height: 50,
    },
    title: {
      color: grey100,
      marginLeft: '40px',
    },
    classes: ['col-sm-98', 'col-sm-offset-1'],
    localeDropdown: {
      color: white,
    },
  },
  portalApp: {
    loginForm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    layout: {
      app: {
        classes: [],
        styles: {
          backgroundColor: 'transparent',
          background: "url('/img/background.jpg') top right no-repeat",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          minHeight: '100vh',
          paddingTop: '10px',
          paddingRight: '1px', // Quick fix for bootstrap grid .row
        },
      },
      bodyContainer: {
        classes: ['row'],
        styles: {},
      },
      contentContainer: {
        classes: ['col-sm-98', 'col-sm-offset-1'],
        styles: {
          marginTop: '10px',
        },
      },
    },
    homepage: {
      splitNews: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      betweenProjects: {
        marginTop: '10px',
        marginBottom: '10px',
      },
    },
  },
}
