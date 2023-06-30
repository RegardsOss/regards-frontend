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
import filter from 'lodash/filter'
import {
  Card, CardText,
} from 'material-ui/Card'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { CardHeaderActions } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AcquisitionComponent from './AcquisitionComponent'
import ReferencingComponent from './ReferencingComponent'
import ArchivalComponent from './ArchivalComponent'
import DiffusionComponent from './DiffusionComponent'

/**
 * SelectedSessionComponent
 * @author Théo Lasserre
 */
class SelectedSessionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    onSelected: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    retryWorkerRequests: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getSessionSteps = (selectedSession, stepType) => (filter(selectedSession.content.steps, (step) => (step.type === stepType)))

  handleCloseSessionSelected = () => {
    const { onSelected } = this.props
    onSelected(null, AdminDomain.SESSION_FILTER_PARAMS.SELECTED_SESSION)
  }

  render() {
    const {
      selectedSession, project, relaunchProducts, relaunchAIP, retryWorkerRequests, relaunchStorages, retryFEMRequests,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        selectedSessionStyle: {
          cardTextStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <CardHeaderActions
          title={formatMessage({ id: 'dashboard.selectedsession.title' }, { source: selectedSession.content.source, session: selectedSession.content.name })}
          mainButtonLabel={formatMessage({ id: 'dashboard.selectedsession.close' })}
          mainButtonType="submit"
          mainButtonClick={this.handleCloseSessionSelected}
        />
        <CardText style={cardTextStyle}>
          <AcquisitionComponent
            project={project}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.ACQUISITION)}
            relaunchProducts={relaunchProducts}
            retryWorkerRequests={retryWorkerRequests}
          />
          <ReferencingComponent
            project={project}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.REFERENCING)}
            relaunchAIP={relaunchAIP}
            retryFEMRequests={retryFEMRequests}
          />
          <ArchivalComponent
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.STORAGE)}
            relaunchStorages={relaunchStorages}
          />
          <DiffusionComponent
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.DISSEMINATION)}
          />
        </CardText>
      </Card>
    )
  }
}
export default SelectedSessionComponent
