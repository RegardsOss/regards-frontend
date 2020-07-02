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
import has from 'lodash/has'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { CardText } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'

/**
 * Component to display a preview of the current search form module
 * @author Sébastien binda
 */
class FormPreviewComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string,
    project: PropTypes.string,
    module: AccessShapes.Module,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    if (this.props.module && this.props.module.type && has(this.props.module, `${this.props.currentNamespace}.layout`)) {
      // Add the preview option to the module conf to not display results, just form
      const conf = cloneDeep(get(this.props.module, this.props.currentNamespace))
      conf.preview = true
      const previewModule = Object.assign({}, this.props.module, { active: true, conf })
      if (!previewModule.description) {
        previewModule.description = 'preview'
      }
      return (
        <CardText>
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
