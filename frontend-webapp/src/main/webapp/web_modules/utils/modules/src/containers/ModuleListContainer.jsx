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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { AccessProjectClient } from '@regardsoss/client'
import LayoutSelector from '../model/LayoutSelector'
import ModuleListComponent from '../components/ModuleListComponent'
import messages from '../i18n'

const moduleSelectors = AccessProjectClient.ModuleSelectors()

// TODO delete me

/**
 * Display the menu with all modules of the dynamic container.
 * @author Sébastien Binda
 */
class ModuleListContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onCloseMenu: PropTypes.func,
    modules: AccessShapes.ModuleList,
    container: AccessShapes.ContainerContent,
  }

  render() {
    if (!this.props.container) {
      return null
    }
    return (
      <I18nProvider messages={messages}>
        <ModuleListComponent
          project={this.props.project}
          open={this.props.open}
          modules={values(this.props.modules)}
          onCloseMenu={this.props.onCloseMenu}
          container={this.props.container.id}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  modules: moduleSelectors.getList(state),
  container: LayoutSelector.getDynamicContainer(state, 'user'),
})

export default connect(mapStateToProps)(ModuleListContainer)
