import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import SecondaryActionButtonComponent from './SecondaryActionButtonComponent'
import MainActionButtonComponent from './MainActionButtonComponent'

class CardActionsView extends React.Component {
  static propTypes = {
    secondaryButtonId: React.PropTypes.string,
    secondaryButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    secondaryButtonUrl: React.PropTypes.string,
    secondaryButtonTouchTap: React.PropTypes.func,
    isSecondaryButtonDisabled: React.PropTypes.bool,
    isSecondaryButtonVisible: React.PropTypes.bool,
    secondaryHateoasDependency: React.PropTypes.string,

    mainButtonId: React.PropTypes.string,
    mainButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    mainButtonUrl: React.PropTypes.string,
    mainButtonTouchTap: React.PropTypes.func,
    mainButtonType: React.PropTypes.string,
    isMainButtonVisible: React.PropTypes.bool,
    isMainButtonDisabled: React.PropTypes.bool,
    mainHateoasDependency: React.PropTypes.string,

    /*theme: React.PropTypes.objectOf(React.PropTypes.string).isRequired,*/
  }

  static defaultProps = {
    isSecondaryButtonVisible: true,
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
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
    const secondaryActionButtonComponent = isVisible ? (
      <HateoasDisplayDecorator
        requiredEndpoints={this.props.secondaryHateoasDependency ? [this.props.secondaryHateoasDependency] : []}
      >
        <SecondaryActionButtonComponent
          id={this.props.secondaryButtonId}
          label={this.props.secondaryButtonLabel}
          url={this.props.secondaryButtonUrl}
          onTouchTap={this.props.secondaryButtonTouchTap}
          disabled={this.props.isSecondaryButtonDisabled}
        />
      </HateoasDisplayDecorator>
    ) : null

    return (
      <div style={styleCardActions}>
        {secondaryActionButtonComponent}
        <HateoasDisplayDecorator
          requiredEndpoints={this.props.mainHateoasDependency ? [this.props.mainHateoasDependency] : []}
        >
          <MainActionButtonComponent
            id={this.props.mainButtonId}
            label={this.props.mainButtonLabel}
            url={this.props.mainButtonUrl}
            onTouchTap={this.props.mainButtonTouchTap}
            type={this.props.mainButtonType}
            isVisible={this.props.isMainButtonVisible}
            disabled={this.props.isMainButtonDisabled}
          />
        </HateoasDisplayDecorator>
      </div>
    )
  }


}

export default CardActionsView
