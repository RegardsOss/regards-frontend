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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import messages from '../../../i18n'
import ShowDatedItemSelectionDetailComponent from '../../../components/user/options/ShowDatedItemSelectionDetailComponent'
import { moduleDialogActions } from '../../../model/ModuleDialogActions'

/**
* Container for dated item selection detail display
* @author Raphaël Mechali
*/
export class ShowDatedItemSelectionDetailContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { datasetLabel, date, selectionRequest }) {
    return {
      dispatchShowDetail: () => dispatch(moduleDialogActions.showDetail(datasetLabel, date, selectionRequest)),
    }
  }

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    datasetLabel: PropTypes.string.isRequired, // used only in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    date: PropTypes.string.isRequired, // used only in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    selectionRequest: OrderShapes.BasketSelelectionRequest.isRequired, // used only in mapDispatchToProps
    // from mapDispatchToProps
    dispatchShowDetail: PropTypes.func.isRequired,
  }

  render() {
    const { disabled, dispatchShowDetail } = this.props
    return (
      <ShowDatedItemSelectionDetailComponent disabled={disabled} onShowDetail={dispatchShowDetail} />
    )
  }
}
export default compose(
  connect(null, ShowDatedItemSelectionDetailContainer.mapDispatchToProps),
  withI18n(messages),
)(ShowDatedItemSelectionDetailContainer)
