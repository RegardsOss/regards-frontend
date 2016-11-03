
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import DatasetSelectors from '../model/dataset.selectors'
import DatasetListComponent from '../components/list/DatasetListComponent'
/*
interface DatasetCreateProps {
  // From router
  params

  // From mapStateToProps
  datasets: Array<Dataset>
}*/

/**
 * Show the list of users for the current project
 */
export class DatasetListContainer extends React.Component {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }
  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/dataset/create`
  }

  render() {
    const { datasets } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <DatasetListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasets={datasets}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const datasets = DatasetSelectors.getDatasets(state)
  return {
    datasets,
  }
}
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(DatasetListContainer)

