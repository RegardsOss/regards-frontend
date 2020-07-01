/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ModuleIcon, ModuleTitleText } from '@regardsoss/components'
import { ModuleNavigationItem } from '../../../../shapes/Navigation'

/**
 * Main bar module link
 * @author Raphaël Mechali
 */
class MainBarModuleLink extends React.Component {
  static propTypes = {
    item: ModuleNavigationItem.isRequired,
    buildLinkURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      buildLinkURL, item: {
        iconType,
        customIconURL,
        selected,
        title,
        module,
      },
    } = this.props
    const { intl: { locale }, moduleTheme: { user: { navigationItem } } } = this.context
    return (
      <Link to={buildLinkURL(module)}>
        <FlatButton
          label={ModuleTitleText.selectTitle(title, module.description, locale)}
          secondary={selected}
          icon={
            <ModuleIcon
              iconDisplayMode={iconType}
              defaultIconURL={UIDomain.getModuleDefaultIconURL(module.type)}
              customIconURL={customIconURL}
            />
          }
          labelStyle={navigationItem.defaultTextStyle}
        />
      </Link>
    )
  }
}
export default MainBarModuleLink
