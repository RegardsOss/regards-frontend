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
import compose from 'lodash/fp/compose'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { aipFileActions, aipFileSelectors } from '../../clients/AIPFileClient'
import AIPFileListComponent from '../../components/file/AIPFileListComponent'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * Displays AIP files
 * @author Léo Mieulet
 */
export class AIPFileListContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      entities: aipFileSelectors.getOrderedList(state),
      entitiesLoading: aipFileSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    fetchAIPFiles: aipId => dispatch(aipFileActions.fetchAIPFiles(aipId)),
    flush: () => dispatch(aipFileActions.flush()),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aipId: PropTypes.string,
    }),
    // from mapStateToProps
    entities: StorageShapes.DataObjectArray,
    entitiesLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchAIPFiles: PropTypes.func.isRequired,
    flush: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.flush()
    this.props.fetchAIPFiles(this.props.params.aipId)
  }

  onBack = (level) => {
    const { params: { project, session, aipId } } = this.props
    const encodedSessionName = encodeURIComponent(session)
    let url
    switch (level) {
      case 0:
        // Go back to sessions
        url = `/admin/${project}/data/acquisition/storage/aip/session`
        break
      case 1:
        // Go back to sips of the given session
        url = `/admin/${project}/data/acquisition/storage/aip/${encodedSessionName}/list`
        break
      default:
        if (aipId) {
          url = `/admin/${project}/data/acquisition/storage/aip/${encodedSessionName}/list`
        } else {
          url = `/admin/${project}/data/acquisition/storage/aip/session`
        }
        break
    }
    browserHistory.push(url)
  }

  render() {
    const {
      entities, entitiesLoading, params: { session },
    } = this.props
    return (
      <AIPFileListComponent
        isLoading={entitiesLoading}
        onBack={this.onBack}
        entities={entities}
        session={session}
      />
    )
  }
}

export default compose(
  connect(AIPFileListContainer.mapStateToProps, AIPFileListContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(AIPFileListContainer)
