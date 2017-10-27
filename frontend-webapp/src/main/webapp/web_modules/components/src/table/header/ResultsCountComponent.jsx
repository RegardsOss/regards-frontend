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
import { themeContextType } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import moduleStyles from '../styles/styles'
import messages from '../i18n'

/**
 * Displays the search results count
 *
 * @author Xavier-Alexandre Brochard
 */
const ResultsCountComponent = ({ resultsCount }, { muiTheme, intl: { formatMessage } }) => {
  const styles = moduleStyles(muiTheme)
  return (
    <div style={styles.header.text.styles}>
      {formatMessage({ id: 'table.results.count' }, { count: resultsCount || '0' })}
    </div>
  )
}

ResultsCountComponent.propTypes = {
  resultsCount: PropTypes.number,
}

ResultsCountComponent.contextTypes = {
  ...themeContextType,
  ...i18nContextType,
}

export default withI18n(messages)(ResultsCountComponent)
