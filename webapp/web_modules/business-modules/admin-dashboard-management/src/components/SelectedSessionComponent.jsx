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
import find from 'lodash/find'
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
import { CELL_TYPE_ENUM } from '../domain/cellTypes'

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
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isDeleteDialogOpen: false,
  }

  getSessionStep = (selectedSession, stepType) => (find(selectedSession.content.steps, (step) => (step.type === stepType)))

  openDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpen: true,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpen: false,
    })
  }

  renderDeleteDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { selectedSession, deleteSession } = this.props
    const { isDeleteDialogOpen } = this.state
    if (isDeleteDialogOpen) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={formatMessage({ id: 'dashboard.selectedsession.dialog.delete.title' }, { sessionName: selectedSession.content.name })}
          onConfirm={() => deleteSession(selectedSession.content.id)}
          onClose={() => this.closeDeleteDialog()}
        />
      )
    }
    return null
  }

  render() {
    const {
      selectedSession, onSelected, project, relaunchProducts, relaunchAIP, retryRequests,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: {
          headerDivStyle, cardActionDivStyle,
        },
        selectedSession: {
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
              onClick={() => this.openDeleteDialog()}
            />
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'dashboard.selectedsession.close' })}
              mainButtonType="submit"
              mainButtonClick={() => onSelected(null, CELL_TYPE_ENUM.SESSION)}
            />
          </CardActions>
        </div>
        <CardText style={cardTextStyle}>
          <AcquisitionComponent
            project={project}
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.ACQUISITION)}
            relaunchProducts={relaunchProducts}
            retryRequests={retryRequests}
          />
          <ReferencingComponent
            project={project}
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.REFERENCEMENT)}
            relaunchAIP={relaunchAIP}
            retryRequests={retryRequests}
          />
          <ArchivalComponent
            project={project}
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.STORAGE)}
          />
          <DiffusionComponent
            project={project}
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.DISSEMINATION)}
          />
        </CardText>
        {this.renderDeleteDialog()}
      </Card>
    )
  }
}
export default SelectedSessionComponent
