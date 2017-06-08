/*
 * LICENSE_PLACEHOLDER
 */
import has from 'lodash/has'
import {Container} from '@regardsoss/model'
import {Field, RenderTextField} from '@regardsoss/form-utils'
import {themeContextType} from '@regardsoss/theme'
import RaisedButton from 'material-ui/RaisedButton'
import {i18nContextType} from '@regardsoss/i18n'
import {LoadingComponent} from '@regardsoss/display-control'
import {IFrameURLContentDisplayer} from '@regardsoss/components'
import ModuleConfiguration from '../models/ModuleConfiguration'

/**
 * React component to display module administration module
 * @author Maxime Bouveron
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: PropTypes.shape({
        // Specific current module configuration for the current AdminContainer
        conf: ModuleConfiguration,
      }),
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    test: false,
    loading: false,
    lastHtmlPathTested: undefined,
  }

  handleTest = () => {
    if (has(this.props.adminForm, 'form.conf.htmlPath')) {
      this.setState({test: true, loading: true, lastHtmlPathTested: this.props.adminForm.form.conf.htmlPath})
    }
  }

  hideLoading = () => {
    this.setState({
      loading: false,
    })
  }

  render() {
    const {moduleTheme} = this.context
    return (
      <div>
        <Field
          name="conf.htmlPath"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({id: 'homepage.admin.url'})}
        />
        <RaisedButton
          label={this.context.intl.formatMessage({id: 'homepage.admin.test'})}
          primary
          disabled={this.state.loading || (this.state.lastHtmlPathTested === this.props.adminForm.form.conf.htmlPath)}
          onTouchTap={this.handleTest}
        />
        {this.state.loading ? <LoadingComponent  style={moduleTheme.adminIframeLoading}/> : null}
        {this.state.test ?
          <IFrameURLContentDisplayer
            style={moduleTheme.adminFrame}
            contentURL={this.state.lastHtmlPathTested}
            onContentLoaded={this.hideLoading}
          />
          : null}
      </div>
    )
  }
}

export default AdminContainer
