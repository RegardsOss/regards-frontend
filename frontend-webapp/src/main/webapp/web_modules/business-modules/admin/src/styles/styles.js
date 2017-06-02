/**
 * LICENSE_PLACEHOLDER
 */
import {
  grey100,
  indigo500,
  white,
  purple300,
  green300,
  yellow300,
  brown50,
  lightBlue200,
} from 'material-ui/styles/colors'

const styles = (theme) => {
  let background = theme ? theme.palette.canvasColor : 'transparent'
  background = theme && theme.palette.backgroundImage ? `url('${theme.palette.backgroundImage}') no-repeat fixed center center` : background
  return {
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
      classes: [],
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
            background,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            position: 'absolute',
            width: '100%',
          },
        },
        bodyContainer: {
          classes: [],
          styles: {},
        },
        contentContainer: {
          classes: ['col-xs-100', 'col-sm-68', 'col-md-75', 'col-lg-78'],
          styles: {
            padding: '10px',
          },
        },
        sidebarContainer: {
          classes: ['col-xs-100', 'col-sm-32', 'col-md-25', 'col-lg-22'],
          styles: {
            position: 'relative',
            marginTop: 10,
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
  }
}

export default styles
