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

import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to display static informations from loaded plugin
 * @author Sébastien Binda
 */
class PluginDefinitionComponent extends React.Component {
  static propTypes = {
    handlePluginValid: PropTypes.func.isRequired,
    plugin: AccessShapes.UIPluginInstanceContent,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static URL_CONTAINER_STYLE= {
    marginTop: 15,
  }

  UNSAFE_componentWillMount() {
    this.props.handlePluginValid(this.props.plugin)
  }

  renderUrlAddress = () => {
    if (this.props.plugin.info.url) {
      return (
        <a href={this.props.plugin.info.url} target="_blank">
          <RaisedButton
            primary
            label={this.context.intl.formatMessage({ id: 'plugin.description.url' })}
          />
        </a>
      )
    }
    return null
  }

  render() {
    const { info } = this.props.plugin
    const title = `${info.name} - version ${info.version} - ${info.license ? info.license : ''}`
    const subtitle = `${info.author ? info.author : ''} - ${info.email ? info.email : ''} - ${info.company ? info.company : ''}`
    return (
      <Card>
        <CardHeader
          title={title}
          subtitle={subtitle}
        />
        <CardText>
          {info.description}
          <div style={PluginDefinitionComponent.URL_CONTAINER_STYLE}>
            {this.renderUrlAddress()}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default PluginDefinitionComponent
