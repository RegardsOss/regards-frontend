import { ThemeInjector } from '@regardsoss/theme'
import CardActionsView from './CardActionsView'
/**
 */
class CardActionsComponent extends React.Component {
  static propTypes = {
    secondaryButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    secondaryButtonUrl: React.PropTypes.string,
    secondaryButtonTouchTap: React.PropTypes.func,
    isSecondaryButtonVisible: React.PropTypes.bool,

    mainButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    mainButtonUrl: React.PropTypes.string,
    mainButtonTouchTap: React.PropTypes.func,
    mainButtonType: React.PropTypes.string,
    isMainButtonVisible: React.PropTypes.bool,
    isMainButtonDisabled: React.PropTypes.bool,
  }
  static defaultProps = {
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
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
          mainButtonType={this.props.mainButtonType}
          isMainButtonVisible={this.props.isMainButtonVisible}
          isMainButtonDisabled={this.props.isMainButtonDisabled}

          theme={null}
        />
      </ThemeInjector>
    )
  }
}

export default CardActionsComponent
