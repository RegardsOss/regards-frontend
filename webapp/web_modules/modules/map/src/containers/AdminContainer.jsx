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
import get from 'lodash/get'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AceEditorAdapter } from '@regardsoss/adapters'
import { ErrorDecoratorComponent, HelpMessageComponent } from '@regardsoss/components'

/**
 * React component to display module administration. Nota: in this module, configuration is silent (it
 * is directly provided by the server to Mizar library)
 *
 * @author Léo Mieulet
 */
export class AdminContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeConfigurationModuleFields,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Mizar conf field name */
  CONF_MIZAR = `${this.props.adminForm.currentNamespace}.conf`

  /** initial state */
  state = {
    value: JSON.stringify(get(this.props.adminForm.form, this.CONF_MIZAR, {}), null, '\t'),
    jsonValid: true,
  }

  saveChanges = (newConf) => {
    let jsonValid = true
    try {
      this.props.adminForm.changeField(this.CONF_MIZAR, JSON.parse(newConf))
    } catch (e) {
      this.props.adminForm.changeField(this.CONF_MIZAR, {})
      jsonValid = false
    }
    this.setState({
      value: newConf,
      jsonValid,
    })
  }

  render() {
    const { moduleTheme } = this.context
    const { jsonValid } = this.state
    return (
      <Card>
        <CardText>
          <HelpMessageComponent
            message={<FormattedHTMLMessage id="map.admin.info" />}
          />
          {!jsonValid ? (<ErrorDecoratorComponent><FormattedMessage id="map.admin.json-invalid" /></ErrorDecoratorComponent>) : null}
          <br />
          <AceEditorAdapter
            mode="json"
            theme="monokai"
            value={this.state.value}
            showPrintMargin={false}
            style={moduleTheme.mizarConfStyle}
            onChange={this.saveChanges}
            showGutter
            showLineNumbers
            highlightActiveLine
            wrapEnabled
          />
        </CardText>
      </Card>
    )
  }
}

export default AdminContainer
