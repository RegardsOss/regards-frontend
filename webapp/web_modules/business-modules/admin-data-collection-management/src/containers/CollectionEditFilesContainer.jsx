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
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DataManagementShapes } from '@regardsoss/shape'
import CollectionEditFilesComponent from '../components/CollectionEditFilesComponent'
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import messages from '../i18n'

export class CollectionEditFilesContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      collectionId: PropTypes.string,
    }).isRequired,

    // from mapStateToProps
    currentCollection: DataManagementShapes.Collection,

    // from mapDispatchToProps
    fetchCollection: PropTypes.func,
    updateCollection: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    currentCollection: collectionSelectors.getById(state, ownProps.params.collectionId),
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchCollection: (id) => dispatch(collectionActions.fetchEntity(id)),
    updateCollection: (id, entity) => dispatch(collectionActions.updateEntity(id, entity)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId)
      .then(() => this.setState({
        isLoading: false,
      }))
  }

  getBackUrl = () => {
    const { params: { project }, currentCollection } = this.props
    return `/admin/${project}/data/collections/collection/${currentCollection.content.id}/edit`
  }

  getLinksUrl = () => {
    const { params: { project }, currentCollection } = this.props
    return `/admin/${project}/data/collections/collection/${currentCollection.content.id}/links`
  }

  getForm = () => {
    const { currentCollection } = this.props
    return (
      <CollectionEditFilesComponent
        currentCollection={currentCollection}
        backURL={this.getBackUrl()}
        linksURL={this.getLinksUrl()}
        projectName={this.props.params.project}
        handleRefreshEntity={this.handleRefreshEntity}
        handleUpdateEntity={this.handleUpdateEntity}
      />
    )
  }

  handleRefreshEntity = () => {
    this.props.fetchCollection(this.props.params.collectionId)
  }

  handleUpdateEntity = (entity) => {
    this.props.updateCollection(this.props.params.collectionId, entity)
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(CollectionEditFilesContainer.mapStateToProps, CollectionEditFilesContainer.mapDispatchToProps)(CollectionEditFilesContainer)
