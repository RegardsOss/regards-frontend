/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { CommonShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import PositionedDialog from './PositionedDialog'
import ContentLoadingComponent from '../content/feedback/ContentLoadingComponent'

import styles from './styles'

/**
 * Shows loadable children in a dialog. Must be driven using loaded true / false
 * @author Raphaël Mechali
 */
export class LoadableContentDialogContainer extends React.Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static VISIBLE_STYLES = { display: 'flex', flexGrow: 1, flexShrink: 1 }

  static HIDDEN_STYLES = { display: 'none', flexGrow: 0, flexShrink: 0 }

  render() {
    const {
      loaded, dialogHeightPercent, dialogWidthPercent, children, ...dialogProperties
    } = this.props
    return (
      <PositionedDialog
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        autoScrollBodyContent
        {...dialogProperties}
      >
        {
          loaded ? null : <ContentLoadingComponent />
        }
        <div style={loaded ? LoadableContentDialogContainer.VISIBLE_STYLES : LoadableContentDialogContainer.HIDDEN_STYLES}>
          {
            HOCUtils.renderChildren(children)
          }
        </div>
      </PositionedDialog>
    )
  }
}
export default withModuleStyle(styles)(LoadableContentDialogContainer)
