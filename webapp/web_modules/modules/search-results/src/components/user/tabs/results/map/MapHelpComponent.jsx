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
import { themeContextType } from '@regardsoss/theme'
import IconButton from 'material-ui/IconButton'
import Remove from 'mdi-material-ui/CloseCircleOutline'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import {
  MainActionButtonComponent, ShowableAtRender,
} from '@regardsoss/components'
import root from 'window-or-global'

import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AccessProjectClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import MapToponymHelpComponent from './help/MapToponymHelpComponent'
import MapDrawHelpComponent from './help/MapDrawHelpComponent'
import MapUploadHelpComponent from './help/MapUploadHelpComponent'
import { searchToponymActions } from '../../../../../clients/SearchToponymClient'

const MapToponymHelpWithResourceDisplayControl = withResourceDisplayControl(MapToponymHelpComponent)
const MapUploadHelpWithResourceDisplayControl = withResourceDisplayControl(MapUploadHelpComponent)
const uploadToponymActions = new AccessProjectClient.UploadToponymActions('unused')
/**
 * Map view helper
 * @author Léo Mieulet
 */
class MapHelpComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static LOCAL_STORAGE_KEY = 'mapHelp'

  state = {
    show: root.localStorage.getItem(MapHelpComponent.LOCAL_STORAGE_KEY) === null,
  }

  handleEditLSThenClose = () => {
    root.localStorage.setItem(MapHelpComponent.LOCAL_STORAGE_KEY, false)
    this.handleClose()
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    const { show } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          mapViewStyles: {
            help,
          },
        },
      },
    } = this.context
    return (
      <ShowableAtRender show={show}>
        <div style={help.wrapper}>
          <div style={help.title.wrapper}>
            <div style={help.title.leftStub} />
            <div style={help.title.titleText}>
              {formatMessage({ id: 'results.map.help.title' })}
            </div>
            <IconButton
              title={formatMessage({ id: 'results.map.help.tooltip.close' })}
              onClick={this.handleClose}
              iconStyle={help.title.closeIcon}
              style={help.title.closeButton}
            >
              <Remove />
            </IconButton>
          </div>
          <div style={help.main.wrapper}>
            <div style={help.main.itemsWrapper}>
              <MapToponymHelpWithResourceDisplayControl
                resourceDependencies={searchToponymActions.getDependency(RequestVerbEnum.GET_LIST)}
              />
              <MapDrawHelpComponent />
              <MapUploadHelpWithResourceDisplayControl
                resourceDependencies={uploadToponymActions.getDependency(RequestVerbEnum.POST)}
              />
            </div>
          </div>
          <div style={help.action.wrapper}>
            <MainActionButtonComponent
              label={formatMessage({ id: 'results.map.help.action.close' })}
              onClick={this.handleEditLSThenClose}
            />
          </div>
        </div>
      </ShowableAtRender>
    )
  }
}
export default MapHelpComponent
