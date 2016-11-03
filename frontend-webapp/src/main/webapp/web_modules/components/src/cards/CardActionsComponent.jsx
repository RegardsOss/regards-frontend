import { ThemeInjector } from '@regardsoss/theme'
import CardActionsView from './CardActionsView'
/**
 */
class CardActionsComponent extends React.Component {

  static defaultProps = {
    isMainButtonVisible: true,
  }

  render() {
    return (
      <ThemeInjector>
        <CardActionsView
          secondaryButtonLabel={this.props.secondaryButtonLabel}
          secondaryButtonUrl={this.props.secondaryButtonUrl}
          secondaryButtonTouchTap={this.props.secondaryButtonTouchTap}
          isSecondaryButtonVisible={this.props.isSecondaryButtonVisible}

          mainButtonUrl={this.props.mainButtonUrl}
          mainButtonLabel={this.props.mainButtonLabel}
          mainButtonTouchTap={this.props.mainButtonTouchTap}
          isMainButtonVisible={this.props.isMainButtonVisible}

          theme={null}
        />
      </ThemeInjector>
    )
  }
}
CardActionsComponent.propTypes = {
  secondaryButtonLabel: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.element),
  secondaryButtonUrl: React.PropTypes.string,
  secondaryButtonTouchTap: React.PropTypes.func,
  isSecondaryButtonVisible: React.PropTypes.bool,

  mainButtonLabel: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.element).isRequired,
  mainButtonUrl: React.PropTypes.string,
  mainButtonTouchTap: React.PropTypes.func,
  isMainButtonVisible: React.PropTypes.bool,
}

export default CardActionsComponent
