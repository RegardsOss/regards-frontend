
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import DatasourceListComponent from '../components/list/DatasourceListComponent'
import DatasourceSelectors from '../model/datasource.selectors'


/**
 */
class DatasourceListContainer extends React.Component {


  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasource/create`
  }

  render() {
    const { datasources } = this.props
    console.log(datasources)
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <DatasourceListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasources={datasources}
        />
      </I18nProvider>
    )
  }
}

DatasourceListContainer.propTypes = {
  params: React.PropTypes.arrayOf(React.PropTypes.string),
  datasources: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
}
const mapStateToProps = (state, ownProps) => {
  const datasources = DatasourceSelectors.getDatasources(state)
  return {
    datasources,
  }
}
export default connect(mapStateToProps, null)(DatasourceListContainer)
