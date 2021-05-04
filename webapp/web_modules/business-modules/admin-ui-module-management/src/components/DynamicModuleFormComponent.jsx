/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'

/**
 * React component to display and configure dynamic module configuration
 * @author Sébastien binda
 */
class DynamicModuleFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired,
    module: AccessShapes.Module,
    adminForm: PropTypes.shape({
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
  }

  state = {
    module: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.adminForm.form || !this.props.adminForm.form.conf) {
      return true
    }
    return !isEqual(this.state, nextState)
      || !isEqual(this.props.adminForm, nextProps.adminForm)
  }

  moduleLoaded = (module) => {
    this.setState({
      module,
    })
  }

  render() {
    const { intl: { formatMessage } } = this.context
    if (!this.props.module && !this.props.module.type) {
      return null
    }
    return (
      <div>
        { /* No configuration common message */
          this.state.module && !this.state.module.adminContainer
            ? formatMessage({ id: 'module.form.module.no.setting.message' })
            : null
        }
        {/* Module loader */}
        <LazyModuleComponent
          project={this.props.project}
          module={this.props.module}
          admin
          adminForm={this.props.adminForm}
          appName={this.props.appName}
          onLoadAction={this.moduleLoaded}
        />
      </div>
    )
  }
}
export default DynamicModuleFormComponent
