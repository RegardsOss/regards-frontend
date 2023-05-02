/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { EntitiesFilesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list dataset files.
 */
export class DatasetEditFilesComponent extends React.Component {
  static propTypes = {
    backURL: PropTypes.string.isRequired,
    linksURL: PropTypes.string.isRequired,
    currentDataset: DataManagementShapes.Dataset,
    handleRefreshEntity: PropTypes.func.isRequired,
    handleUpdateEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static allowedDataTypes = [CommonDomain.DATA_TYPES_ENUM.DESCRIPTION, CommonDomain.DATA_TYPES_ENUM.THUMBNAIL, CommonDomain.DATA_TYPES_ENUM.RAWDATA]

  render() {
    const {
      backURL, linksURL, currentDataset, handleRefreshEntity, handleUpdateEntity,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.files.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.form.files.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={2}
          currentDatasetIpId={currentDataset.content.feature.id}
          currentDatasetId={currentDataset.content.id}
          isEditing
        />
        <CardText>
          <EntitiesFilesFormContainer
            currentEntity={currentDataset}
            allowedDataType={DatasetEditFilesComponent.allowedDataTypes}
            handleRefreshEntity={handleRefreshEntity}
            handleUpdateEntity={handleUpdateEntity}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.files.action.next' })}
            mainButtonUrl={linksURL}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.files.action.cancel' })}
            secondaryButtonUrl={backURL}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditFilesComponent
