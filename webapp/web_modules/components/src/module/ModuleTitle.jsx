/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ExpandedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import CollapsedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import ModuleTitleText from './ModuleTitleText'
import ModuleSubtitle from './ModuleSubtitle'
import ModuleIcon from './ModuleIcon'

/**
* Common dynamic modules title (when not using a breadcrumb)
* @author Raphaël Mechali
*/
export class ModuleTitle extends React.Component {
  static propTypes = {
    // module type (from Module fields)
    type: PropTypes.string.isRequired,
    // current locale if any
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    // desctiption (from Module fields)
    description: PropTypes.string,
    // module page (from module fields)
    page: PropTypes.shape({
      home: PropTypes.bool,
      iconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
      customIconURL: PropTypes.string,
      title: PropTypes.objectOf(PropTypes.string),
    }),
    // Title component: when provided, it replaces the module title and icon
    titleComponent: PropTypes.node,
    // is expandable? (from module fields)
    expandable: PropTypes.bool.isRequired,
    // is expanded?
    expanded: PropTypes.bool.isRequired,
    // optional module subtitle
    subtitle: PropTypes.string,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
    // callback: on expand changed
    onExpandChange: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      type, locale, page, description, subtitle, titleComponent,
      options, expandable, expanded, onExpandChange,
    } = this.props
    const {
      moduleTheme: {
        module: {
          cardHeaderStyle, cardHeaderContentStyle,
          titleBarDivStyle, titleDivStyle, optionsDivStyle,
          moduleTitle,
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
                titleComponent || (
                  <div style={moduleTitle.style}>
                    <div style={moduleTitle.iconContainer}>
                      <ModuleIcon
                        iconDisplayMode={get(page, 'iconType', AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT)}
                        defaultIconURL={UIDomain.getModuleDefaultIconURL(type)}
                        customIconURL={get(page, 'customIconURL')}
                        style={moduleTitle.iconStyle}
                      />
                    </div>
                    <div style={moduleTitle.labelStyle}>
                      <ModuleTitleText
                        title={get(page, 'title')}
                        description={description}
                        locale={locale}
                      />
                    </div>
                  </div>)
              }
            </div>
            {/* 2 Options (with collapse if available) */
              <div style={optionsDivStyle}>
                { // provided module options
                  options
                }
                { // expand collapse option when available
                  expandable ? (
                    <IconButton key="expand.collapse" onClick={onExpandChange}>
                      {
                        expanded ? <ExpandedIcon /> : <CollapsedIcon />
                      }
                    </IconButton>) : null
                }
              </div>
            }
          </div>
        }
        subtitle={<ModuleSubtitle text={subtitle} />}
      />
    )
  }
}
export default ModuleTitle
