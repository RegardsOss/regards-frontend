/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'

import {
  RenderTextField,
  RenderCheckbox,
  RenderSelectField,
  Field,
  ValidationHelpers,
  reduxForm,
} from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender, HelpMessageComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import MenuItem from 'material-ui/MenuItem'
import { fragmentSelectors } from '../clients/FragmentClient'
import NumberRangeComponent, { initializeNumberRangeForm } from './NumberRangeComponent'
import EnumerationComponent, { initializeEnumerationForm } from './EnumerationComponent'
import PatternComponent, { initializePatternForm } from './PatternComponent'
import moduleStyles from '../styles/styles'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

const nameFieldValidators = [ValidationHelpers.validAlphaNumericUnderscore, ValidationHelpers.lengthMoreThan(3), ValidationHelpers.lengthLessThan(32)]
const lessThan20 = ValidationHelpers.lengthLessThan(20)

/**
 * Display edit and create attribute model form
 */
export class AttributeModelFormComponent extends React.Component {
  static propTypes = {
    attrModelTypeList: PropTypes.arrayOf(PropTypes.string),
    attrModelRestrictionList: PropTypes.arrayOf(PropTypes.string),
    fragmentList: DataManagementShapes.FragmentList,
    currentAttrModel: DataManagementShapes.AttributeModel,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    handleUpdateAttributeModelRestriction: PropTypes.func,
    defaultFragmentName: PropTypes.string,
    // on create
    flushAttributeModelRestriction: PropTypes.func,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentAttrModel === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getFragmentInitialValue = (currentAttrModel) => {
    if (currentAttrModel.content.fragment.name === fragmentSelectors.noneFragmentName) {
      return DEFAULT_FRAGMENT_NAME
    }
    return currentAttrModel.content.fragment.name
  }

  /**
   * Display a restriction form component
   * @param restrictionName
   * @returns {XML}
   */
  getRestrictionForm = (restrictionName) => {
    switch (restrictionName) {
      case 'INTEGER_RANGE':
        return (
          <NumberRangeComponent
            type="INTEGER_RANGE"
            change={this.props.change}
          />
        )
      case 'DOUBLE_RANGE':
        return (
          <NumberRangeComponent
            type="DOUBLE_RANGE"
            change={this.props.change}
          />
        )
      case 'LONG_RANGE':
        return (
          <NumberRangeComponent
            type="LONG_RANGE"
            change={this.props.change}
          />
        )
      case 'ENUMERATION':
        return (
          <EnumerationComponent
            currentAttrModel={this.props.currentAttrModel}
            change={this.props.change}
          />
        )
      case 'PATTERN':
        return (
          <PatternComponent
            change={this.props.change}
          />
        )
      default:
        throw new Error(`The API sent a restriction name ${restrictionName} that is not supported on the frontend`)
    }
  }

  getFragmentItems = (fragmentList) => {
    const fragments = map(fragmentList, (fragment, id) => {
      const text = fragment.content.description ? `${fragment.content.name}: ${fragment.content.description}` : fragment.content.name
      return (
        <MenuItem
          value={fragment.content.name}
          key={id}
          primaryText={text}
        />
      )
    })
    fragments.push(<MenuItem
      value={DEFAULT_FRAGMENT_NAME}
      key={DEFAULT_FRAGMENT_NAME}
      primaryText={this.context.intl.formatMessage({ id: `attrmodel.form.fragment.${DEFAULT_FRAGMENT_NAME}` })}
    />)
    return fragments
  }

  /**
   * Fetch new attribute model restriction when the Field type change
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleChange = (event, index, value, input) => {
    // save the new type of attribute
    input.onChange(value)
    // Remove any restriction already set up
    this.props.change('restriction', null)
    // Fetch corresponding restrictions
    this.props.handleUpdateAttributeModelRestriction(value)
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentAttrModel } = this.props
      let initialValues = {
        name: currentAttrModel.content.name,
        label: currentAttrModel.content.label,
        type: currentAttrModel.content.type,
        unit: currentAttrModel.content.unit,
        fragment: this.getFragmentInitialValue(currentAttrModel),
        description: currentAttrModel.content.description,
        alterable: currentAttrModel.content.alterable,
        optional: currentAttrModel.content.optional,
        restriction: {},
      }
      if (currentAttrModel.content.restriction) {
        // Fill restriction object
        switch (currentAttrModel.content.restriction.type) {
          case 'INTEGER_RANGE':
            initialValues = initializeNumberRangeForm('INTEGER_RANGE', initialValues, currentAttrModel)
            break
          case 'DOUBLE_RANGE':
            initialValues = initializeNumberRangeForm('DOUBLE_RANGE', initialValues, currentAttrModel)
            break
          case 'LONG_RANGE':
            initialValues = initializeNumberRangeForm('LONG_RANGE', initialValues, currentAttrModel)
            break
          case 'ENUMERATION':
            initialValues = initializeEnumerationForm(initialValues, currentAttrModel)
            break
          case 'PATTERN':
            initialValues = initializePatternForm(initialValues, currentAttrModel)
            break
          default:
            throw new Error(`The API sent a restriction name ${currentAttrModel.content.restriction.type} that is not supported on the frontend`)
        }
      }
      this.props.initialize(initialValues)
    } else {
      this.props.flushAttributeModelRestriction()
      this.props.initialize({
        alterable: true,
        optional: false,
        fragment: this.props.defaultFragmentName || DEFAULT_FRAGMENT_NAME,
        unit: 'unitless',
      })
    }
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const {
      attrModelTypeList, attrModelRestrictionList, fragmentList, pristine, submitting, invalid,
    } = this.props
    const styles = moduleStyles(this.context.muiTheme)
    const title = this.state.isCreating ? this.context.intl.formatMessage({ id: 'attrmodel.create.title' }) :
      this.context.intl.formatMessage({ id: 'attrmodel.edit.title' }, { name: this.props.currentAttrModel.content.name })
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.state.isCreating}>
              <HelpMessageComponent
                message={this.context.intl.formatMessage({ id: 'attrmodel.form.info.what-happens-when-you-add-an-attribute-to-fragment-already-used' })}
              />
            </ShowableAtRender>
            <ShowableAtRender show={this.state.isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'attrmodel.form.name' })}
                validate={nameFieldValidators}
              />
            </ShowableAtRender>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.label' })}
              validate={lessThan20}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.description' })}
            />
            <Field
              name="unit"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.unit' })}
            />
            <Field
              name="type"
              fullWidth
              component={RenderSelectField}
              onSelect={this.handleChange}
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.type' })}
              disabled={!this.state.isCreating}
            >
              {map(attrModelTypeList, (type, id) => (
                <MenuItem
                  value={type}
                  key={id}
                  primaryText={type}
                />
              ))}
            </Field>
            <Field
              name="fragment"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.fragment' })}
              disabled={!this.state.isCreating}
            >
              {this.getFragmentItems(fragmentList)}
            </Field>

            <Field
              name="alterable"
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.alterable' })}
            />
            <Field
              name="optional"
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'attrmodel.form.optional' })}
            />
          </CardText>
        </Card>
        {map(attrModelRestrictionList, (restriction, id) => (
          <Card style={styles.cardEspaced} key={id}>
            <CardText>
              {this.getRestrictionForm(restriction)}
            </CardText>
          </Card>
        ))}
        <Card style={styles.cardEspaced}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'attrmodel.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'attrmodel.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  // flag the user if he active two filters on the same time
  if (values.restriction) {
    const restrictions = ['INTEGER_RANGE', 'DOUBLE_RANGE', 'LONG_RANGE', 'ENUMERATION', 'PATTERN']
    const activeRestrictions = []
    restrictions.forEach((value) => {
      if (values.restriction[value] && values.restriction[value].active) {
        activeRestrictions.push(value)
      }
    })
    if (activeRestrictions.length > 1) {
      errors.restriction = {}
      activeRestrictions.forEach((value) => {
        errors.restriction[value] = {}
        errors.restriction[value].active = 'invalid.only_1_restriction_on_the_same_time'
      })
    }
  }
  return errors
}

export default reduxForm({
  form: 'attribute-model-form',
  validate,
})(AttributeModelFormComponent)

