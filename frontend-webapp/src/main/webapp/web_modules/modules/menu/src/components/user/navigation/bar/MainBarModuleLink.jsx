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
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { UIDomain } from '@regardsoss/domain'
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
    locale: PropTypes.string,
    buildModuleURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      locale, buildModuleURL, item: {
        iconType,
        customIconURL,
        selected,
        module: {
          title, id, type, description,
        },
      },
    } = this.props
    const { moduleTheme: { user: { navigationItem } } } = this.context

    return (
      <Link to={buildModuleURL(id)} >
        <FlatButton
          label={ModuleTitleText.selectTitle(title, description, locale)}
          secondary={selected}
          icon={
            <ModuleIcon
              iconDisplayMode={iconType}
              defaultIconURL={UIDomain.getModuleDefaultIconURL(type)}
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
