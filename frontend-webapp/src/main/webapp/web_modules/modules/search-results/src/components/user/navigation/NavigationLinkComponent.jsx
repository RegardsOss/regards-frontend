/**
* LICENSE_PLACEHOLDER
**/
import LabelIcon from 'material-ui/svg-icons/action/label'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import NavigationLevel from '../../../models/navigation/NavigationLevel'

/**
* Navigation link component
*/
class NavigationLinkComponent extends React.Component {

  static propTypes = {
    firstLevel: React.PropTypes.bool.isRequired,
    level: React.PropTypes.instanceOf(NavigationLevel).isRequired,
    onClickLevel: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }


  componentWillMount = () => {
    // initially not hover
    this.setMouseOver(false)
  }

  onMouseOver = () => this.setMouseOver(true)

  onMouseOut = () => this.setMouseOver(false)

  setMouseOver = mouseOver => this.setState({ mouseOver })

  render() {
    // TODO: maybe a flat button for click???
    const { level: { label }, firstLevel, onClickLevel } = this.props
    const { path, pathHover, separator } = this.context.moduleTheme.user.breadcrumb
    const { mouseOver } = this.state

    const levelStyle = mouseOver ? pathHover : path
    return (
      <span>
        {
          // first level : do not separate from next levels
          firstLevel ?
            null :
            <LabelIcon style={separator} />
        }
        <button
          style={levelStyle}
          onClick={onClickLevel}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          { // Label or root message (root level may have no label)
            firstLevel && !label ?
              <FormattedMessage id="navigation.home.label" /> :
              label
          }
        </button>

      </span>
    )
  }
}
export default NavigationLinkComponent
