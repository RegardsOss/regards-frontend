
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ModelCreateComponent from '../components/add/DatasourceModelCreateComponent'

/**
 */

class DatasourceModelCreateContainer extends React.Component {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    }
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasourcemodel`
  }

  handleNextStep = (name, attributes) => {
    this.props.addDatasourceModel(name, attributes)
    browserHistory.push(this.getCancelUrl())
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <ModelCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addDatasourceModel: (name, attributes) => null,
})

DatasourceModelCreateContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  addDatasourceModel: React.PropTypes.func,
}


export default connect(null, mapDispatchToProps)(DatasourceModelCreateContainer)
