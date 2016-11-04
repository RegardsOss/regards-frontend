
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { addConnection } from '../model/ConnectionActions'
import ConnectionCreateComponent from '../components/add/ConnectionCreateComponent'


/**
 */
class ConnectionCreateContainer extends React.Component {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    }
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/connection`
  }
  handleNextStep = (name, pluginName, requiredAttributes) => {
    this.props.addConnection(name, pluginName, requiredAttributes)
    console.log(name, pluginName, requiredAttributes)
    browserHistory.push(this.getCancelUrl())
  }
  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <ConnectionCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}

ConnectionCreateContainer.propTypes = {
  // From router
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  // From mapDispatchToProps
  addConnection: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  addConnection: (name, pluginName, requiredAttributes) =>
    dispatch(addConnection(name, pluginName, requiredAttributes)),
})
export default connect(null, mapDispatchToProps)(ConnectionCreateContainer)
