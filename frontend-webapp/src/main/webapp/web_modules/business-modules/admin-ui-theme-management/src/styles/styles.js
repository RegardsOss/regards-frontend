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
 * */
import typography from 'material-ui/styles/typography'

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = (theme) => {
  const styles = {
    fullWidth: {
      width: '100%',
    },
    theme: {
      activationToggle: {
        marginTop: 10,
        marginLeft: 20,
        maxWidth: 250,
      },
      mainWrapper: {
        // position: 'relative',
        // height: 880,
      },
      toolbar: {
        root: {
          backgroundColor: theme.palette.primary1Color,
        },
        title: {
          color: theme.palette.alternateTextColor,
        },
        icon: {
          color: theme.palette.alternateTextColor,
        },
        themeDropDownMenu: {
          style: {
            top: -4,
            left: -6,
          },
          labelStyle: {
            color: theme.palette.alternateTextColor,
            paddingLeft: 0,
            fontSize: theme.toolbar.titleFontSize,
            fontWeight: 'bold',
          },
        },
      },
      contentWrapper: {
        position: 'relative',
        height: 700,
        overflowY: 'auto',
      },
      form: {
        toggle: {
          marginTop: 30,
          width: 180,
        },
        actionsWrapper: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
    },
    showcase: {
      group: {
        float: 'left',
        width: '33%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        float: 'left',
        padding: '0 50px',
        boxSizing: 'border-box',
        marginTop: '0px',
        marginBottom: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
        marginBottom: '16px',
        minHeight: '24px',
      },
      datePicker: {
        width: '100%',
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      textfield: {
        width: '100%',
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
      },
      liveExamplePaper: {
        // marginBottom: 32,
        overflow: 'hidden',
      },
      bottomBorderWrapper: {
        paddingBottom: '10px',
      },
    },
  }
  return styles
}

export default formStyles
