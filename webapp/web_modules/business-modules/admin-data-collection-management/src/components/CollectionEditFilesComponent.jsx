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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { CommonDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EntitiesFilesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import CollectionStepperComponent from './CollectionStepperComponent'

/**
 * React component to list collection files.
 */
export class CollectionEditFilesComponent extends React.Component {
  static propTypes = {
    backURL: PropTypes.string.isRequired,
    linksURL: PropTypes.string.isRequired,
    currentCollection: DataManagementShapes.Collection,
    handleRefreshEntity: PropTypes.func.isRequired,
    handleUpdateEntity: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static allowedDataTypes = [CommonDomain.DATA_TYPES_ENUM.DESCRIPTION, CommonDomain.DATA_TYPES_ENUM.THUMBNAIL]

  render() {
    const {
      backURL, linksURL, currentCollection, handleRefreshEntity, handleUpdateEntity, projectName,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'collection.form.files.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'collection.form.files.subtitle' })}
        />
        <CollectionStepperComponent
          stepIndex={1}
          isEditing
          currentCollectionId={currentCollection.content.id}
          projectName={projectName}
        />
        <CardText>
          <EntitiesFilesFormContainer
            currentEntity={currentCollection}
            allowedDataType={CollectionEditFilesComponent.allowedDataTypes}
            handleRefreshEntity={handleRefreshEntity}
            handleUpdateEntity={handleUpdateEntity}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.files.action.next' })}
            mainButtonUrl={linksURL}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.files.action.cancel' })}
            secondaryButtonUrl={backURL}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionEditFilesComponent
