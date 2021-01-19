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
 */

/**
 * @author Sébastien Binda
 */
const storageManagementStyles = (theme) => ({
  rootStyle: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    padding: '0 15px 0 20px',
  },
  labelStyle: {
    padding: theme.module.description.attributeLabelPadding,
    textDecoration: theme.module.description.attributeLabelTextDecoration,
    justifySelf: 'left',
    lineHeight: 1,
  },
  valueStyle: {
    padding: theme.module.description.attributeValuesPadding,
    textDecoration: theme.module.description.attributeValuesTextDecoration,
    justifySelf: 'stretch',
    minWidth: 0,
    lineHeight: 1,
  },
  cardTextTabStyle: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
})

export default storageManagementStyles
