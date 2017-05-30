import { Field, RenderTextField } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { formValueSelector } from 'redux-form'

/**
 * React component to display module administration module
 * @author Maxime Bouveron
 */
class AdminContainer extends React.Component {

  static propTypes = {
    getHtmlPath: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    test: false,
  }

  handleTest = () => {
    this.setState({ test: true, filePath: this.props.getHtmlPath })
  }

  render() {
    const { moduleTheme } = this.context
    return (
      <div>
        <Field
          name="conf.htmlPath"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'homepage.admin.url' })}
        />
        <RaisedButton
          label={this.context.intl.formatMessage({ id: 'homepage.admin.test' })}
          primary
          onTouchTap={this.handleTest}
        />
        {this.state.test ?
          <iframe
            title="content-test"
            style={moduleTheme.adminFrame}
            src={this.state.filePath}
          /> : null}
      </div>
    )
  }
}

// TODO : get form name for parent component
const selector = formValueSelector('edit-module-form')

const mapStateToProps = state => ({
  getHtmlPath: selector(state, 'conf.htmlPath'),
})
export default connect(mapStateToProps)(AdminContainer)
