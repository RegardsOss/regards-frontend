
import SecondaryActionButtonComponent from './SecondaryActionButtonComponent'
import MainActionButtonComponent from './MainActionButtonComponent'

class CardActionsView extends React.Component {

  static defaultProps = {
    isSecondaryButtonVisible: true,
    isMainButtonVisible: true,
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
    />) : null

    return (
      <div style={styleCardActions}>
        {secondaryActionButtonComponent}
        <MainActionButtonComponent
          label={this.props.mainButtonLabel}
          url={this.props.mainButtonUrl}
          onTouchTap={this.props.mainButtonTouchTap}
          isVisible={this.props.isMainButtonVisible}
        />
      </div>
    )
  }


}


CardActionsView.propTypes = {
  secondaryButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  secondaryButtonUrl: React.PropTypes.string,
  secondaryButtonTouchTap: React.PropTypes.func,
  isSecondaryButtonVisible: React.PropTypes.bool,

  mainButtonLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  mainButtonUrl: React.PropTypes.string,
  mainButtonTouchTap: React.PropTypes.func,
  isMainButtonVisible: React.PropTypes.bool,

  /*theme: React.PropTypes.objectOf(React.PropTypes.string).isRequired,*/
}
export default CardActionsView
