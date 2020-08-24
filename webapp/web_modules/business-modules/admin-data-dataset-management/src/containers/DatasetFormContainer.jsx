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
import { browserHistory } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasetSelectors, datasetActions } from '../clients/DatasetClient'
import DatasetFormAttributesContainer from './DatasetFormAttributesContainer'
import DatasetFormSubsettingContainer from './DatasetFormSubsettingContainer'
import messages from '../i18n'

const states = {
  FORM_ATTRIBUTE: 'FORM_ATTRIBUTE',
  FORM_SUBSETTING: 'FORM_SUBSETTING',
}
/**
 * Show the dataset form
 */
export class DatasetFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasetId: PropTypes.string,
      datasourceId: PropTypes.string,
    }),
    // from mapStateToProps
    currentDataset: DataManagementShapes.Dataset,
    // from mapDispatchToProps
    createDataset: PropTypes.func,
    updateDataset: PropTypes.func,
    fetchDataset: PropTypes.func,
  }

  state = {
    isCreating: this.props.params.datasetId === undefined,
    isEditing: this.props.params.datasetId !== undefined,
    isLoading: this.props.params.datasetId !== undefined,
    state: states.FORM_ATTRIBUTE,
    currentDataset: null,
  }

  componentDidMount() {
    if (this.state.isEditing) {
      Promise.resolve(this.props.fetchDataset(this.props.params.datasetId))
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((this.state.currentDataset == null || this.props.currentDataset == null) && nextProps.currentDataset != null) {
      this.setState({
        currentDataset: cloneDeep(nextProps.currentDataset),
      })
    }
  }

  getFormAttributeBackUrl = () => {
    const { params: { project } } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      return `/admin/${project}/data/collections/dataset/list`
    }
    return `/admin/${project}/data/collections/dataset/create/datasource`
  }

  redirectToFiles = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/${datasetId}/files`
    browserHistory.push(url)
  }

  /**
   * Called by saveSubsetting to save the updatedDataset
   * @param formValues
   */
  handleUpdate = (formValues) => {
    Promise.resolve(this.props.updateDataset(this.props.params.datasetId, formValues))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToFiles(this.props.params.datasetId)
        }
      })
  }

  /**
   * Called by saveSubsetting to save the newDataset
   * @param formValues
   */
  handleCreate = (formValues) => {
    Promise.resolve(this.props.createDataset(formValues))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const datasetId = actionResult.payload.result
          this.redirectToFiles(datasetId)
        }
      })
  }

  /**
   * Runned by DatasetFormAttributesContainer when the user saves his form
   * This does not save the entity on the server but in the state of the container
   * @param providerId
   * @param label
   * @param modelDatasetId
   * @param attributes
   * @param modelObjectId
   */
  saveAttributes = (providerId, label, geometry, modelDatasetName, properties, modelObjectName) => {
    const { isCreating, currentDataset } = this.state
    if (isCreating) {
      const newValues = {
        content: {
          model: {
            name: modelDatasetName,
          },
          feature: {
            entityType: 'DATASET',
            providerId,
            label,
            geometry,
            properties,
            model: modelDatasetName,
          },
          plgConfDataSource: {
            businessId: this.props.params.datasourceId,
          },
          dataModel: modelObjectName,
          type: 'DATASET',
        },
      }
      this.setState({
        state: states.FORM_SUBSETTING,
        currentDataset: newValues,
      })
    } else {
      currentDataset.content.feature.providerId = providerId
      currentDataset.content.feature.label = label
      currentDataset.content.feature.geometry = geometry
      currentDataset.content.feature.properties = properties
      this.setState({
        currentDataset,
        state: states.FORM_SUBSETTING,
      })
    }
  }

  saveSubsetting = (subsetting) => {
    const { currentDataset } = this.state
    currentDataset.content.openSearchSubsettingClause = subsetting
    this.setState({
      currentDataset,
    })
    if (this.state.isEditing) {
      this.handleUpdate(currentDataset.content)
    } else {
      this.handleCreate(currentDataset.content)
    }
  }

  handleFormSubsettingBack = () => {
    this.setState({
      state: states.FORM_ATTRIBUTE,
    })
  }

  renderSubContainer = () => {
    const { params: { datasourceId } } = this.props
    const {
      isEditing, isCreating, state, currentDataset,
    } = this.state
    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DatasetFormAttributesContainer
          currentDataset={currentDataset}
          currentDatasourceId={isCreating ? datasourceId : currentDataset.content.plgConfDataSource.businessId}
          handleSave={this.saveAttributes}
          backUrl={this.getFormAttributeBackUrl()}
          isEditing={isEditing}
        />)
      case states.FORM_SUBSETTING:
        return (<DatasetFormSubsettingContainer
          currentDataset={currentDataset}
          isEditing={isEditing}
          isCreating={isCreating}
          handleSave={this.saveSubsetting}
          handleBack={this.handleFormSubsettingBack}
        />)
      default:
        return null
    }
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubContainer}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDataset: ownProps.params.datasetId ? datasetSelectors.getById(state, ownProps.params.datasetId) : null,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDataset: (id) => dispatch(datasetActions.fetchEntity(id)),
  createDataset: (values) => dispatch(datasetActions.createEntity(values)),
  updateDataset: (id, values) => dispatch(datasetActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormContainer)
