/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import { themeContextType, withModuleStyle, SwitchThemeDecorator } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from './styles'

/**
* This dialog fits its children height and width
*/
class FitContentDialog extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    contentStyle: PropTypes.object, // allows locally overriding the styles
    // eslint-disable-next-line react/forbid-prop-types
    actionsContainerStyle: PropTypes.object, // allows locally overriding the styles

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    // Others props are used by the Dialog
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      children,
      actionsContainerStyle: customActionsContainerStyle = {},
      contentStyle: customContentStyle = {},
      ...dialogProperties
    } = this.props

    const { fitContentDialog, dialogCommon } = this.context.moduleTheme

    // merge custom and local styles
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const actionsContainerStyle = { // eslint wont fix: merge props and context (accurate only in render)
      customActionsContainerStyle,
      ...dialogCommon.actionsContainerStyle,
    }
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const contentStyle = { // eslint wont fix: merge props and context (accurate only in render)
      customContentStyle,
      ...fitContentDialog.contentStyle,
    }

    return (
      <SwitchThemeDecorator
        useMainTheme
      >
        <Dialog
          paperProps={fitContentDialog.paperProps}
          contentStyle={contentStyle}
          actionsContainerStyle={actionsContainerStyle}
          {...dialogProperties}
        >
          {HOCUtils.renderChildren(children)}
        </Dialog>
      </SwitchThemeDecorator>
    )
  }
}

export default withModuleStyle(styles, true)(FitContentDialog)
