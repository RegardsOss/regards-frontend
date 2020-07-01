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
import map from 'lodash/map'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Back from 'mdi-material-ui/ArrowLeft'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import ServiceItemComponent from './ServiceItemComponent'

/**
 * Displays the list of PluginDefinition having the type service
 *
 * @author Léo Mieulet
 */
class ServiceListComponent extends React.Component {
  static propTypes = {
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    handleCreate: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      uiPluginDefinitionList, handleOpen, handleCreate, handleBack,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <div>
        <AppBar
          title={formatMessage({ id: 'service.list.title' })}
          iconElementLeft={<IconButton onClick={handleBack}><Back /></IconButton>}
        />
        <div style={moduleTheme.plugins.root}>
          <div style={moduleTheme.plugins.grid}>
            {map(uiPluginDefinitionList, (uiPluginDefinition) => (
              <ServiceItemComponent
                key={uiPluginDefinition.content.id}
                uiPluginDefinition={uiPluginDefinition}
                onOpen={handleOpen}
                onCreate={handleCreate}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceListComponent
