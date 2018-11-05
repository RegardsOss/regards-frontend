/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DamDomain } from '@regardsoss/domain'
import { EntitiesFilesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import DocumentStepperContainer from '../containers/DocumentStepperContainer'

/**
 * React component to list documents files.
 */
export class DocumentEditFilesComponent extends React.Component {
  static propTypes = {
    document: DataManagementShapes.Document,
    backUrl: PropTypes.string.isRequired,
    linksUrl: PropTypes.string.isRequired,
    handleRefreshEntity: PropTypes.func.isRequired,
    handleUpdateEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static rowInputAndButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  static allowedDataTypes = [DamDomain.DATATYPE_ENUM.DOCUMENT]

  render() {
    const {
      document, backUrl, linksUrl, handleRefreshEntity, handleUpdateEntity,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'document.form.files.title' }, { name: document.content.name })}
          subtitle={this.context.intl.formatMessage({ id: 'document.form.files.subtitle' })}
        />
        <DocumentStepperContainer
          stepIndex={1}
          isEditing
          currentDocumentId={document.content.id}
        />
        <CardText>

          <EntitiesFilesFormContainer
            currentEntity={document}
            allowedDataType={DocumentEditFilesComponent.allowedDataTypes}
            handleRefreshEntity={handleRefreshEntity}
            handleUpdateEntity={handleUpdateEntity}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'document.form.files.action.next' })}
            mainButtonUrl={linksUrl}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'document.form.files.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}


export default DocumentEditFilesComponent
