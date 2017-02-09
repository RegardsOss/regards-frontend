import { Field, RenderTextField } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage, intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { formValueSelector } from 'redux-form'

/**
 * React component to display module administration module
 * @author Maxime Bouveron
 */
class AdminContainer extends React.Component {

  static contextTypes= {
    ...themeContextType,
    intl: intlShape,
  }

  state = {
    test : false
  }

  handleTest() {
    this.setState({test: true, filePath: this.props.getHtmlPath})
  }

  render() {
    const { moduleTheme, intl } = this.context
    return (
      <div>
        <Field
          name="conf.htmlPath"
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="homepage.admin.url"/>}
        />
        <RaisedButton
          label={<FormattedMessage id="homepage.admin.test"/>}
          primary={true}
          onTouchTap={this.handleTest.bind(this)}
        />
        {this.state.test ? <iframe
          style={moduleTheme.adminFrame}
          src={this.state.filePath}
        ></iframe> : ""}
      </div>
    )
  }
}

// TODO : get form name for parent component
const selector = formValueSelector('edit-module-form')

const mapStateToProps = (state) => ({
  getHtmlPath: selector(state, 'conf.htmlPath')
})
export default connect(mapStateToProps)(AdminContainer)
