
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import DatasourceModelListComponent from '../components/DatasourceModelListComponent'
/**
 *//*
interface DatasourceModelListProps {
  // From router
  params: any
  // From mapStateToProps
  datasourceModels?: Array<DatasetModel>
}*/

class DatasourceModelListContainer extends React.Component {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }
  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasourcemodel/create`
  }

  render() {
    const { datasourceModels } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <DatasourceModelListComponent

          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasourceModels={datasourceModels}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const datasourceModels = null
  return {
    datasourceModels,
  }
}
export default connect(mapStateToProps, null)(DatasourceModelListContainer)
