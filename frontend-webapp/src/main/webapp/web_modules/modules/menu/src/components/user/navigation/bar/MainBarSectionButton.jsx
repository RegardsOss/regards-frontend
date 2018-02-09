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
import { AccessDomain } from '@regardsoss/domain'
import SectionDefaultIcon from 'material-ui/svg-icons/navigation/menu'
import { ModuleTitleText, ModuleIcon } from '@regardsoss/components'
import { SectionNavigationItem } from '../../../../shapes/Navigation'
import MainBarDropMenuButton from './MainBarDropMenuButton'


/**
 * Section drop down button for the main bar
 * @author Raphaël Mechali
 */
class MainBarSectionButton extends React.Component {
  static propTypes = {
    item: SectionNavigationItem.isRequired,
    locale: PropTypes.string,
    buildModuleURL: PropTypes.func.isRequired,
  }

  render() {
    const { item, locale, buildModuleURL } = this.props
    return (
      <MainBarDropMenuButton
        label={ModuleTitleText.selectTitle(item.title, '', locale)}
        icon={
          // render section icon: no default URL (use a default MUI SVG icon instead)
          item.iconType === AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT ?
            <SectionDefaultIcon /> :
            <ModuleIcon
              iconDisplayMode={item.iconType}
              defaultIconURL=""
              customIconURL={item.customIconURL}
            />
        }
        items={item.children}
        locale={locale}
        buildModuleURL={buildModuleURL}
      />
    )
  }
}
export default MainBarSectionButton
