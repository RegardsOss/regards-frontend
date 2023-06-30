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
import DuplicateIcon from 'mdi-material-ui/ContentCopy'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { ThemeActions, themeContextType } from '@regardsoss/theme'
import { ResourceIconAction } from '@regardsoss/components'

/**
 * Duplicate option for list
 * @author Raphaël Mechali
 */
class DuplicateOptionComponent extends React.Component {
  static propTypes = {
    theme: AccessShapes.Theme.isRequired,
    onDuplicate: PropTypes.func.isRequired, // callback like: theme ID => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Endpoint required to create a theme */
  static CREATE_DEPENDENCIES = [ThemeActions.getDependency(RequestVerbEnum.POST)]

  /**
   * User callback: on duplicate
   */
  onDuplicate = () => {
    const { theme, onDuplicate } = this.props
    onDuplicate(theme.content.id)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { themeList } } = this.context
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'theme.list.tooltip.duplicate' })}
        resourceDependencies={DuplicateOptionComponent.CREATE_DEPENDENCIES}
        onClick={this.onDuplicate}
      >
        <DuplicateIcon hoverColor={themeList.hoverColor.duplicate} />
      </ResourceIconAction>
    )
  }
}
export default DuplicateOptionComponent
