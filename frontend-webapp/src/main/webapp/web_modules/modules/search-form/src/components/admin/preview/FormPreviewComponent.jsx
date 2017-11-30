/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardText } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { Title } from '@regardsoss/components'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'

/**
 * Component to display a preview of the current search form module
 * @author Sébastien binda
 */
class FormPreviewComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    module: AccessShapes.Module,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    if (this.props.module && this.props.module.type && this.props.module.conf && this.props.module.conf.layout) {
      // Add the preview option to the module conf to not display results, just form
      const conf = Object.assign({}, this.props.module.conf)
      conf.preview = true
      const previewModule = Object.assign({}, this.props.module, { active: true, conf })
      if (!previewModule.description) {
        previewModule.description = 'preview'
      }
      return (
        <CardText>
          <Title
            level={3}
            label={this.context.intl.formatMessage({ id: 'form.preview.tab.title' })}
          />
          <LazyModuleComponent
            module={previewModule}
            project={this.props.project}
            appName="admin"
          />
        </CardText>
      )
    }
    return <div>Loading...</div>
  }
}

export default FormPreviewComponent
