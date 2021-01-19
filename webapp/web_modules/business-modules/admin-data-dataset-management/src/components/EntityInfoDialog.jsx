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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'

export class EntityInfoDialog extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.Dataset,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DATETIME_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  render() {
    const { entity, onClose } = this.props
    const { intl: { formatMessage, formatDate }, moduleTheme } = this.context
    if (!entity) {
      return null
    }

    return (
      <Dialog
        actions={<>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'dataset.info.close' })}
            primary
            onClick={onClose}
          />
        </>}
        title={formatMessage({ id: 'dataset.info.title' }, { name: entity.content.feature.label })}
        open
        onRequestClose={onClose}
      >
        <div style={moduleTheme.rootStyle}>
          <div style={moduleTheme.labelStyle}>
            {formatMessage({ id: 'dataset.info.urn.label' })}
          </div>
          <div style={moduleTheme.valueStyle}>
            {entity.content.ipId}
          </div>
          <div style={moduleTheme.labelStyle}>
            {formatMessage({ id: 'dataset.info.creationdate.label' })}
          </div>
          <div style={moduleTheme.valueStyle}>
            {formatDate(entity.content.creationDate, EntityInfoDialog.DATETIME_OPTIONS)}
          </div>
          <div style={moduleTheme.labelStyle}>
            {formatMessage({ id: 'dataset.info.datamodel.label' })}
          </div>
          <div style={moduleTheme.valueStyle}>
            {entity.content.dataModel}
          </div>
          <div style={moduleTheme.labelStyle}>
            {formatMessage({ id: 'dataset.info.model.label' })}
          </div>
          <div style={moduleTheme.valueStyle}>
            {entity.content.model.name}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withModuleStyle(styles)(EntityInfoDialog)
