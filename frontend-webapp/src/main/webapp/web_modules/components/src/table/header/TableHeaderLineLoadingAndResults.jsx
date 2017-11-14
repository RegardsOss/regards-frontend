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
import TableHeaderLine from './TableHeaderLine'
import TableHeaderContentBox from './TableHeaderContentBox'
import ResultsCountMessage from './ResultsCountMessage'
import TableHeaderLoadingComponent from './TableHeaderLoadingComponent'

/**
 * Displays results, loading, and any custom child in the right area.
 * Note: custom children will lose their i18n context and styles context in this component
 */
class TableHeaderLineLoadingAndResults extends React.Component {

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

  static LOADING_COMPONENT = <TableHeaderLoadingComponent />


  render() {
    const { children = null, isFetching, resultsCount } = this.props
    return (
      <TableHeaderLine>
        {/* results count group */}
        <TableHeaderContentBox>
          <ResultsCountMessage count={resultsCount} isFetching={isFetching} />
        </TableHeaderContentBox>
        { // loading or custom childrens groups
          isFetching ? TableHeaderLineLoadingAndResults.LOADING_COMPONENT : children
        }
        {/* On right: placeholder */}
        <div />
      </TableHeaderLine >
    )
  }


}


export default TableHeaderLineLoadingAndResults
