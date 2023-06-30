/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { IngestShapes } from '@regardsoss/shape'
import { IngestDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import HeaderActionsBarComponent from '../components/HeaderActionsBarComponent'
import clientByPane from '../domain/ClientByPane'

/**
 * @author Théo Lasserre
 */
export class HeaderActionsBarContainer extends React.Component {
  static propTypes = {
    paneType: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,
    onModify: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onSelectVersionOption: PropTypes.func,
    onAbort: PropTypes.func,
    onRetry: PropTypes.func,

    // from mapStateToProps
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      tableSelection: clientByPane[ownProps.paneType].tableSelectors.getToggledElementsAsList(state),
      selectionMode: clientByPane[ownProps.paneType].tableSelectors.getSelectionMode(state),
      areAllSelected: clientByPane[ownProps.paneType].tableSelectors.areAllSelected(state, clientByPane[ownProps.paneType].selectors),
    }
  }

  render() {
    const {
      tableSelection, selectionMode, areAllSelected,
      onModify, onDelete, paneType,
      onSelectVersionOption, onAbort,
      onRetry,
    } = this.props
    return (
      <HeaderActionsBarComponent
        areAllSelected={areAllSelected}
        selectionMode={selectionMode}
        tableSelection={tableSelection}
        onModify={onModify}
        onRetry={onRetry}
        onDelete={onDelete}
        onAbort={onAbort}
        onSelectVersionOption={onSelectVersionOption}
        paneType={paneType}
      />
    )
  }
}
export default connect(
  HeaderActionsBarContainer.mapStateToProps,
  null)(HeaderActionsBarContainer)
