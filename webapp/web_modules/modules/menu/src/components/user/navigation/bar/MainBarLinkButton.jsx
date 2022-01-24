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
import { Link } from 'react-router'
import { ModuleTitleText, ModuleIcon } from '@regardsoss/components'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import startsWith from 'lodash/startsWith'
import { LinkNavigationItem } from '../../../../shapes/Navigation'
import defaultLinkIconURL from '../../../../img/link.svg'

/**
 * Link button for the main bar
 * @author Théo Lasserre
 */
class MainBarLinkButton extends React.Component {
  static propTypes = {
    item: LinkNavigationItem.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { item } = this.props
    const { intl: { locale }, moduleTheme: { user: { navigationItem } } } = this.context
    return (
      <Link to={startsWith(item.url, 'http') || startsWith(item.url, 'https') ? { pathname: item.url } : { pathname: `//${item.url}` }} target="_blank">
        <FlatButton
          label={ModuleTitleText.selectTitle(item.title, '', locale)}
          icon={
            <ModuleIcon
              iconDisplayMode={item.iconType}
              defaultIconURL={defaultLinkIconURL}
              customIconURL={item.customIconURL}
            />
          }
          labelStyle={navigationItem.defaultTextStyle}
        />
      </Link>
    )
  }
}
export default MainBarLinkButton
