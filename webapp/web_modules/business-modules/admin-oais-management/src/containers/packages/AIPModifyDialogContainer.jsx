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
import { connect } from '@regardsoss/redux'

import AIPModifyDialogComponent from '../../components/packages/AIPModifyDialogComponent'
import { aipTagSearchActions, aipTagSearchSelectors } from '../../clients/AIPTagSearchClient'
import { aipStorageSearchActions, aipStorageSearchSelectors } from '../../clients/AIPStorageSearchClient'
import { aipCategorySearchActions, aipCategorySearchSelectors } from '../../clients/AIPCategorySearchClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
export class AIPModifyDialogContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      selectionStorages: aipStorageSearchSelectors.getArray(state),
      selectionTags: aipTagSearchSelectors.getArray(state),
      selectionCategories: aipCategorySearchSelectors.getArray(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in \the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchSelectionStorages: (bodyParams, pathParams) => dispatch(aipStorageSearchActions.fetchEntityListByPost(pathParams, null, bodyParams)),
    fetchSelectionTags: (bodyParams, pathParams) => dispatch(aipTagSearchActions.fetchEntityListByPost(pathParams, null, bodyParams)),
    fetchSelectionCategories: (bodyParams, pathParams) => dispatch(aipCategorySearchActions.fetchEntityListByPost(pathParams, null, bodyParams)),
  })

  static propTypes = {
    onConfirmModify: PropTypes.func.isRequired,
    contextRequestBodyParameters: OAISCriterionShape,
    onClose: PropTypes.func.isRequired,
    fetchSelectionStorages: PropTypes.func.isRequired,
    fetchSelectionTags: PropTypes.func.isRequired,
    fetchSelectionCategories: PropTypes.func.isRequired,
    selectionStorages: PropTypes.arrayOf(PropTypes.string),
    selectionTags: PropTypes.arrayOf(PropTypes.string),
    selectionCategories: PropTypes.arrayOf(PropTypes.string),
  }

  componentDidMount() {
    const {
      contextRequestBodyParameters,
      fetchSelectionStorages,
      fetchSelectionTags,
      fetchSelectionCategories,
    } = this.props
    fetchSelectionStorages(contextRequestBodyParameters)
    fetchSelectionTags(contextRequestBodyParameters)
    fetchSelectionCategories(contextRequestBodyParameters)
  }

  render() {
    const {
      onConfirmModify, onClose, selectionStorages, selectionTags, selectionCategories,
    } = this.props
    return (
      <AIPModifyDialogComponent
        onConfirmModify={onConfirmModify}
        onClose={onClose}
        selectionStorages={selectionStorages}
        selectionTags={selectionTags}
        selectionCategories={selectionCategories}
      />
    )
  }
}

export default connect(AIPModifyDialogContainer.mapStateToProps, AIPModifyDialogContainer.mapDispatchToProps)(AIPModifyDialogContainer)
