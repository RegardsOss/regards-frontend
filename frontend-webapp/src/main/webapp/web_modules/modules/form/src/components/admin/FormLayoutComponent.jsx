/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { Field, TextAreaField } from '@regardsoss/form-utils'
import { LayoutShape } from '@regardsoss/layout'
import DefaultFormLayout from './DefaultFormLayout'

/**
 * Component to display the search form layout configuration panel
 */
class FormLayoutComponent extends React.Component {

  static propTypes = {
    layout: LayoutShape,
    change: React.PropTypes.func,
  }

  componentWillMount() {
    if (!this.props.layout || this.props.layout.length === 0) {
      this.props.change('conf.layout', JSON.stringify(DefaultFormLayout, null, 4),)
    }
  }

  validateLayout = (layout) => {
    if (layout) {
      try {
        const layoutObj = JSON.parse(layout)
        if (!layoutObj.id || !layoutObj.type) {
          return 'Invalid layout. Id and type should be supplied'
        }
        return undefined
      } catch (e) {
        console.warn(e)
        return 'Invalid layout'
      }
    } else {
      return 'Invalid layout'
    }
  }

  resetLayout = () => {
    if (!this.props.layout || this.props.layout.length === 0) {
      this.props.change('conf.layout', JSON.stringify(DefaultFormLayout, null, 4),)
    } else {
      this.props.change('conf.layout', this.props.layout)
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
