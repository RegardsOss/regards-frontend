
import ShowableAtRender from './ShowableAtRender'
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
    return (
      <div style={styleCardActions}>
        <ShowableAtRender
          show={isVisible}
        >
          <SecondaryActionButtonComponent
            label={this.props.secondaryButtonLabel}
            url={this.props.secondaryButtonUrl}
            onTouchTap={this.props.secondaryButtonTouchTap}
          />
        </ShowableAtRender>
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
  secondaryButtonLabel: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.element).isRequired,
  secondaryButtonUrl: React.PropTypes.string.isRequired,
  secondaryButtonTouchTap: React.PropTypes.func.isRequired,
  isSecondaryButtonVisible: React.PropTypes.bool.isRequired,

  mainButtonLabel: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.element).isRequired,
  mainButtonUrl: React.PropTypes.string.isRequired,
  mainButtonTouchTap: React.PropTypes.func.isRequired,
  isMainButtonVisible: React.PropTypes.bool.isRequired,

  /*theme: React.PropTypes.objectOf(React.PropTypes.string).isRequired,*/
}
export default CardActionsView
