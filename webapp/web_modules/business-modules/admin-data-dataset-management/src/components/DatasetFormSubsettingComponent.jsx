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
import map from 'lodash/map'
import get from 'lodash/get'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'

import Subheader from 'material-ui/Subheader'
import { DataManagementShapes } from '@regardsoss/shape'
import TextField from 'material-ui/TextField'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import { DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'
import { SubsettingEditionDataset } from '../shapes/SubsettingsShapes'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'
import DatasetSubsettingTesterIconButton from './DatasetSubsettingTesterIconButton'

/**
 * React component to list datasets.
 */
export class DatasetFormSubsettingComponent extends React.Component {
  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    currentDataset: SubsettingEditionDataset.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleTestSubsetting: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    subsetting: get(this.props.currentDataset, 'content.openSearchSubsettingClause', ''),
  }

  onSubsettingChange = (event, value) => {
    this.setState({
      subsetting: value,
    })
  }

  getTitle = () => {
    const { intl: { formatMessage } } = this.context

    const { isEditing } = this.props
    if (!isEditing) {
      return formatMessage({ id: 'dataset.create.title' })
    }
    return formatMessage({ id: 'dataset.edit.title' }, { name: this.props.currentDataset.content.label })
  }

  getPropertyAttributeName = (attribute) => {
    if (attribute.fragment.name === DEFAULT_FRAGMENT) {
      return `properties.${attribute.name}`
    }
    return `properties.${attribute.fragment.name}.${attribute.name}`
  }

  render() {
    const styleButton = {
      display: 'flex',
      justifyContent: 'flex-end',
    }
    const { subsetting } = this.state
    const {
      currentDataset, modelAttributeList, handleBack, onSubmit, handleTestSubsetting,
    } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Card>
        <CardTitle
          title={this.getTitle()}
          subtitle={formatMessage({ id: 'dataset.form.subsetting.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={1}
          currentDatasetIpId={get(currentDataset, 'content.ipId', '')}
          currentDatasetId={get(currentDataset, 'content.id', '')}
          isEditing={this.props.isEditing}
        />
        <CardText>
          <div className="row">
            <div className="col-sm-30">
              <List>
                <Subheader>{formatMessage({ id: 'dataset.form.subsetting.attributes' })}</Subheader>
                {map(modelAttributeList, (modelAttribute, id) => (
                  <ListItem
                    primaryText={this.getPropertyAttributeName(modelAttribute.content.attribute)}
                    key={id}
                    disabled
                  />
                ))}
              </List>
            </div>
            <div className="col-sm-70">
              <TextField
                hintText={formatMessage({ id: 'dataset.form.subsetting.opensearch' })}
                floatingLabelText={formatMessage({ id: 'dataset.form.subsetting.opensearch' })}
                type="text"
                value={subsetting}
                onChange={this.onSubsettingChange}
                multiLine
                fullWidth
              />
              <div style={styleButton}>
                <DatasetSubsettingTesterIconButton
                  currentDataset={currentDataset}
                  subsetting={subsetting}
                  handleTestSubsetting={handleTestSubsetting}
                />
              </div>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'dataset.form.subsetting.action.next' })}
            mainButtonClick={() => { onSubmit(this.state.subsetting) }}
            secondaryButtonLabel={formatMessage({ id: 'dataset.form.subsetting.action.cancel' })}
            secondaryButtonClick={handleBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetFormSubsettingComponent
