/**
 * LICENSE_PLACEHOLDER
 **/
import { withResourceDisplayControl } from '@regardsoss/display-control'
import SecondaryActionButtonComponent from './SecondaryActionButtonComponent'
import MainActionButtonComponent from './MainActionButtonComponent'

const MainActionButtonComponentWithResourceDisplayControl = withResourceDisplayControl(MainActionButtonComponent)
const SecondaryActionButtonComponentWithResourceDisplayControl = withResourceDisplayControl(SecondaryActionButtonComponent)

class CardActionsView extends React.Component {
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
    mainHateoasDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,

    /* theme: PropTypes.objectOf(PropTypes.string).isRequired,*/
  }

  static defaultProps = {
    isSecondaryButtonVisible: true,
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
    mainHateoasDependencies: [],
  }

  render() {
    const styleCardActions = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }
    const isVisible = (
      (this.props.secondaryButtonUrl || this.props.secondaryButtonTouchTap) &&
      this.props.isSecondaryButtonVisible
    )
    const secondaryRequiredEndpoints = this.props.secondaryHateoasDependency ? [this.props.secondaryHateoasDependency] : []
    const secondaryActionButtonComponent = isVisible ? (
      <SecondaryActionButtonComponentWithResourceDisplayControl
        resourceDependencies={secondaryRequiredEndpoints}
        className={this.props.secondaryButtonClassName}
        label={this.props.secondaryButtonLabel}
        url={this.props.secondaryButtonUrl}
        onTouchTap={this.props.secondaryButtonTouchTap}
        disabled={this.props.isSecondaryButtonDisabled}
      />
    ) : null

    return (
      <div style={styleCardActions}>
        {secondaryActionButtonComponent}
        <MainActionButtonComponentWithResourceDisplayControl
          resourceDependencies={this.props.mainHateoasDependencies}
          className={this.props.mainButtonClassName}
          label={this.props.mainButtonLabel}
          url={this.props.mainButtonUrl}
          onTouchTap={this.props.mainButtonTouchTap}
          type={this.props.mainButtonType}
          isVisible={this.props.isMainButtonVisible}
          disabled={this.props.isMainButtonDisabled}
        />
      </div>
    )
  }
}

export default CardActionsView
