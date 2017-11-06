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
import compose from 'lodash/fp/compose'
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import TableHeaderLine from './TableHeaderLine'
import TableHeaderText from './TableHeaderText'
import TableHeaderContentBox from './TableHeaderContentBox'
import ResultsCountMessage from './ResultsCountMessage'
import messages from '../i18n'
import styles from '../styles'

/**
 * Displays results, loading, and any custom child in the right area.
 * Note: custom children will lose their i18n context and styles context in this component
 */
export class TableHeaderLineLoadingAndResults extends React.Component {

  static propTypes = {
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    isFetching: false,
    resultsCount: 0,
    children: null,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { children = null, isFetching, resultsCount } = this.props
    const { intl: { formatMessage }, moduleTheme: { header } } = this.context
    return (
      <TableHeaderLine>
        {/* results count group */}
        <TableHeaderContentBox>
          <ResultsCountMessage count={resultsCount} isFetching={isFetching} />
        </TableHeaderContentBox>
        { // loading or custom childrens groups
          isFetching ? (
            <TableHeaderContentBox>
              <CircularProgress
                size={header.loading.size}
                thickness={header.loading.thickness}
                color={header.loading.color}
              />
              <TableHeaderText
                text={formatMessage({ id: 'table.loading.message' })}
              />
            </TableHeaderContentBox>) : children
        }
        {/* On right: placeholder */}
        <div />
      </TableHeaderLine >
    )
  }


}


export default compose(
  withI18n(messages),
  withModuleStyle(styles))(TableHeaderLineLoadingAndResults)
