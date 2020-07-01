/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const projectsStyles = (theme) => (
  {
    titleListProjects: {
      lineHeight: '60px',
      fontSize: '37px',
      textAlign: 'center',
      textTransform: 'uppercase',
      color: theme.palette.backgroundTextColor,
      fontWeight: 300,
      letterSpacing: '6.3px',
      fontFamily: theme.fontFamily,
      textDecoration: 'underline',
      marginTop: '40px',
      marginBottom: '30px',
    },
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
      height: '80px',
      width: '80px',
    },
    iconDisabled: {
      height: '80px',
      width: '80px',
      filter: 'grayscale(100%)',
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
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
      backgroundColor: theme.palette.disablePanelColor,
    },
    betweenProjects: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    linkWithoutDecoration: {
      textDecoration: 'blink',
    },
  })

export default projectsStyles
