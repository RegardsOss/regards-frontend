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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider, withI18n } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import compose from 'lodash/fp/compose'
import { withModuleStyle } from '@regardsoss/theme'
import { ProcessingShapes } from '@regardsoss/shape'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import messages from '../i18n'
import styles from '../styles'
import ProcessingListComponent from '../components/ProcessingListComponent'

/**
 * Processing list container
 * @author Théo Lasserre
 */
export class ProcessingListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    processingList: processingSelectors.getOrderedList(state),
  })

  /**
   * Redux: map to dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchProcessingList: (pathParams, queryParams) => dispatch(processingActions.fetchEntityList(pathParams, queryParams)),
    deleteProcessing: (businessId) => dispatch(processingActions.deleteEntity(businessId)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProp
    processingList: ProcessingShapes.ProcessingArray.isRequired,
    // from mapDispatchToProps
    fetchProcessingList: PropTypes.func.isRequired,
    deleteProcessing: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchProcessingList().then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  onRefresh = (filters) => {
    const { fetchProcessingList } = this.props
    return fetchProcessingList({}, filters)
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/commands/processing/create`
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/commands/board`
  }

  navigateToCreateProcessing = () => {
    browserHistory.push(this.getCreateUrl())
  }

  handleEdit = (businessId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/commands/processing/${businessId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (businessId) => this.props.deleteProcessing(businessId)

  render() {
    const { processingList } = this.props
    const { isLoading } = this.state

    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          <ProcessingListComponent
            processingList={processingList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackURL()}
            createUrl={this.getCreateUrl()}
            navigateToCreateProcessing={this.navigateToCreateProcessing}
            onRefresh={this.onRefresh}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default compose(
  connect(ProcessingListContainer.mapStateToProps, ProcessingListContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(ProcessingListContainer)
