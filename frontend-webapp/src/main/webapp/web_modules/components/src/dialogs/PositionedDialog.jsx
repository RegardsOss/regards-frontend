/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import get from 'lodash/get'
import Dialog from 'material-ui/Dialog'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from './styles'


/**
* A positioned dialog: with and height can be specified as percents. It reports any other
* property to material UI dialog instance
*/
class PositionedDialog extends React.Component {
  static DEFAULT_MIN_WIDTH = 600
  static DEFAULT_MIN_HEIGHT = 320

  static propTypes = {
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    bodyStyle: PropTypes.object, // allows locally overriding the styles
    // eslint-disable-next-line react/forbid-prop-types
    contentStyle: PropTypes.object, // allows locally overriding the styles
    // eslint-disable-next-line react/forbid-prop-types
    actionsContainerStyle: PropTypes.object, // allows locally overriding the styles
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    minWidth: PositionedDialog.DEFAULT_MIN_WIDTH,
    maxWidth: Number.MAX_VALUE,
    minHeight: PositionedDialog.DEFAULT_MIN_HEIGHT,
    maxHeight: Number.MAX_VALUE,
  }

  static contextTypes = {
    ...themeContextType,
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

  getScreenDimensions = () => {
    const documentElement = get(root, 'document.documentElement', {})
    // using body
    if (documentElement) {
      return { width: documentElement.clientWidth, height: documentElement.clientHeight }
    }
    // no info
    return { width: 0, height: 0 }
  }

  getDialogDimensions = () => {
    const {
      dialogWidthPercent, minWidth, maxWidth,
      dialogHeightPercent, minHeight, maxHeight,
    } = this.props
    const screenDim = this.getScreenDimensions()
    return {
      width: this.getDimension(screenDim.width, dialogWidthPercent, minWidth, maxWidth),
      height: this.getDimension(screenDim.height, dialogHeightPercent, minHeight, maxHeight),
    }
  }

  updateDimensions = () => {
    const { contentStyle = {} } = this.props
    const { width, height } = this.getDialogDimensions()
    this.setState({
      layoutStyle: {
        width,
        maxWidth: width,
        height,
        ...contentStyle,
      },
    })
  }

  render() {
    const {
      children, bodyStyle: userBodyStyle = {}, actionsContainerStyle: userActionsContainerStyle = {}, ...dialogProperties
    } = this.props
    const { layoutStyle } = this.state
    const { positionedDialog, dialogCommon } = this.context.moduleTheme

    // merge user and local styles
    const bodyStyle = { ...userBodyStyle, ...positionedDialog.bodyStyle }
    const actionsContainerStyle = { userActionsContainerStyle, ...dialogCommon.actionsContainerStyle }

    return (
      <Dialog
        paperProps={positionedDialog.paperProps}
        contentStyle={layoutStyle}
        bodyStyle={bodyStyle}
        actionsContainerStyle={actionsContainerStyle}
        {...dialogProperties}
      >
        {HOCUtils.renderChildren(children)}
      </Dialog >
    )
  }
}

export default withModuleStyle(styles, true)(PositionedDialog)
