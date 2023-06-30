/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
  if (theme && theme.palette.background && theme.palette.background !== '') {
    // eslint-disable-next-line prefer-destructuring
    background = theme.palette.background
  } else {
    background = theme && theme.palette.backgroundImage ? `url('${theme.palette.backgroundImage}') no-repeat center center` : background
  }
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
          background,
          backgroundSize: 'cover',
          minHeight: '100vh',
          position: 'absolute',
          width: '100%',
        },
        contentContainer: {
          classes: 'col-xs-100 col-sm-68 col-md-76 col-lg-80',
          styles: {
            padding: '10px',
          },
        },
        sidebarContainer: {
          classes: ['col-xs-100', 'col-sm-32', 'col-md-24', 'col-lg-20'],
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
