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
import { Card, CardActions, CardMedia } from 'material-ui/Card'
import { LTAShapes } from '@regardsoss/shape'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'

/**
  * ViewMessageDialog
  * @author Théo Lasserre
  */
export class ViewMessageDialog extends React.Component {
  static propTypes = {
    entity: LTAShapes.Request.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl, moduleTheme: { dialogStyle } } = this.context
    return (
      <Dialog
        title={intl.formatMessage({ id: 'lta.table.actions.view.message.tooltip' })}
        open
      >
        <Card>
          <CardMedia>
            <CodeFileDisplayer
              content={JSON.stringify(entity.content.message, null, '\t')}
              contentType={MIME_TYPES.JSON_MIME_TYPE}
              style={dialogStyle}
            />
          </CardMedia>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'lta.table.actions.dialog.close' })}
              mainButtonClick={this.props.onClose}
            />
          </CardActions>
        </Card>
      </Dialog>

    )
  }
}
export default ViewMessageDialog
