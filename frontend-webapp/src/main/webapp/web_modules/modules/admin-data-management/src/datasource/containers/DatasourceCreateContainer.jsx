
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import CreateDatasourceFormComponent from '../components/add/CreateDatasourceFormComponent'
import DatasourceSelectors from '../model/datasource.selectors'
import { addDatasource } from '../model/datasource.actions'

export class DatasourceCreateContainer extends React.Component {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    }
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasetmodel`
  }

  handleNextStep = (name) => {
    this.props.addDatasource(name)
    browserHistory.push(this.getCancelUrl())
  }

  render() {
    const { connections, modelObjects, pluginDatasources } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <CreateDatasourceFormComponent
          cancelUrl={this.getCancelUrl()}
          connections={connections}
          modelObjects={modelObjects}
          save={this.handleNextStep}
          pluginDatasources={pluginDatasources}
        />
      </I18nProvider>
    )
  }
}
DatasourceCreateContainer.propTypes = {
  // From router
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  // From mapDispatchToProps
  addDatasource: React.PropTypes.func,
  // From mapStateToProps
  connections: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  modelObjects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  pluginDatasources: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
}
const mapStateToProps = (state, ownProps) => {
  const connections = DatasourceSelectors.getDatasources(state)
  const modelObjects = null
  const pluginDatasources = [{
    name: 'CIPAD PostgreSQL',
    id: 1,
  }, {
    name: 'Tartanpion MongoDB',
    id: 2,
  }]
  return {
    connections,
    modelObjects,
    pluginDatasources,
  }
}
const mapDispatchToProps = dispatch => ({
  addDatasource: name => dispatch(addDatasource(null, null, null, name)),
})
export default connect(mapStateToProps, mapDispatchToProps)(DatasourceCreateContainer)
