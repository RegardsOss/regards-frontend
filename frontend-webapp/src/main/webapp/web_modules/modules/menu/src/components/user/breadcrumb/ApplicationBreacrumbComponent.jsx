/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import HomeIcon from 'material-ui/svg-icons/action/home'
import SubLevelIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import FlatButton from 'material-ui/FlatButton'
import { AccessShapes } from '@regardsoss/shape'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ModuleTitleText, ModuleIcon } from '@regardsoss/components'

/**
 * Application breadcrumb
 * @author Raphaël Mechali
 */
class ApplicationBreacrumbComponent extends React.Component {
  static propTypes = {
    homeLabel: PropTypes.string.isRequired,
    homeURL: PropTypes.string.isRequired,
    selectedModule: AccessShapes.Module,
    locale: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      homeLabel, homeURL, selectedModule, locale,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { titleGroup, navigationItem: { defaultTextStyle } } } } = this.context
    return (
      <div style={titleGroup} >
        <Link to={homeURL || null}>
          <FlatButton
            icon={<HomeIcon />}
            label={homeLabel}
            title={formatMessage({ id: 'user.menu.navigate.to.home' })}
            labelStyle={defaultTextStyle}
          />
        </Link>
        { /* show separator if a module is selected */
          selectedModule ? <SubLevelIcon /> : null
        }
        { /* show module level if a module is selected */
          selectedModule ? (
            <FlatButton
              icon={
                <ModuleIcon
                  iconDisplayMode={get(selectedModule, 'content.page.iconType', AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT)}
                  defaultIconURL={UIDomain.getModuleDefaultIconURL(selectedModule.content.type)}
                  customIconURL={get(selectedModule, 'content.page.customIconURL')}
                />
              }
              label={ModuleTitleText.selectTitle(
                get(selectedModule, 'content.page.title'),
                get(selectedModule, 'content.description'),
                locale)}
              title={formatMessage({ id: 'user.menu.navigate.to.home' })}
              labelStyle={defaultTextStyle}
              secondary
            />) : null
        }
      </div>
    )
  }
}
export default ApplicationBreacrumbComponent
