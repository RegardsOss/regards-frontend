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
import DatasourceFormMappingComponent from '../components/DatasourceFormMappingComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'


/**
 * Show the datasource form
 */
export class DatasourceFormMappingContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    currentDatasource: Datasource,
    isFetchingDatasource: React.PropTypes.bool,
    modelList: React.PropTypes.objectOf(Model),
    isFetchingModel: React.PropTypes.bool,
    // from mapDispatchToProps
    createDatasource: React.PropTypes.func,
    updateDatasource: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
    fetchModelList: React.PropTypes.func,
  }

  componentDidMount() {
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/list`
  }

  render() {
    const { currentDatasource, modelList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasourceFormMappingComponent
            modelList={modelList}
            currentDatasource={currentDatasource}
            isDuplicating={isDuplicating}
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            backUrl={this.getBackUrl()}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormMappingContainer)
