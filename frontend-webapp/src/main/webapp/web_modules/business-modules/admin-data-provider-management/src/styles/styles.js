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
 */
const styles = theme => ({
  pluginStyles: {
    display: 'flex',
    alignItems: 'baseline',
  },
  avatarStyles: {
    marginRight: 10,
  },
  metafiles: {
    layoutStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.borderColor,
    },
    titleStyle: {
      width: '100%',
    },
    contentStyle: {
      display: 'flex',
      flexDirection: 'row',
      height: '450px',
      width: '100%',
    },
    leftColumnStyle: {
      width: '18%',
      borderRight: '1px solid',
      borderColor: theme.palette.borderColor,
    },
    rightColumnStyle: {
      width: '82%',
      overflow: 'auto',
      margin: '0px 15px',
    },
    typeListStyle: {
      height: '415px',
      overflow: 'auto',
    },
  },
  monitoring: {
    totalStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      color: theme['forms-extension:validation'].validColor,
      cursor: 'pointer',
    },
    errorStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      borderLeft: `1px solid ${theme.palette.borderColor}`,
      paddingLeft: '4px',
      marginLeft: '4px',
      color: theme['forms-extension:validation'].errorColor,
      cursor: 'pointer',
    },
    inProgressStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      borderLeft: `1px solid ${theme.palette.borderColor}`,
      paddingLeft: '4px',
      marginLeft: '4px',
      color: theme['forms-extension:validation'].warningColor,
      cursor: 'pointer',
    },
    filters: {
      fieldStyle: {
        width: '210px',
        margin: '0px 10px',
      },
    },
    productSessionLink: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    chainJobs: {
      descriptionStyle: {
        marginBottom: '20px',
      },
      jobActivityStyle: {
        margin: '10px 0px',
      },
    },
  },
})

export default styles
