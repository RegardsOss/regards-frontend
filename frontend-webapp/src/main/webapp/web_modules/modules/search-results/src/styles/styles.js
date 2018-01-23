/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/

/**
 * Styles for module
 * @author Sébastien binda
 */
const styles = theme => ({
  configuration: {
    topOptions: {
      styles: {
        padding: '0 0 15px 15px',
      },
    },
  },
  user: {
    viewModeButton: {
      minWidth: theme.button.iconButtonSize,
    },
    filters: {
      style: {
        margin: '0 5px',
      },
    },
    listViewStyles: {
      rootStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
      },
      title: {
        rootStyles: {
          padding: '5px 5px 5px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        labelGroup: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        },
        checkboxStyles: {
          margin: '2px 0 0 0',
          width: 'auto',
        },
        labelStyles: {
          fontSize: '1.3em',
          textTransform: 'none',
          paddingLeft: 8,
          paddingRight: 10,
          color: theme.palette.textColor,
        },
        optionsBarHorizontalStyles: {
          display: 'flex',
        },
        optionsBarVerticalStyles: {
          display: 'flex',
          flexDirection: 'column',
        },
        option: {
          buttonStyles: {
            width: 32,
            height: 32,
            padding: 4,
          },
          iconStyles: {
            width: 24,
            height: 24,
          },
        },
      },
      attributesStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
      labelColumnStyles: {
        margin: '10px 0 5px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexGrow: 0,
        flexShrink: 0,
      },
      labelCellStyle: {
        color: theme.palette.accent1Color,
        margin: '5px 0 0 0',
      },
      valueColumnStyles: {
        margin: '10px 0 5px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexBasis: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexGrow: 1,
        flexShrink: 1,
      },
      valueCellStyle: { // for groups
        margin: '5px 0 0 0',
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: '100%', // required to diminish contained cells width (text 'pushes' column width otherwise)
      },
      thumbnailColumnStyle: {
        width: '110px',
        display: 'block',
        padding: '5px 0px 10px 10px',
      },
    },
    galleryViewStyles: {
      descriptionContainer: {
        padding: '0 5px',
      },
    },
  },
})

export default styles
