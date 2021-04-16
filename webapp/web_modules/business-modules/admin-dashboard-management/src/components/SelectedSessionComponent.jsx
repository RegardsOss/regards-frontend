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
import IconButton from 'material-ui/IconButton'
import Close from 'mdi-material-ui/Close'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
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
    selectedSession: AdminShapes.Session,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getSessionStep = (selectedSession, stepType) => (find(selectedSession.content.steps, (step) => (step.type === stepType)))

  render() {
    const { selectedSession } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: {
          headerDivStyle, cardTitleStyle, cardActionDivStyle, iconButtonStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <div style={headerDivStyle}>
          <CardTitle
            title={formatMessage({ id: 'dashboard.selectedsession.title' }, { source: selectedSession.content.source, session: selectedSession.content.name })}
            style={cardTitleStyle}
          />
          <CardActions style={cardActionDivStyle}>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'dashboard.selectedsession.delete' })}
              mainButtonType="submit"
            />
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'dashboard.selectedsession.refresh' })}
              mainButtonType="submit"
            />
            <IconButton style={iconButtonStyle}>
              <Close />
            </IconButton>
          </CardActions>
        </div>
        <CardText style={{ display: 'flex', width: '100%' }}>
          <AcquisitionComponent
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.ACQUISITION)}
          />
          <ReferencingComponent
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.REFERENCEMENT)}
          />
          <ArchivalComponent
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.STORAGE)}
          />
          <DiffusionComponent
            sessionStep={this.getSessionStep(selectedSession, AdminDomain.STEP_TYPE_ENUM.DISSEMINATION)}
          />
        </CardText>
      </Card>
    )
  }
}
export default SelectedSessionComponent
