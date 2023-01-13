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
import FlatButton from 'material-ui/FlatButton'
import RefreshCircle from 'mdi-material-ui/RefreshCircle'
import Enable from 'mdi-material-ui/Play'
import Disable from 'mdi-material-ui/Stop'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableHeaderOptionGroup, HelpMessageComponent } from '@regardsoss/components'
import { MultiToggleAcquisitionProcessingChainActions } from '../../clients/AcquisitionProcessingChainClient'

const ResourceIconAction = withResourceDisplayControl(FlatButton)

/**
  * @author Théo Lasserre
  */
export class HeaderActionsBarComponent extends React.Component {
  static propTypes = {
    onMultiToggleSelection: PropTypes.func,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
    onToggleAutoRefresh: PropTypes.func.isRequired,
    isAutoRefreshEnabled: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static TOGGLE_MULTIPLE_TARGET = 'ONLY_ACTIVITY'

  /** List of dependencies required for toggling multiple chains state  */
  static TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES = [MultiToggleAcquisitionProcessingChainActions.getDependency(RequestVerbEnum.PATCH)]

  onDisableSelection = () => {
    const { onMultiToggleSelection } = this.props
    onMultiToggleSelection(HeaderActionsBarComponent.TOGGLE_MULTIPLE_TARGET, false)
  }

  onEnableSelection = () => {
    const { onMultiToggleSelection } = this.props
    onMultiToggleSelection(HeaderActionsBarComponent.TOGGLE_MULTIPLE_TARGET, true)
  }

  render() {
    const {
      isOneCheckboxToggled, onToggleAutoRefresh, isAutoRefreshEnabled,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { chains: { headerActionBarStyle } } } = this.context
    return (
      <div style={headerActionBarStyle}>
        <HelpMessageComponent
          message={formatMessage({ id: 'acquisition-product.help.deletion.message' })}
        />
        <TableHeaderOptionGroup>
          <FlatButton
            icon={<RefreshCircle />}
            label={formatMessage({ id: 'acquisition-chain.list.refresh.auto.label' })}
            secondary={!isAutoRefreshEnabled}
            onClick={onToggleAutoRefresh}
          />
          <ResourceIconAction
            label={formatMessage({ id: 'acquisition-chain.list.disable-selected.button' })}
            icon={<Disable />}
            onClick={this.onDisableSelection}
            disabled={!isOneCheckboxToggled}
            resourceDependencies={HeaderActionsBarComponent.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES}
          />
          <ResourceIconAction
            label={formatMessage({ id: 'acquisition-chain.list.enable-selected.button' })}
            icon={<Enable />}
            onClick={this.onEnableSelection}
            disabled={!isOneCheckboxToggled}
            resourceDependencies={HeaderActionsBarComponent.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES}
          />
        </TableHeaderOptionGroup>
      </div>

    )
  }
}
export default HeaderActionsBarComponent
