/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { Container as ContainerShape } from '@regardsoss/model'
import { LayoutConfigurationComponent, DefaultLayout } from '@regardsoss/layout'

/**
 * Component to display the search form layout configuration panel
 * @author Sébastien binda
 */
class FormLayoutComponent extends React.Component {

  static propTypes = {
    defaultLayout: ContainerShape,
    changeField: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.setState({
      currentLayout: initialLayout,
    })
    this.props.changeField('conf.layout', initialLayout)
  }

  getInitialLayout = (layout) => {
    const initialLayout = layout || DefaultLayout
    return initialLayout.id && initialLayout.type ? initialLayout : DefaultLayout
  }

  changeLayout = (layout) => {
    this.props.changeField('conf.layout', layout)
    this.setState({
      currentLayout: layout,
    })
  }

  resetLayout = () => {
    const initialLayout = this.getInitialLayout(this.props.defaultLayout)
    this.props.changeField('conf.layout', initialLayout)
    this.setState({
      currentLayout: initialLayout,
    })
  }

  render() {
    return (
      <Card>
        <CardTitle
          subtitle={this.context.intl.formatMessage({ id: 'form.layout.tab.title' })}
        />
        <CardText style={{ width: '100%' }}>
          <LayoutConfigurationComponent
            layout={this.state.currentLayout}
            onChange={this.changeLayout}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'form.layout.tab.reset' })}
            mainButtonType="reset"
            mainButtonTouchTap={this.resetLayout}
          />
        </CardActions>
      </Card>
    )
  }
}

export default FormLayoutComponent
