/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Datasource, Model, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import DatasourceFormAttributesContainer from './DatasourceFormAttributesContainer'
import DatasourceFormMappingContainer from './DatasourceFormMappingContainer'

const states = {
  'FORM_ATTRIBUTE': 'FORM_ATTRIBUTE',
  'FORM_MAPPING_CONNECTION':'FORM_MAPPING_CONNECTION'
}
/**
 * Show the datasource form
 */
export class DatasourceFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasourceId: React.PropTypes.string,
      connectionId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentDatasource: Datasource,
    // from mapDispatchToProps
    createDatasource: React.PropTypes.func,
    updateDatasource: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.datasourceId === undefined
    this.state = {
      isCreating,
      isEditing: props.params.datasourceId !== undefined,
      isLoading: !isCreating,
      state: states.FORM_ATTRIBUTE,
      currentDatasource: null,
    }
  }


  componentDidMount() {
    if (this.state.isEditing) {
      Promise.resolve(this.props.fetchDatasource(this.props.params.datasourceId))
        .then(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentDatasource == null && nextProps.currentDatasource != null) {
      this.setState({
        currentDatasource: nextProps.currentDatasource
      })
    }
  }

  handleUpdate = (values) => {
    const updatedDatasource = Object.assign({}, {
    }, {
    })
    Promise.resolve(this.props.updateDatasource(this.props.currentDatasource.content.id, updatedDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage(this.props.params.datasourceId)
        }
      })
  }

  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const newDatasource = {
      label: values.label,
      model,
      type: 'DATASOURCE',
    }
    Promise.resolve(this.props.createDatasource(newDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the datasource id from the action
          const datasource = this.extractDatasourceFromActionResult(actionResult)
          this.redirectToLinksPage(datasource.id)
        }
      })
  }

  /**
   * Runned by DatasourceFormAttributesContainer when the user saves his form
   * This does not save the entity on the server
   * @param values
   */
  saveAttributes = (values) => {
    console.log(values)
    /*
    this.setState({
      state: states.FORM_MAPPING_CONNECTION,
    })*/
  }

  /**
   * Runned by DatasourceFormMappingContainer when the user saves his form
   * This function saves the entity on the server
   * @param values
   */
  saveMapping = (values) => {

  }


  getFormAttributeBackUrl = () => {
    const { isEditing, params: { project } } = this.props
    if (isEditing) {
      return `/admin/${project}/data/datasource/list`
    }
    return `/admin/${project}/data/datasource/create/connection`
  }

  handleFormMappingBack = () => {
    this.setState({
      state: states.FORM_ATTRIBUTE,
    })
  }
  renderSubContainer = () => {
    const {  params: {connectionId} } = this.props
    const { isEditing, isCreating, state, currentDatasource } = this.state
    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DatasourceFormAttributesContainer
          currentDatasource={currentDatasource}
          currentConnectionId={isCreating ? connectionId : currentDatasource.content.connection.id}
          isEditing={isEditing}
          isCreating={isCreating}
          handleSave={this.saveAttributes}
          backUrl={this.getFormAttributeBackUrl()}
        />)
      case states.FORM_MAPPING_CONNECTION:
        return (<DatasourceFormMappingContainer
          currentDatasource={currentDatasource}
          isEditing={isEditing}
          isCreating={isCreating}
          handleSave={this.saveMapping}
          handleBack={this.handleFormMappingBack}
        />)
    }
  }
  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubContainer()}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDatasource: ownProps.params.datasourceId ? DatasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
})

const mapDispatchToProps = dispatch => ({
  fetchDatasource: id => dispatch(DatasourceActions.fetchEntity(id)),
  createDatasource: values => dispatch(DatasourceActions.createEntity(values)),
  updateDatasource: (id, values) => dispatch(DatasourceActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormContainer)
