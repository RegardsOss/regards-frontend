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
import { CardActionsComponent } from '@regardsoss/components'
import { AceEditorAdapter } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { StorageShapes } from '@regardsoss/shape'

/**
* AIPDetailComponent
 * @author Léo Mieulet
*/
class AIPDetailComponent extends React.Component {
  static propTypes = {
    aip: StorageShapes.AIPContentWithStorages.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { aip } = this.props
    const { intl, moduleTheme } = this.context
    return (
      <Card>
        <CardMedia>
          <AceEditorAdapter
            mode="json"
            theme="monokai"
            value={JSON.stringify(aip, null, '\t')}
            showPrintMargin={false}
            style={moduleTheme.aipDetailsStyle}
            showGutter
            showLineNumbers
            readOnly
            highlightActiveLine
            wrapEnabled
          />
        </CardMedia>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={intl.formatMessage({ id: 'oais.aip.details.button.close' })}
            mainButtonClick={this.props.onClose}
          />
        </CardActions>
      </Card>
    )
  }
}
export default AIPDetailComponent