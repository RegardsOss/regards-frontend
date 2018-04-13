/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import has from 'lodash/has'
import get from 'lodash/get'
import { Card, CardText } from 'material-ui/Card'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'

/**
 * React component to display module administration module.
 * @author Sébastien Binda
 */
class AdminContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfigurationShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.CONF_HEIGHT = `${props.adminForm.currentNamespace}.cssHeight`
    this.CONF_WIDTH = `${props.adminForm.currentNamespace}.cssWidth`
    this.CONF_URL = `${props.adminForm.currentNamespace}.htmlUrl`
  }


  renderHTML() {
    if (has(this.props.adminForm.form, this.CONF_URL)) {
      const renderStyle = {
        width: get(this.props.adminForm.form, this.CONF_WIDTH, '100%'),
        height: get(this.props.adminForm.form, this.CONF_HEIGHT, 100),
      }
      return (
        <div>
          <IFrameURLContentDisplayer
            contentURL={get(this.props.adminForm.form, this.CONF_URL)}
            style={renderStyle}
          />
        </div>
      )
    }
    return null
  }

  render() {
    const { intl } = this.context
    return (
      <Card>
        <CardText>
          <Field
            name={this.CONF_HEIGHT}
            fullWidth
            component={RenderTextField}
            type="text"
            label={intl.formatMessage({ id: 'admin.css.height.label' })}
          />
          <Field
            name={this.CONF_WIDTH}
            fullWidth
            component={RenderTextField}
            type="text"
            label={intl.formatMessage({ id: 'admin.css.width.label' })}
          />
          <Field
            name={this.CONF_URL}
            fullWidth
            component={RenderTextField}
            type="text"
            label={intl.formatMessage({ id: 'admin.html.url' })}
          />
          {this.renderHTML()}
        </CardText>
      </Card>
    )
  }
}

export default AdminContainer
