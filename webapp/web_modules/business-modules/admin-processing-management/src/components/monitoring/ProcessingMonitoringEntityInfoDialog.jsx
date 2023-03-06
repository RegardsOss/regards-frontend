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
import { ProcessingShapes } from '@regardsoss/shape'
import { ContentDisplayDialog } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../../styles'

/**
 * Info dialog for ProcessingMonitoring component
 * @author Théo Lasserre
 */
export class ProcessingMonitoringEntityInfoDialog extends React.Component {
  static propTypes = {
    processing: ProcessingShapes.ProcessingMonitoring,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { processing, onClose } = this.props
    const { intl: { formatMessage } } = this.context
    if (!processing) {
      return null
    }
    const message = processing.content.steps.length > 0
      ? processing.content.steps[processing.content.steps.length - 1].message
      : ''
    let titleId = 'processing.monitoring.list.tooltip.no.info.title'
    if (message !== '') {
      titleId = 'processing.monitoring.list.tooltip.info.title'
    }

    return (
      <ContentDisplayDialog
        displayedContent={message}
        title={formatMessage({ id: titleId }, { name: processing.content.processName })}
        onClose={onClose}
      />
    )
  }
}

export default withModuleStyle(styles)(ProcessingMonitoringEntityInfoDialog)
