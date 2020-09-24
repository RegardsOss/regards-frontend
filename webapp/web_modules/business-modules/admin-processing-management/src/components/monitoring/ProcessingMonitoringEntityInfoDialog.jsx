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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../../styles'

/**
 * Info dialog for ProcessingMonitoring component
 * @author Théo Lasserre
 */
export class ProcessingMonitoringEntityInfoDialog extends React.Component {
  static propTypes = {
    entity: ProcessingShapes.ProcessingMonitoring,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { entity, onClose } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    if (!entity) {
      return null
    }
    const { message } = entity.content.steps.length > 0 
            ? entity.content.steps[entity.content.steps.length - 1]
            : ''
    let titleId = 'processing.monitoring.list.tooltip.no.info.title'
    if (message !== '') {
      titleId = 'processing.monitoring.list.tooltip.info.title'
    }

    return (
      <Dialog
        actions={<>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'processing.monitoring.list.tooltip.info.close' })}
            primary
            onClick={onClose}
          />
        </>}
        title={formatMessage({ id: titleId }, { name: entity.content.processName })}
        open
        onRequestClose={onClose}
      >
        {
          message !== ''
            ? <div style={moduleTheme.rootStyle}>
              <div style={moduleTheme.labelStyle}>
                {formatMessage({ id: 'processing.monitoring.list.tooltip.info.message.label' })}
              </div>
              <div style={moduleTheme.valueStyle}>
                {message}
              </div>
            </div>
            : null
        }
      </Dialog>
    )
  }
}

export default withModuleStyle(styles)(ProcessingMonitoringEntityInfoDialog)
