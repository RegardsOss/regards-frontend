/**
 * LICENSE_PLACEHOLDER
 **/
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import {CardActionsComponent} from '@regardsoss/components'
import {FormattedMessage} from 'react-intl'
import {Field, TextAreaField} from '@regardsoss/form-utils'
import {LayoutConfigurationComponent} from '@regardsoss/layout'
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
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.setState({
      currentLayout: initialLayout
    })
    this.props.changeField('conf.layout', JSON.stringify(initialLayout, null, 4))
  }

  getInitialLayout = (layout) => {
    const initialLayout = layout ? JSON.parse(layout) : DefaultFormLayout
    return initialLayout.id && initialLayout.type ? initialLayout : DefaultFormLayout
  }

  changeLayout = (layout) => {
    this.props.changeField('conf.layout', JSON.stringify(layout, null, 4))
    this.setState({
      currentLayout: layout,
    })
  }

  resetLayout = () => {
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.props.changeField('conf.layout', JSON.stringify(initialLayout), null, 4)
    this.setState({
      currentLayout: initialLayout,
    })
  }

  render() {
    return (
      <Card>
        <CardTitle
          subtitle={<FormattedMessage id="form.layout.tab.title"/>}
        />
        <CardText style={{width: '100%'}}>
          <LayoutConfigurationComponent
            layout={this.state.currentLayout}
            onChange={this.changeLayout}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage id="form.layout.tab.reset"/>}
            mainButtonType="reset"
            mainButtonTouchTap={this.resetLayout}
          />
        </CardActions>
      </Card>
    )
  }
}

export default FormLayoutComponent
