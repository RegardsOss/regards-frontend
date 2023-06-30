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
import ContentCopy from 'mdi-material-ui/ContentCopy'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ResourceIconAction } from '@regardsoss/components'
import { uiPluginConfigurationActions } from '../../clients/UIPluginConfigurationClient'

/**
 * Option to edit a configuration in list
 * @author Raphaël Mechali
 */
class DuplicateConfigurationComponent extends React.Component {
  static propTypes = {
    uiPluginConfiguration: AccessShapes.UIPluginConf.isRequired,
    onDuplicate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Required dependency for duplicating */
  static DEPENDENCY = uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)

  /**
   * User callback: duplicate configuration
   */
  onDuplicate = () => {
    const { uiPluginConfiguration, onDuplicate } = this.props
    onDuplicate(uiPluginConfiguration.content.id)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { plugin } } = this.context
    return (
      <ResourceIconAction
        resourceDependencies={DuplicateConfigurationComponent.DEPENDENCY}
        onClick={this.onDuplicate}
        title={formatMessage({ id: 'service.listconf.tooltip.duplicate' })}
      >
        <ContentCopy hoverColor={plugin.duplicateHover} />
      </ResourceIconAction>
    )
  }
}
export default DuplicateConfigurationComponent
