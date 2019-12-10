/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardActions, CardMedia } from 'material-ui/Card'
import { StorageShapes } from '@regardsoss/shape'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'

/**
 * RequestErrorDetailsComponent
 * @author Simon MILHAU
 */
class RequestErrorDetailsComponent extends React.Component {
  static propTypes = {
    entity: StorageShapes.RequestEntity,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl, moduleTheme } = this.context
    return (
      <Card>
        <CardMedia>
          <CodeFileDisplayer
            content={JSON.stringify(entity.content.errors, null, '\t')}
            contentType={MIME_TYPES.JSON_MIME_TYPE}
            style={moduleTheme.aipDetailsStyle}
          />
        </CardMedia>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={intl.formatMessage({ id: 'oais.request.details.button.close' })}
            mainButtonClick={this.props.onClose}
          />
        </CardActions>
      </Card>
    )
  }
}
export default RequestErrorDetailsComponent
