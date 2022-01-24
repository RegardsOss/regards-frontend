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
import Dialog from 'material-ui/Dialog'
import { WorkerShapes } from '@regardsoss/shape'
import { Card, CardActions, CardMedia } from 'material-ui/Card'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import messages from '../../i18n'

/**
 * Display request errors
 * @author Théo Lasserre
 */
export class ErrorDetailsDialog extends React.Component {
  static propTypes = {
    entity: WorkerShapes.Request.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { onClose, entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { dialogsStyle: { errorDetailsStyle } } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'datapreparation.dialogs.errors.title' })}
        open
      >
        <Card>
          <CardMedia>
            <CodeFileDisplayer
              content={JSON.stringify(entity.content.error, null, '\t')}
              contentType={MIME_TYPES.JSON_MIME_TYPE}
              style={errorDetailsStyle}
            />
          </CardMedia>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'datapreparation.dialogs.close' })}
              mainButtonClick={onClose}
            />
          </CardActions>
        </Card>
      </Dialog>
    )
  }
}

export default withI18n(messages)(ErrorDetailsDialog)
