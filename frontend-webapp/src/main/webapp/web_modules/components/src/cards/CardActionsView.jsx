
import SecondaryActionButtonComponent from './SecondaryActionButtonComponent'
import MainActionButtonComponent from './MainActionButtonComponent'

class CardActionsView extends React.Component {
  static propTypes = {
    secondaryButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    secondaryButtonUrl: React.PropTypes.string,
    secondaryButtonTouchTap: React.PropTypes.func,
    isSecondaryButtonDisabled: React.PropTypes.bool,
    isSecondaryButtonVisible: React.PropTypes.bool,

    mainButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    mainButtonUrl: React.PropTypes.string,
    mainButtonTouchTap: React.PropTypes.func,
    mainButtonType: React.PropTypes.string,
    isMainButtonVisible: React.PropTypes.bool,
    isMainButtonDisabled: React.PropTypes.bool,

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
    const secondaryActionButtonComponent = isVisible ? (<SecondaryActionButtonComponent
      label={this.props.secondaryButtonLabel}
      url={this.props.secondaryButtonUrl}
      onTouchTap={this.props.secondaryButtonTouchTap}
      disabled={this.props.isSecondaryButtonDisabled}
    />) : null

    return (
      <div style={styleCardActions}>
        {secondaryActionButtonComponent}
        <MainActionButtonComponent
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
