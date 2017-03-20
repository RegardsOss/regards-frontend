import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetEditUIServicesComponent from '../components/DatasetEditUIServicesComponent'

export class DatasetEditUIServicesContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
      datasetId: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    isLoading: false,
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/plugins`
  }

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/list`
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <DatasetEditUIServicesComponent
            backUrl={this.getBackUrl()}
            doneUrl={this.getDoneUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }


}


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditUIServicesContainer)
