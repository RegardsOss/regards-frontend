/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DetailIcon from 'mdi-material-ui/InformationOutline'
import IconButton from 'material-ui/IconButton'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Info Icon component for entity monitoring
 * @author Théo Lasserre
 */
class ProccesingMonitoringInfo extends React.Component {
  static propTypes = {
    entity: ProcessingShapes.ProcessingMonitoring,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { iconStyle, buttonStyle },
      moduleTheme,
    } = this.context
    const {
      entity, entity: { content }, onClick,
    } = this.props

    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'processing.monitoring.list.tooltip.info.button' })}
        iconStyle={iconStyle}
        style={buttonStyle}
        onClick={() => onClick(entity)}
      >
        <DetailIcon hoverColor={moduleTheme.hoverButtonEdit} />
      </IconButton>
    )
  }
}

export default ProccesingMonitoringInfo
