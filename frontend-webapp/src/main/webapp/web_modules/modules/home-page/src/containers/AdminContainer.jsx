/*
 * LICENSE_PLACEHOLDER
 */
import root from 'window-or-global'
import has from 'lodash/has'
import get from 'lodash/get'
import startsWith from 'lodash/startsWith'
import { Field, RenderTextField, ValidationHelpers } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadingComponent } from '@regardsoss/display-control'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import ModuleConfiguration from '../models/ModuleConfiguration'


const defaultHomepagePath = '/html/regards-homepage.html'
/**
 * React component to display module administration module
 * @author Maxime Bouveron
 */
class AdminContainer extends React.Component {

  static propTypes = {
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

  componentDidMount() {
    if (!has(this.props.adminForm, 'form.conf.htmlPath') || (get(this.props.adminForm, 'form.conf.htmlPath') === '')) {
      this.props.adminForm.changeField('conf.htmlPath', defaultHomepagePath)
    }

    this.handleTest(null, defaultHomepagePath)
  }

  getFullPath = (path) => {
    if (path) {
      if (startsWith(path, 'http') || startsWith(path, 'wwww')) {
        return path
      } else if (startsWith(path, '/')) {
        return `http://${root.location.host}${path}`
      }
      return `http://${root.location.host}/${path}`
    }
    return path
  }

  handleTest = (event, pPathToTest) => {
    const pathToTest = pPathToTest || get(this.props.adminForm, 'form.conf.htmlPath')
    if (pathToTest) {
      this.setState({ test: true, loading: true, lastHtmlPathTested: this.getFullPath(pathToTest) })
    }
  }

  hideLoading = () => {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { moduleTheme } = this.context

    const currentPath = this.getFullPath(get(this.props.adminForm, 'form.conf.htmlPath'))
    const fieldStyle = { marginBottom: 15 }
    return (
      <div>
        <Field
          name="conf.htmlPath"
          fullWidth
          component={RenderTextField}
          type="text"
          validate={ValidationHelpers.string}
          label={this.context.intl.formatMessage({ id: 'homepage.admin.url' })}
          style={fieldStyle}
        />
        <RaisedButton
          label={this.context.intl.formatMessage({ id: 'homepage.admin.test' })}
          primary
          disabled={this.state.loading || !currentPath || (this.state.lastHtmlPathTested === currentPath)}
          onTouchTap={this.handleTest}
        />
        {this.state.loading ? <LoadingComponent style={moduleTheme.adminIframeLoading} /> : null}
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
