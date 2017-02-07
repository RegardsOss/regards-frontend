/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { Field, TextAreaField } from '@regardsoss/form-utils'
import DefaultFormLayout from './DefaultFormLayout'

/**
 * Component to display the search form layout configuration panel
 * @author Sébastien binda
 */
class FormLayoutComponent extends React.Component {

  static propTypes = {
    defaultLayout: React.PropTypes.string,
    changeField: React.PropTypes.func,
  }

  componentWillMount() {
    if (!this.props.defaultLayout || this.props.defaultLayout.length === 0) {
      this.props.changeField('conf.layout', JSON.stringify(DefaultFormLayout, null, 4))
    }
  }

  validateLayout = (layout) => {
    if (layout) {
      try {
        const layoutObj = JSON.parse(layout)
        if (!layoutObj.id || !layoutObj.type) {
          return 'layout.invalid.error'
        }
        return undefined
      } catch (e) {
        console.warn(e)
        return 'layout.invalid.error'
      }
    } else {
      return 'layout.invalid.error'
    }
  }

  resetLayout = () => {
    if (!this.props.defaultLayout || this.props.defaultLayout.length === 0) {
      this.props.changeField('conf.layout', JSON.stringify(DefaultFormLayout, null, 4))
    } else {
      this.props.changeField('conf.layout', this.props.defaultLayout)
    }
  }

  render() {
    return (
      <Card>
        <CardTitle
          subtitle={<FormattedMessage id="form.layout.tab.title" />}
        />
        <CardText style={{ width: '100%' }}>
          <Field
            name="conf.layout"
            component={TextAreaField}
            validate={this.validateLayout}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage id="form.layout.tab.reset" />}
            mainButtonType="reset"
            mainButtonTouchTap={this.resetLayout}
          />
        </CardActions>
      </Card>
    )
  }

}

export default FormLayoutComponent
