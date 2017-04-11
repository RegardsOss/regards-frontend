/**
 * LICENSE_PLACEHOLDER
 **/
import { ThemeInjector } from '@regardsoss/theme'
import CardActionsView from './CardActionsView'

class CardActionsComponent extends React.Component {
  static propTypes = {
    secondaryButtonClassName: React.PropTypes.string,
    secondaryButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    secondaryButtonUrl: React.PropTypes.string,
    secondaryButtonTouchTap: React.PropTypes.func,
    isSecondaryButtonDisabled: React.PropTypes.bool,
    isSecondaryButtonVisible: React.PropTypes.bool,
    secondaryHateoasDependency: React.PropTypes.string,

    mainButtonClassName: React.PropTypes.string,
    mainButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    mainButtonUrl: React.PropTypes.string,
    mainButtonTouchTap: React.PropTypes.func,
    mainButtonType: React.PropTypes.string,
    isMainButtonVisible: React.PropTypes.bool,
    isMainButtonDisabled: React.PropTypes.bool,
    mainHateoasDependency: React.PropTypes.string,
  }
  static defaultProps = {
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
  }

  render() {
    return (
      <ThemeInjector>
        <CardActionsView
          secondaryButtonClassName={this.props.secondaryButtonClassName}
          secondaryButtonLabel={this.props.secondaryButtonLabel}
          secondaryButtonUrl={this.props.secondaryButtonUrl}
          secondaryButtonTouchTap={this.props.secondaryButtonTouchTap}
          isSecondaryButtonDisabled={this.props.isSecondaryButtonDisabled}
          isSecondaryButtonVisible={this.props.isSecondaryButtonVisible}
          secondaryHateoasDependency={this.props.secondaryHateoasDependency}

          mainButtonClassName={this.props.mainButtonClassName}
          mainButtonUrl={this.props.mainButtonUrl}
          mainButtonLabel={this.props.mainButtonLabel}
          mainButtonTouchTap={this.props.mainButtonTouchTap}
          mainButtonType={this.props.mainButtonType}
          isMainButtonVisible={this.props.isMainButtonVisible}
          isMainButtonDisabled={this.props.isMainButtonDisabled}
          mainHateoasDependency={this.props.mainHateoasDependency}

          theme={null}
        />
      </ThemeInjector>
    )
  }
}

export default CardActionsComponent
