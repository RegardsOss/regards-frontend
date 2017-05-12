/**
 * LICENSE_PLACEHOLDER
 **/
import { ThemeInjector } from '@regardsoss/theme'
import CardActionsView from './CardActionsView'

class CardActionsComponent extends React.Component {
  static propTypes = {
    secondaryButtonClassName: PropTypes.string,
    secondaryButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    secondaryButtonUrl: PropTypes.string,
    secondaryButtonTouchTap: PropTypes.func,
    isSecondaryButtonDisabled: PropTypes.bool,
    isSecondaryButtonVisible: PropTypes.bool,
    secondaryHateoasDependency: PropTypes.string,

    mainButtonClassName: PropTypes.string,
    mainButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    mainButtonUrl: PropTypes.string,
    mainButtonTouchTap: PropTypes.func,
    mainButtonType: PropTypes.string,
    isMainButtonVisible: PropTypes.bool,
    isMainButtonDisabled: PropTypes.bool,
    mainHateoasDependency: PropTypes.string,
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
