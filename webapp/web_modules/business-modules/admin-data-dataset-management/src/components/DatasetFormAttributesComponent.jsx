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
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  RenderTextField, RenderSelectField, Field, ValidationHelpers, reduxForm,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { EntitiesAttributesFormContainer, getInitialFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

const labelValidators = [ValidationHelpers.required, ValidationHelpers.lengthLessThan(128)]

/**
 * React component to list datasets.
 */
export class DatasetFormAttributesComponent extends React.Component {
  static propTypes = {
    currentDataset: DataManagementShapes.Dataset,
    modelList: DataManagementShapes.ModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    handleUpdateModel: PropTypes.func.isRequired,
    currentDatasource: DataManagementShapes.Datasource,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreatinguUsingDatasetValues: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isDisplayAttributeValue: !isNil(this.props.currentDataset),
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    let title
    if (!this.props.isEditing) {
      title = this.context.intl.formatMessage({ id: 'dataset.create.title' })
    } else {
      title = this.context.intl.formatMessage({ id: 'dataset.edit.title' }, { name: this.props.currentDataset.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (this.props.isEditing || this.props.isCreatinguUsingDatasetValues) {
      const { currentDataset, modelAttributeList } = this.props
      const properties = getInitialFormValues(modelAttributeList, currentDataset)
      const initialValues = {
        providerId: currentDataset.content.feature.providerId,
        label: currentDataset.content.feature.label,
        geometry: currentDataset.content.feature.geometry,
        model: currentDataset.content.feature.model,
        properties,
      }
      this.props.initialize(initialValues)
    }
  }

  /**
   * Fetch new attribute model restriction when the Field type change
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleChange = (event, index, value, input) => {
    this.setState({
      isDisplayAttributeValue: true,
    })
    input.onChange(value)
    this.props.handleUpdateModel(value)
  }

  render() {
    const {
      currentDataset, modelList, modelAttributeList, currentDatasource, submitting, invalid, backUrl,
    } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'dataset.form.subtitle' })}
          />
          <DatasetStepperContainer
            stepIndex={0}
            currentDatasetIpId={get(currentDataset, 'content.ipId', '')}
            currentDatasetId={get(currentDataset, 'content.id', '')}
            isEditing={this.props.isEditing}
          />
          <CardText>
            <Field
              name="providerId"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'dataset.form.providerId' })}
              disabled={this.state.isEditing}
              validate={ValidationHelpers.required}
            />
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'dataset.form.label' })}
              validate={labelValidators}
            />
            <SelectField
              floatingLabelText={this.context.intl.formatMessage({ id: 'dataset.form.datasource' })}
              value={currentDatasource.content.businessId}
              fullWidth
              disabled
            >
              <MenuItem
                value={currentDatasource.content.businessId}
                primaryText={currentDatasource.content.label}
              />
            </SelectField>
            <Field
              name="geometry"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'dataset.form.geometry' })}
            />
            <Field
              className="selenium-pickModel"
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'dataset.form.model' })}
              disabled={this.props.isEditing}
              validate={ValidationHelpers.required}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  className={`selenium-pickModel-${model.content.name}`}
                  value={model.content.name}
                  key={id}
                  primaryText={model.content.name}
                />
              ))}
            </Field>
            <EntitiesAttributesFormContainer
              isDisplayAttributeValue={this.state.isDisplayAttributeValue}
              modelAttributeList={modelAttributeList}
              isEditing={this.props.isEditing}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'dataset-attributes-form',
})(DatasetFormAttributesComponent)
