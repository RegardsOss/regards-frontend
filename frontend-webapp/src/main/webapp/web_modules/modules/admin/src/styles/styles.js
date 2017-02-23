/**
 * LICENSE_PLACEHOLDER
 */
import { grey100, indigo500, white, purple300, green300, yellow300, brown50, lightBlue200 } from 'material-ui/styles/colors'

const styles = theme => ({
  drawer: {
    width: '100%',
  },
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
    link: {
      textDecoration: 'blink',
    },
    linkWithoutDecoration: {
      textDecoration: 'blink',
    },
  },
  adminApp: {
    loginForm: {
      layout: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      },
      action: {
        display: 'flex',
        justifyContent: 'center',
      },
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
        classes: ['col-sm-75', 'col-sm-offset-1'],
        styles: {
          marginTop: '10px',
        },
      },
      sidebarContainer: {
        classes: ['col-sm-22', 'col-sm-offset-1'],
        styles: {
          position: 'relative',
          marginTop: '10px',
        },
      },
    },
    datamanagement: {
      home: {
        section1: {
          container: {
            classes: ['row'],
            styles: {},
          },
          items: {
            classes: ['col-xs-50', 'col-sm-40', 'col-lg-33'],
            styles: {
              padding: '10px 0',
              textAlign: 'center',
              marginBottom: '30px',
            },
          },
        },
        action: {
          classes: ['row'],
          styles: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          },
        },
      },
    },
    roleResourceAccessOverview: {
      listItem: {
        paddingLeft: '100px',
      },
      listItemOdd: {
        backgroundColor: brown50,
      },
      chipListItem: {
        margin: 4,
      },
      wrapperChipList: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      getChip: {
        backgroundColor: lightBlue200,
      },
      putChip: {
        backgroundColor: yellow300,
      },
      deleteChip: {
        backgroundColor: green300,
      },
      postChip: {
        backgroundColor: purple300,
      },
      description: {
        style: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textoverflow: 'ellipsis',
        },
        class: 'col-sm-75',
      },
    },
  },
})

export default styles
