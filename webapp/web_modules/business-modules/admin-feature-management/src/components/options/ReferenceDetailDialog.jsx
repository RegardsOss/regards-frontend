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
import { FemShapes } from '@regardsoss/shape'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'

/**
  * ReferenceDetailDialog
  * @author Théo Lasserre
  */
class ReferenceDetailDialog extends React.Component {
  static propTypes = {
    reference: FemShapes.Reference,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { reference } = this.props
    const { intl, moduleTheme } = this.context
    return (
      <Dialog
        title={intl.formatMessage({ id: 'feature.references.detail.title' })}
        open
      >
        <Card>
          <CardMedia>
            <CodeFileDisplayer
              content={JSON.stringify(reference, null, '\t')}
              contentType={MIME_TYPES.JSON_MIME_TYPE}
              style={moduleTheme.detailsStyle}
            />
          </CardMedia>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'feature.close' })}
              mainButtonClick={this.props.onClose}
            />
          </CardActions>
        </Card>
      </Dialog>

    )
  }
}
export default ReferenceDetailDialog
