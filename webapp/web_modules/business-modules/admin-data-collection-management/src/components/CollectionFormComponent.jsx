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
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  RenderTextField, RenderSelectField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EntitiesAttributesFormContainer, getInitialFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import MenuItem from 'material-ui/MenuItem'
import CollectionStepperComponent from './CollectionStepperComponent'

const lessThan128 = ValidationHelpers.lengthLessThan(128)
const labelValidate = [lessThan128, ValidationHelpers.required]
/**
 * React component to list collections.
 */
export class CollectionFormComponent extends React.Component {
  static propTypes = {
    currentCollection: DataManagementShapes.Collection,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    modelList: DataManagementShapes.ModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isDuplicating: PropTypes.bool,
    handleUpdateModel: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isCreating: isNil(this.props.currentCollection),
    isDuplicating: this.props.isDuplicating,
    isDisplayAttributeValue: !isNil(this.props.currentCollection),
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    let title
    if (this.state.isCreating) {
      title = this.context.intl.formatMessage({ id: 'collection.create.title' })
    } else if (this.state.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'collection.duplicate.title' }, { name: this.props.currentCollection.content.label })
    } else {
      title = this.context.intl.formatMessage({ id: 'collection.edit.title' }, { name: this.props.currentCollection.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentCollection, modelAttributeList } = this.props
      const properties = getInitialFormValues(modelAttributeList, currentCollection)
      const initialValues = {
        providerId: currentCollection.content.feature.providerId,
        label: currentCollection.content.feature.label,
        geometry: currentCollection.content.feature.geometry,
        model: currentCollection.content.feature.model,
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
      modelList, modelAttributeList, submitting, invalid, backUrl, projectName, currentCollection,
    } = this.props
    const {
      isCreating, isDuplicating,
    } = this.state
    const { muiTheme } = this.context
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={// subtitle: show warning when duplicating
              this.context.intl.formatMessage({
                id: isDuplicating ? 'collection.form.duplicate.warning.subtitle' : 'collection.form.subtitle',
              })
}
            subtitleColor={// warning color when duplicating
              isDuplicating ? muiTheme.palette.accent1Color : null
            }
          />
          <CollectionStepperComponent
            currentCollectionId={!isCreating && !isDuplicating ? currentCollection.content.id : null} // available only in edition
            stepIndex={0}
            isEditing={!isCreating && !isDuplicating}
            projectName={projectName}
          />
          <CardText>
            <Field
              name="providerId"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'collection.form.providerId' })}
              disabled={!this.state.isCreating && !this.state.isDuplicating}
              validate={ValidationHelpers.required}
            />
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'collection.form.label' })}
              validate={labelValidate}
            />
            <Field
              name="geometry"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'collection.form.geometry' })}
            />
            <Field
              className="selenium-pickModel"
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'collection.form.model' })}
              disabled={!this.state.isCreating && !this.state.isDuplicating}
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
              isEditing={!this.state.isCreating && !this.state.isDuplicating}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'collection-form',
})(CollectionFormComponent)
