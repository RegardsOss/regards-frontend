/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import values from 'lodash/values'
import compose from 'lodash/fp/compose'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import AIPSessionListComponent from '../../components/session/AIPSessionListComponent'
import { aipSessionActions, aipSessionSelectors } from '../../clients/AIPSessionClient'
import { aipSessionClearActions } from '../../clients/AIPSessionClearClient'
import messages from '../../i18n'
import styles from '../../styles'


/**
 * Displays the selection of session in order to list AIPs
 * @author Léo Mieulet
 */
export class AIPSessionListContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      meta: aipSessionSelectors.getMetaData(state),
      entitiesLoading: aipSessionSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    deleteAips: session => dispatch(aipSessionClearActions.deleteEntity(session.id)),
    fetchPage: (pageIndex, pageSize, queryParams) => dispatch(aipSessionActions.fetchPagedEntityList(pageIndex, pageSize, {}, queryParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aipId: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    deleteAips: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  state = {
    initialFilters: {},
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    fetchPage(0, AIPSessionListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  handleOpen = (session, isError = false) => {
    const { params: { project } } = this.props
    const encodedSessionName = encodeURIComponent(session)
    const url = `/admin/${project}/data/acquisition/storage/aip/${encodedSessionName}/list${isError ? '?state=STORAGE_ERROR' : ''}`
    browserHistory.push(url)
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ initialFilters: query })
    }
  }

  render() {
    const {
      meta, deleteAips, fetchPage, entitiesLoading,
    } = this.props
    const { initialFilters } = this.state
    return (
      <AIPSessionListComponent
        pageSize={AIPSessionListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        handleOpen={this.handleOpen}
        onBack={this.onBack}
        onRefresh={this.onRefresh}
        entitiesLoading={entitiesLoading}
        deleteAips={deleteAips}
        fetchPage={fetchPage}
        initialFilters={initialFilters}
      />
    )
  }
}

export default compose(
  connect(AIPSessionListContainer.mapStateToProps, AIPSessionListContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(AIPSessionListContainer)
