/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import root from 'window-or-global'
import get from 'lodash/get'
import Dialog from 'material-ui/Dialog'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle, SwitchThemeDecorator } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from './styles'

/**
* A positioned dialog: width and height can be specified as percents. It reports any other
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
    actions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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

  static BORDER_REGEX = new RegExp('^border', 'i');

  UNSAFE_componentWillMount = () => this.updateDimensions()

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
  getDimension = (screenDimension, percentDimension, minDimension, maxDimension) => Math.min(maxDimension, Math.max(minDimension, (screenDimension * percentDimension) / 100))

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
      children, bodyStyle: userBodyStyle, actionsContainerStyle: userActionsContainerStyle, actions, ...dialogProperties
    } = this.props
    const { layoutStyle } = this.state
    const { positionedDialog, dialogCommon } = this.context.moduleTheme

    // merge user and local styles
    const bodyStyle = userBodyStyle ? { ...positionedDialog.bodyStyle, ...userBodyStyle } : positionedDialog.bodyStyle
    const actionsContainerStyle = userActionsContainerStyle
      ? { ...dialogCommon.actionsContainerStyle, ...userActionsContainerStyle }
      : dialogCommon.actionsContainerStyle

    return (
      <SwitchThemeDecorator
        useMainTheme
      >
        <Dialog
          paperProps={positionedDialog.paperProps}
          contentStyle={layoutStyle}
          bodyStyle={bodyStyle}
          actionsContainerStyle={actionsContainerStyle}
          actions={actions}
          {...dialogProperties}
        >
          {HOCUtils.renderChildren(children)}
        </Dialog>
      </SwitchThemeDecorator>
    )
  }
}

export default withModuleStyle(styles, true)(PositionedDialog)
