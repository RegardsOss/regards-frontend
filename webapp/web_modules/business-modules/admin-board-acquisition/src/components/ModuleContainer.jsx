/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { indexActions } from '../clients/IndexClient'
import ModuleBoardComponent from './ModuleBoardComponent'
import messages from '../i18n'

/**
 * Main container to render for the ingest management module
 */
class ModuleContainer extends React.Component {
  static mapStateToProps = (dispatch, ownProps) => ({
  })

  static mapDispatchToProps = (dispatch, ownProps) => ({
    resetIndex: () => dispatch(indexActions.resetIndex()),
  })

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // From mapDispatchToProps
    resetIndex: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { project } = this.props.params
    return (
      <I18nProvider messages={messages}>
        <ModuleBoardComponent project={project} onResetIndex={this.props.resetIndex} />
      </I18nProvider>
    )
  }
}

export default connect(ModuleContainer.mapStateToProps, ModuleContainer.mapDispatchToProps)(ModuleContainer)
