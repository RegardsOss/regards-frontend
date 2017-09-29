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
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import { Card, CardText } from 'material-ui/Card'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'

/**
 * React component to display and configure dynamic module configuration
 * @author Sébastien binda
 */
class DynamicModuleFormComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired,
    module: AccessShapes.Module,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
  }

  state = {
    moduleLoading: true,
    noAdminComp: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.adminForm.form || !this.props.adminForm.form.conf) {
      return true
    }
    return !isEqual(this.state, nextState) ||
      !isEqual(this.props.adminForm.form.type, nextProps.adminForm.form.type) ||
      !isEqual(this.props.adminForm.form.conf, nextProps.adminForm.form.conf)
  }

  moduleLoaded = (module) => {
    this.setState({
      module,
    })
  }

  render() {
    if (!this.props.module && !this.props.module.type) {
      return null
    }
    let styles = this.props.styles
    if (this.state.module && !this.state.module.adminContainer) {
      // Hide Card element if there is no adminContainer to display for the module specific configuration
      styles = merge({}, styles, { display: 'none' })
    }

    return (
      <Card id="dynamicFields" style={styles}>
        <LazyModuleComponent
          project={this.props.project}
          module={this.props.module}
          admin
          adminForm={this.props.adminForm}
          appName={this.props.appName}
          onLoadAction={this.moduleLoaded}
        />
      </Card>
    )
  }

}
export default DynamicModuleFormComponent
