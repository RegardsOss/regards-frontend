/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { Layout } from '@regardsoss/model'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { LayoutConfigurationComponent, DefaultLayout } from '@regardsoss/layout'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ApplicationLayoutComponent extends React.Component {

  static propTypes = {
    layout: Layout,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    // from reduxForm
    change: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentLayout: null,
    }
  }

  componentWillMount() {
    const initialLayout = this.getInitialLayout(this.props.layout)
    this.setState({
      currentLayout: initialLayout,
    })
    this.props.initialize({
      layout: initialLayout,
    })
  }

  getInitialLayout = (layout) => {
    const initialLayout = layout || DefaultLayout
    return initialLayout.id && initialLayout.type ? initialLayout : DefaultLayout
  }

  changeLayout = (layout) => {
    this.props.change('layout', layout)
    this.setState({
      currentLayout: layout,
    })
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/admin-ui-configuration/src/i18n"
      >
        <Card>
          <CardTitle
            title={<FormattedMessage id="layout.title" />}
            subtitle={<FormattedMessage id="layout.subtitle" />}
          />
          <CardText style={{ width: '100%' }} >
            <LayoutConfigurationComponent
              layout={this.state.currentLayout}
              onChange={this.changeLayout}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="layout.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={<FormattedMessage id="layout.cancel" />}
              secondaryButtonTouchTap={this.props.onCancel}
            />
          </CardActions>
        </Card>
      </ReduxConnectedForm>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'app-layout-form',
  validate,
})(ApplicationLayoutComponent)
