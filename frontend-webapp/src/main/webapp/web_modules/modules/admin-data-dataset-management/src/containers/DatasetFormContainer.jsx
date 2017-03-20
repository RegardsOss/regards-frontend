/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { cloneDeep } from 'lodash'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Dataset } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetSelectors from './../model/DatasetSelectors'
import DatasetActions from './../model/DatasetActions'
import DatasetFormAttributesContainer from './DatasetFormAttributesContainer'
import DatasetFormSubsettingContainer from './DatasetFormSubsettingContainer'

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
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasetId: React.PropTypes.string,
      datasourceId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentDataset: Dataset,
    // from mapDispatchToProps
    createDataset: React.PropTypes.func,
    updateDataset: React.PropTypes.func,
    fetchDataset: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.datasetId === undefined
    this.state = {
      isCreating,
      isEditing: props.params.datasetId !== undefined,
      isLoading: !isCreating,
      state: states.FORM_ATTRIBUTE,
      currentDataset: null,
    }
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

  componentWillReceiveProps(nextProps) {
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
      return `/admin/${project}/data/dataset/list`
    }
    return `/admin/${project}/data/dataset/create/connection`
  }

  redirectToLink = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/links`
    browserHistory.push(url)
  }

  /**
   * Called by saveSubsetting to save the updatedDataset
   * @param newDataset
   */
  handleUpdate = (updatedDataset) => {
    Promise.resolve(this.props.updateDataset(updatedDataset.content.id, updatedDataset.content))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLink(this.props.params.datasetId)
        }
      })
  }

  /**
   * Called by saveSubsetting to save the newDataset
   * @param newDataset
   */
  handleCreate = (newDataset) => {
    Promise.resolve(this.props.createDataset(newDataset.content))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const datasetId = actionResult.payload.result
          this.redirectToLink(datasetId)
        }
      })
  }

  /**
   * Runned by DatasetFormAttributesContainer when the user saves his form
   * This does not save the entity on the server but in the state of the container
   * @param label
   * @param modelDatasetId
   * @param attributes
   * @param modelObjectId
   */
  saveAttributes = (label, modelDatasetId, attributes, modelObjectId) => {
    const { isCreating, currentDataset } = this.state
    if (isCreating) {
      const newValues = {
        content: {
          label,
          attributes,
          model: {
            id: modelDatasetId,
          },
          dataModel: modelObjectId,
          plgConfDataSource: parseInt(this.props.params.datasourceId, 10),
          tags: [],
          type: 'DATASET',
        },
      }
      this.setState({
        state: states.FORM_SUBSETTING,
        currentDataset: newValues,
      })
    } else {
      currentDataset.content.label = label
      currentDataset.content.attributes = attributes
      this.setState({
        currentDataset,
        state: states.FORM_SUBSETTING,
      })
    }
  }

  saveSubsetting = (formValues) => {
    const { currentDataset } = this.state
    currentDataset.content.subsetting = formValues.subsetting
    this.setState({
      currentDataset,
    })
    if (this.state.isEditing) {
      this.handleUpdate(currentDataset)
    } else {
      this.handleCreate(currentDataset)
    }
  }

  handleFormSubsettingBack = () => {
    this.setState({
      state: states.FORM_ATTRIBUTE,
    })
  }

  renderSubContainer = () => {
    const { params: { datasourceId } } = this.props
    const { isEditing, isCreating, state, currentDataset } = this.state
    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DatasetFormAttributesContainer
          currentDataset={currentDataset}
          currentDatasourceId={isCreating ? datasourceId : currentDataset.content.plgConfDataSource}
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
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
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
  currentDataset: ownProps.params.datasetId ? DatasetSelectors.getById(state, ownProps.params.datasetId) : null,
})

const mapDispatchToProps = dispatch => ({
  fetchDataset: id => dispatch(DatasetActions.fetchEntity(id)),
  createDataset: values => dispatch(DatasetActions.createEntity(values)),
  updateDataset: (id, values) => dispatch(DatasetActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormContainer)
