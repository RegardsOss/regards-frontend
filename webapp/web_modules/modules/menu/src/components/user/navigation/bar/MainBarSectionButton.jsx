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
import { ModuleTitleText, ModuleIcon } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { SectionNavigationItem } from '../../../../shapes/Navigation'
import MainBarDropMenuButton from './MainBarDropMenuButton'
import defaultSectionIconURL from '../../../../img/section.svg'

/**
 * Section drop down button for the main bar
 * @author Raphaël Mechali
 */
class MainBarSectionButton extends React.Component {
  static propTypes = {
    item: SectionNavigationItem.isRequired,
    buildLinkURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { item, buildLinkURL } = this.props
    const { intl: { locale } } = this.context
    return (
      <MainBarDropMenuButton
        label={ModuleTitleText.selectTitle(item.title, '', locale)}
        icon={
          <ModuleIcon
            iconDisplayMode={item.iconType}
            defaultIconURL={defaultSectionIconURL}
            customIconURL={item.customIconURL}
          />
        }
        items={item.children}
        buildLinkURL={buildLinkURL}
      />
    )
  }
}
export default MainBarSectionButton
