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
 **/
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { moduleDialogActions } from '../../../model/ModuleDialogActions'
import { moduleDialogSelectors } from '../../../model/ModuleDialogSelectors'
import SelectionItemDetailComponent from '../../../components/user/detail/SelectionItemDetailComponent'

/**
* Container to display a selection item detail (connects to store and provides properties to corresponding component)
* @author Raphaël Mechali
*/
export class SelectionItemDetailContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // returns detail state
      detail: moduleDialogSelectors.getDetail(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchHideDetail: () => dispatch(moduleDialogActions.hideDetail()),
    }
  }

  static propTypes = {
    showDatasets: PropTypes.bool.isRequired,
    // from mapStateToProps
    detail: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      date: PropTypes.string,
      datasetLabel: PropTypes.string,
      selectionRequest: OrderShapes.BasketSelelectionRequest,
    }).isRequired,
    // from mapDispatchToProps
    dispatchHideDetail: PropTypes.func.isRequired,
  }

  render() {
    const {
      showDatasets,
      detail: {
        visible, datasetLabel, date, selectionRequest,
      }, dispatchHideDetail,
    } = this.props
    return (
      <SelectionItemDetailComponent
        showDatasets={showDatasets}
        visible={visible}
        datasetLabel={datasetLabel}
        date={date}
        selectionRequest={selectionRequest}
        onClose={dispatchHideDetail}
      />
    )
  }
}
export default connect(
  SelectionItemDetailContainer.mapStateToProps,
  SelectionItemDetailContainer.mapDispatchToProps,
)(SelectionItemDetailContainer)
