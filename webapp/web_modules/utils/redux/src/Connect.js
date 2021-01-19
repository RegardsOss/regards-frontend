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
import { connect as reduxConnect } from 'react-redux'
import { getCurrentTheme } from '@regardsoss/theme'
import { i18nSelectors } from '@regardsoss/i18n'

/**
 * Merge the given mapStateToProps function to add the theme and i18n properties.
 * @param mapStateToProps
 * @author Sébastien Binda
 */
const mergeMapStateToProps = (mapStateToProps) => (
  (state, ownProps) => ({
    ...(mapStateToProps ? mapStateToProps(state, ownProps) : {}),
    theme: getCurrentTheme(state),
    i18n: i18nSelectors.getLocale(state),
  })
)

/**
 * Overrides connect from redux library. It is necessary to ensure that the connected react components are
 * refreshed when theme or i18n messages changed (redux blocks context updates otherwise).
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @author Sébastien Binda
 */
const connect = (mapStateToProps, mapDispatchToProps) => reduxConnect(mergeMapStateToProps(mapStateToProps), mapDispatchToProps)

export default connect
