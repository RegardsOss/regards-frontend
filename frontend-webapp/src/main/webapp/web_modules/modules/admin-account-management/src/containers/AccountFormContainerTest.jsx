/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { Account } from '@regardsoss/model'
import AccountActions from '../model/AccountActions'
import AccountFormComponent from '../components/AccountFormComponent'
import AccountSelectors from '../model/AccountSelectors'


export class AccountFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      account_id: React.PropTypes.string,
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
      formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    }),
    // from mapStateToProps
    // currentPluginMetaData: PluginMetaData,
    // pluginMetaDataList: PluginMetaDataList,
    isPluginMetaDataFetching: React.PropTypes.bool,
    // currentPluginConfiguration: PluginConfiguration,
    // pluginConfigurationList: PluginConfigurationList,
    isPluginConfigurationFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginConfigurationList: React.PropTypes.func,
    createPluginConfiguration: React.PropTypes.func,
    updatePluginConfiguration: React.PropTypes.func,
    fetchPluginMetaDataList: React.PropTypes.func,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    console.log('AccountFormContainer::render')

    return (
      <div>couocu</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  toto: "coucouc"
})

const mapDispatchToProps = dispatch => ({
  totoDispatch: () => dispatch({type:'FAKE_ACTION'})
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormContainer)
