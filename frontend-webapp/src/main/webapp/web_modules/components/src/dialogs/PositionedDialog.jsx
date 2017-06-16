/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import { Percent } from '@regardsoss/model'


/**
* A positioned dialog: with and height can be specified as percents. It reports any other
* property to material UI dialog instance
*/
class PositionedDialog extends React.Component {

  static DEFAULT_MIN_WIDTH = 600
  static DEFAULT_MIN_HEIGHT = 320

  static propTypes = {
    dialogWidthPercent: Percent.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    dialogHeightPercent: Percent.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  static defaultProps = {
    minWidth: PositionedDialog.DEFAULT_MIN_WIDTH,
    maxWidth: Number.MAX_VALUE,
    minHeight: PositionedDialog.DEFAULT_MIN_HEIGHT,
    maxHeight: Number.MAX_VALUE,
  }

  componentWillMount = () => this.updateDimensions()


  componentDidMount = () => {
    root.addEventListener('resize', this.onResize)
  }

  componentWillUnmount = () => {
    root.removeEventListener('resize', this.onResize)
  }

  onResize = () => this.updateDimensions()

  /**
   * Computes a dimension as percent, and return D as : MIN_DIM <= D <= MAX_DIM
   * @param screenDimension  screen dimension
   * @param percentDimension dimension as percent of screen size
   * @param minDimension minimum dimension value
   * @param maxDimension maximum dimension value
   */
  getDimension = (screenDimension, percentDimension, minDimension, maxDimension) =>
    Math.min(maxDimension, Math.max(minDimension, (screenDimension * percentDimension) / 100))


  getDialogDimensions = () => {
    const { dialogWidthPercent, minWidth, maxWidth,
      dialogHeightPercent, minHeight, maxHeight } = this.props
    return {
      width: this.getDimension(root.screen.availWidth, dialogWidthPercent, minWidth, maxWidth),
      height: this.getDimension(root.screen.availHeight, dialogHeightPercent, minHeight, maxHeight),
    }
  }

  updateDimensions = () => {
    const { width, height } = this.getDialogDimensions()
    this.setState({
      contentStyle: {
        width,
        maxWidth: 'none',
      },
      rootContainerStyle: {
        position: 'relative',
        width: '100%',
        height,
      },
    })
  }

  render() {
    const { children, ...dialogProperties } = this.props
    const { contentStyle, rootContainerStyle } = this.state
    return (
      <Dialog
        contentStyle={contentStyle}
        {...dialogProperties}
      >
        <div style={rootContainerStyle} >
          {children}
        </div>
      </Dialog >
    )
  }
}
export default PositionedDialog
