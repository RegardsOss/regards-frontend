import { map } from 'lodash'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field, ValidationHelpers, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { AttributeModel, Fragment } from '@regardsoss/model'
import MenuItem from 'material-ui/MenuItem'
import NumberRangeComponent, { initializeNumberRangeForm } from './NumberRangeComponent'
import EnumerationComponent, { initializeEnumerationForm } from './EnumerationComponent'
import PatternComponent, { initializePatternForm } from './PatternComponent'
import moduleStyles from '../styles/styles'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

/**
 * Display edit and create attribute model form
 */
export class AttributeModelFormComponent extends React.Component {

  static propTypes = {
    attrModelTypeList: React.PropTypes.arrayOf(React.PropTypes.string),
    attrModelRestrictionList: React.PropTypes.arrayOf(React.PropTypes.string),
    fragmentList: React.PropTypes.objectOf(Fragment),
    currentAttrModel: AttributeModel,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleUpdateAttributeModelRestriction: React.PropTypes.func,
    defaultFragmentName: React.PropTypes.string,
    // on create
    flushAttributeModelRestriction: React.PropTypes.func,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
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

  /**
   * Display a restriction form component
   * @param restrictionName
   * @returns {XML}
   */
  getRestrictionForm = (restrictionName) => {
    switch (restrictionName) {
      case 'INTEGER_RANGE':
        return (
          <NumberRangeComponent type="INTEGER_RANGE" />
        )
      case 'DOUBLE_RANGE':
        return (
          <NumberRangeComponent type="DOUBLE_RANGE" />
        )
      case 'LONG_RANGE':
        return (
          <NumberRangeComponent type="DOUBLE_RANGE" />
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
          <PatternComponent />
        )
      default:
        throw new Error(`The API sent a restriction name ${restrictionName} that is not supported on the frontend`)

    }
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
        fragment: currentAttrModel.content.fragment.name || DEFAULT_FRAGMENT_NAME,
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
      })
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
    input.onChange(value)
    this.props.handleUpdateAttributeModelRestriction(value)
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const { attrModelTypeList, attrModelRestrictionList, fragmentList, pristine, submitting, invalid } = this.props
    const styles = moduleStyles(this.context.muiTheme)
    const title = this.state.isCreating ? <FormattedMessage id="attrmodel.create.title" /> :
      (<FormattedMessage
        id="attrmodel.edit.title"
        values={{
          name: this.props.currentAttrModel.content.name,
        }}
      />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.state.isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="attrmodel.form.name" />}
              />
            </ShowableAtRender>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="attrmodel.form.label" />}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="attrmodel.form.description" />}
            />
            <Field
              name="type"
              fullWidth
              component={RenderSelectField}
              onSelect={this.handleChange}
              label={<FormattedMessage id="attrmodel.form.type" />}
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
              label={<FormattedMessage id="attrmodel.form.fragment" />}
              disabled={!this.state.isCreating}
            >
              <MenuItem
                value={DEFAULT_FRAGMENT_NAME}
                key={DEFAULT_FRAGMENT_NAME}
                primaryText={<FormattedMessage id={`attrmodel.form.fragment.${DEFAULT_FRAGMENT_NAME}`} />}
              />
              {map(fragmentList, (fragment, id) => (
                <MenuItem
                  value={fragment.content.name}
                  key={id}
                  primaryText={`${fragment.content.name}: ${fragment.content.description}`}
                />
              ))}
            </Field>

            <Field
              name="alterable"
              component={RenderCheckbox}
              label={<FormattedMessage id="attrmodel.form.alterable" />}
            />
            <Field
              name="optional"
              component={RenderCheckbox}
              label={<FormattedMessage id="attrmodel.form.optional" />}
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
              mainButtonLabel={<FormattedMessage id="attrmodel.form.action.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="attrmodel.form.action.cancel" />}
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
  if (values.name) {
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
    if (values.name.length < 3) {
      errors.name = 'invalid.min_3_carac'
    }
    if (values.name.length > 32) {
      errors.name = 'invalid.max_32_carac'
    }
  }
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

