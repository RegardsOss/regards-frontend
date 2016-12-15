/**
 * LICENSE_PLACEHOLDER
 */
import { grey100, grey200, indigo500, white } from 'material-ui/styles/colors'

/**
 * Portal application main layout configuration file
 */
export default {
  portalApp: {
    layout: {
      id: 'application',
      type: 'MainContainer',
      containers: [
        {
          id: 'header',
          type: 'RowContainer',
          modules: ['portal-menu'],
        },
        {
          id: 'news',
          type: 'RowContainer',
          modules: ['news'],
        },
        {
          id: 'projects',
          type: 'RowContainer',
          modules: ['portal-projects'],
        },
      ],
    },
    modules: {
      common: {
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
  },
}
