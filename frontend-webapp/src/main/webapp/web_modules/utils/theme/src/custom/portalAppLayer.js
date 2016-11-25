import { grey100, grey200, indigo500, white } from 'material-ui/styles/colors'

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
  newsStyle: {
    text: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxHeight: '4.8em',
      lineHeight: '1.6em',
      textAlign: 'justify',
    },
    title: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    rootTitle: {
      paddingBottom: '0',
    },
    icon: {
      height: '100px',
      width: '100px',
    },
    iconDisabled: {
      height: '100px',
      width: '100px',
      filter: 'grayscale(100%)',
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
// Bootstrap columns with the same height using flex
// http://stackoverflow.com/a/19695851/2294168
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    descriptionContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    lock: {
      position: 'absolute',
      bottom: '45%',
      right: '45%',
    },
    iconLock: {
      height: 60,
      width: 60,
    },
    cardWhenDisabled: {
      backgroundColor: grey200,
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
