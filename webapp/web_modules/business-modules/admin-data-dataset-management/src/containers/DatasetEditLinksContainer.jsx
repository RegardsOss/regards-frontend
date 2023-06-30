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
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import partition from 'lodash/partition'
import some from 'lodash/some'
import map from 'lodash/map'
import find from 'lodash/find'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasetSelectors, datasetActions } from '../clients/DatasetClient'
import DatasetEditLinksComponent from '../components/DatasetEditLinksComponent'
import { datasetLinkActions } from '../clients/DatasetLinkClient'
import { collectionSelectors, collectionActions } from '../clients/CollectionClient'
import messages from '../i18n'

/**
 * Show the dataset form
 */
export class DatasetEditLinksContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasetId: PropTypes.string,
    }),
    // from mapStateToProps
    currentDataset: DataManagementShapes.Dataset,
    collectionList: DataManagementShapes.CollectionList,
    // from mapDispatchToProps
    removeTagFromDataset: PropTypes.func,
    addTagToDataset: PropTypes.func,
    fetchDataset: PropTypes.func,
    fetchCollectionList: PropTypes.func,
  }

  state = {
    isLoading: true,
    collectionName: '',
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchCollectionList(),
      this.props.fetchDataset(this.props.params.datasetId),
    ]).then((actionResult) => {
      this.setState({
        isLoading: false,
      })
    })
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/collections/dataset/${datasetId}/files`
  }

  getDoneUrl = () => {
    const { params: { project, datasetId } } = this.props
    const { currentDataset } = this.props
    return `/admin/${project}/data/collections/dataset/${datasetId}/${currentDataset.content.feature.id}/plugins`
  }

  /**
   * Devide the collectionList into 2 sets, one linked to the current dataset
   * and remaining collection can be associated with current dataset
   * @param currentDataset
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentDataset, collectionList) => {
    const { collectionName } = this.state
    const collectionLinkedToCurrentCollection = partition(collectionList, (collection) => some(currentDataset.content.tags, (tag) => tag === collection.content.feature.id))
    return filter(collectionLinkedToCurrentCollection[1], (remainingCollection) => startsWith(remainingCollection.content.feature.label.toLowerCase(), collectionName))
  }

  getCollectionLinked = (collectionIpIdList, collectionList) => map(collectionIpIdList, (collectionIpId) => find(collectionList, (collection) => collection.content.ipId === collectionIpId))

  partitionDatasetLinkedTags = (currentDataset) => {
    const linkedTags = partition(currentDataset.content.tags, (tag) => tag.match(/URN:.*:COLLECTION.*/))
    return linkedTags
  }

  handleSearch = (event, collectionName) => {
    this.setState({
      collectionName: collectionName.toLowerCase(),
    })
  }

  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = (tag) => {
    if (!isEmpty(tag)) {
      Promise.resolve(this.props.addTagToDataset(this.props.currentDataset.content.id, [tag]))
        .then((actionResult) => {
          this.props.fetchDataset(this.props.params.datasetId)
        })
    }
  }

  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = (tag) => {
    Promise.resolve(this.props.removeTagFromDataset(this.props.currentDataset.content.id, [tag]))
      .then((actionResult) => {
        this.props.fetchDataset(this.props.params.datasetId)
      })
  }

  renderSubComponent = () => {
    const { currentDataset, collectionList } = this.props
    const remainingCollections = this.getRemainingCollection(currentDataset, collectionList)
    const datasetTags = this.partitionDatasetLinkedTags(currentDataset)
    const datasetStringTags = datasetTags[1]
    const linkedCollection = this.getCollectionLinked(datasetTags[0], collectionList)
    return (
      <DatasetEditLinksComponent
        currentDataset={currentDataset}
        remainingCollections={remainingCollections}
        linkedCollections={linkedCollection}
        datasetStringTags={datasetStringTags}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
        handleSearch={this.handleSearch}
        backUrl={this.getBackUrl()}
        doneUrl={this.getDoneUrl()}
      />
    )
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDataset: datasetSelectors.getById(state, ownProps.params.datasetId),
  collectionList: collectionSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionList: () => dispatch(collectionActions.fetchPagedEntityList(0)),
  fetchDataset: (id) => dispatch(datasetActions.fetchEntity(id)),
  addTagToDataset: (datasetId, tags) => dispatch(datasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'associate' })),
  removeTagFromDataset: (datasetId, tags) => dispatch(datasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'dissociate' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditLinksContainer)
