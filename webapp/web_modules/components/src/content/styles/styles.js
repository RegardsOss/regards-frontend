/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
* Styles for file content components
* @param theme
* @author Raphaël Mechali
*/
const styles = (theme) => ({
  subSection: {
    sectionStyle: {
      border: '1px solid',
      borderRadius: '5px',
      padding: '15px',
      marginRight: '5px',
      borderColor: theme.palette.primary1Color,
    },
    titleStyle: {
      borderBottom: '1px solid',
      fontSize: '1.1em',
      marginBottom: '15px',
      paddingBottom: '4px',
      color: theme.palette.textColor,
      borderBottomColor: theme.palette.primary1Color,
    },
    pointerStyle: {
      border: 'solid 10px transparent',
      width: '10px',
      marginTop: '-20px',
      borderBottomColor: theme.palette.primary1Color,
    },
  },
  loading: {
    container: {
      ...theme.components.loadingContent.container,
      flexGrow: 1,
      flexShrink: 1,
    },
    circle: theme.components.loadingContent.circle,
    message: theme.components.loadingContent.message,
  },
  noContent: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: theme.components.noData.minHeight,
      flexGrow: 1,
      flexShrink: 1,
    },
    iconStyle: {
      width: theme.components.noData.icon.size,
      height: theme.components.noData.icon.size,
      opacity: theme.components.noData.icon.opacity,
    },
    titleWrapper: {
      maxWidth: theme.components.noData.maxWidth,
      marginTop: theme.components.noData.title.marginTop,
      color: theme.components.noData.title.color,
      fontSize: theme.components.noData.title.fontSize,
    },
    messageWrapper: {
      maxWidth: theme.components.noData.maxWidth,
      marginTop: theme.components.noData.text.marginTop,
      color: theme.components.noData.text.color,
      fontSize: theme.components.noData.text.fontSize,
      textAlign: theme.components.noData.text.textAlign,
    },
    actionWrapper: {},
  },
  fileContent: {
    statusContainer: { // style to use as root for every status display (allow them growing using the default styles)
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      alignItems: 'strech',
    },
    image: {
      container: {
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      img: {
        flexGrow: 0,
        flexShrink: 1,
        maxWidth: '100%',
        maxHeight: '100%',
      },
    },
    iFrame: {
      background: theme.components.filePreview.iFrameBackground,
    },
    markdown: {
      scrollbarStyle: {
        background: theme.components.filePreview.markdownScrollbarColor,
        borderRadius: '3px',
        width: '6px',
      },
      scrollableContent: {
        // span all size
        minHeight: '100%',
        width: '100%',
        // this trick allows filling the whole page background (as markdown component itself refuses changing size)
        // color matches github-markdown-styles.css.markdown-body.background
        background: 'white',
      },
    },
  },
})

export default styles
