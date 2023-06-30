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
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ExpandedIcon from 'mdi-material-ui/ChevronUp'
import CollapsedIcon from 'mdi-material-ui/ChevronDown'
import MaximizeIcon from 'mdi-material-ui/Fullscreen'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import ModuleSubtitle from './ModuleSubtitle'
import { DefaultModuleTitleComponent } from './DefaultModuleTitleComponent'

/**
* Common dynamic modules title (when not using a breadcrumb)
* @author Raphaël Mechali
*/
export class ModuleTitle extends React.Component {
  static propTypes = {
    // module type (from Module fields)
    type: PropTypes.string.isRequired,
    // desctiption (from Module fields)
    description: PropTypes.string,
    // module page (from module fields)
    page: PropTypes.shape({
      home: PropTypes.bool,
      iconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
      customIconURL: PropTypes.string,
      title: PropTypes.objectOf(PropTypes.string),
    }),
    // Should show layout options?
    showLayoutOptions: PropTypes.bool.isRequired,
    // Title component: when provided, it replaces the module title and icon
    titleComponent: PropTypes.node,
    // is expandable? (from module fields)
    expandable: PropTypes.bool.isRequired,
    // current presentation state
    presentationState: PropTypes.oneOf(UIDomain.PRESENTATION_STATE).isRequired,
    // optional module subtitle
    subtitle: PropTypes.string,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
    // callback: on expand changed
    onSetMinimized: PropTypes.func.isRequired,
    onSetNormalState: PropTypes.func.isRequired,
    onSetMaximized: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Renders layout options for component
   */
  renderLayoutOptions = () => {
    const {
      expandable, showLayoutOptions, presentationState, onSetMaximized, onSetMinimized, onSetNormalState,
    } = this.props
    const { moduleTheme: { module: { layoutOptionsStyle, layoutOptionsIconStyle, selectedLayoutOptionsColor } } } = this.context
    if (!showLayoutOptions) {
      return null
    }
    const isMinimized = presentationState === UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED
    const isMaximized = presentationState === UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED
    const options = []
    // first option: normal state when minimied, minimize otherwise - hidden when not expandable
    if (expandable) {
      options.push(
        <IconButton
          key="collapse.option"
          style={layoutOptionsStyle}
          iconStyle={layoutOptionsIconStyle}
          onClick={isMinimized ? onSetNormalState : onSetMinimized}
        >
          {isMinimized ? <CollapsedIcon /> : <ExpandedIcon />}
        </IconButton>)
    }
    // second option: normal state when maximized, maximize otherwise (note: when maximized, draw same button as selected)
    options.push(
      <IconButton
        key="maximize.option"
        style={layoutOptionsStyle}
        iconStyle={layoutOptionsIconStyle}
        onClick={isMaximized ? onSetNormalState : onSetMaximized}
      >
        <MaximizeIcon color={isMaximized ? selectedLayoutOptionsColor : null} />
      </IconButton>)

    return options
  }

  render() {
    const {
      type, page, description,
      subtitle, titleComponent, options,
    } = this.props
    const {
      moduleTheme: {
        module: {
          cardHeaderStyle, cardHeaderContentStyle,
          titleBarDivStyle, titleDivStyle, optionsDivStyle,
        },
      },
    } = this.context
    return (
      <CardHeader
        style={cardHeaderStyle}
        textStyle={cardHeaderContentStyle}
        showExpandableButton={false}
        title={
          <div style={titleBarDivStyle}>
            <div style={titleDivStyle}>
              {/* 1 - Icon and title OR title component when provided */
                titleComponent || (<DefaultModuleTitleComponent
                  type={type}
                  description={description}
                  page={page}
                />)
              }
            </div>
            <div style={optionsDivStyle}>
              { // provided module options
                  options
                }
              { // layout options
                  this.renderLayoutOptions()
                }
            </div>
          </div>
        }
        subtitle={<ModuleSubtitle text={subtitle} />}
      />
    )
  }
}
export default ModuleTitle
