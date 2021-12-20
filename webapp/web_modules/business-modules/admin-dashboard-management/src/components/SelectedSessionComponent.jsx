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
import filter from 'lodash/filter'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AcquisitionComponent from './AcquisitionComponent'
import ReferencingComponent from './ReferencingComponent'
import ArchivalComponent from './ArchivalComponent'
import DiffusionComponent from './DiffusionComponent'
import { ENTITY_ENUM } from '../domain/entityTypes'

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
    deleteSession: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isDeleteDialogOpen: false,
  }

  getSessionSteps = (selectedSession, stepType) => (filter(selectedSession.content.steps, (step) => (step.type === stepType)))

  toggleDeleteDialog = () => {
    const { isDeleteDialogOpen } = this.state
    this.setState({
      isDeleteDialogOpen: !isDeleteDialogOpen,
    })
  }

  handleDeleteSession = () => {
    const { selectedSession, deleteSession } = this.props
    deleteSession(selectedSession.content.id)
  }

  handleCloseSessionSelected = () => {
    const { onSelected } = this.props
    onSelected(null, ENTITY_ENUM.SESSION)
  }

  renderDeleteDialog = () => {
    const { intl: { formatMessage } } = this.context
    const {
      selectedSession,
    } = this.props
    const { isDeleteDialogOpen } = this.state
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.DELETE}
        title={formatMessage({ id: 'dashboard.selectedsession.dialog.delete.title' }, { sessionName: selectedSession.content.name })}
        message={formatMessage({ id: 'dashboard.selectedsession.dialog.delete.message' })}
        onConfirm={this.handleDeleteSession}
        open={isDeleteDialogOpen}
        onClose={this.toggleDeleteDialog}
      />
    )
  }

  render() {
    const {
      selectedSession, project, relaunchProducts, relaunchAIP, retryWorkerRequests, relaunchStorages, retryFEMRequests,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: {
          headerDivStyle, cardActionDivStyle,
        },
        selectedSessionStyle: {
          deleteButtonStyle, cardTextStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <div style={headerDivStyle}>
          <CardTitle
            title={formatMessage({ id: 'dashboard.selectedsession.title' }, { source: selectedSession.content.source, session: selectedSession.content.name })}
          />
          <CardActions style={cardActionDivStyle}>
            <FlatButton
              label={formatMessage({ id: 'dashboard.selectedsession.delete' })}
              style={deleteButtonStyle}
              onClick={this.toggleDeleteDialog}
            />
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'dashboard.selectedsession.close' })}
              mainButtonType="submit"
              mainButtonClick={this.handleCloseSessionSelected}
            />
          </CardActions>
        </div>
        <CardText style={cardTextStyle}>
          <AcquisitionComponent
            project={project}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.ACQUISITION)}
            relaunchProducts={relaunchProducts}
            selectedSession={selectedSession}
            retryWorkerRequests={retryWorkerRequests}
          />
          <ReferencingComponent
            project={project}
            selectedSession={selectedSession}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.REFERENCING)}
            relaunchAIP={relaunchAIP}
            retryFEMRequests={retryFEMRequests}
          />
          <ArchivalComponent
            project={project}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.STORAGE)}
            relaunchStorages={relaunchStorages}
          />
          <DiffusionComponent
            project={project}
            sessionSteps={this.getSessionSteps(selectedSession, AdminDomain.STEP_TYPE_ENUM.DISSEMINATION)}
          />
        </CardText>
        {this.renderDeleteDialog()}
      </Card>
    )
  }
}
export default SelectedSessionComponent
