import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { AttributeModel,Fragment } from '@regardsoss/model'
import { map } from 'lodash'
import NumberRangeComponent, { initializeNumberRangeForm } from './NumberRangeComponent'
import EnumerationComponent, { initializeEnumerationForm } from './EnumerationComponent'
import PatternComponent, { initializePatternForm } from './PatternComponent'


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
    defaultFragmentId: React.PropTypes.string,
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
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentAttrModel } = this.props
      let initialValues = {
        name: currentAttrModel.content.name,
        type: currentAttrModel.content.type,
        fragment: currentAttrModel.content.fragment.id,
        description: currentAttrModel.content.description,
        alterable: currentAttrModel.content.alterable,
        optional: currentAttrModel.content.optional,
        queryable: currentAttrModel.content.queryable,
        facetable: currentAttrModel.content.facetable,
        restriction: {},
      }
      if (currentAttrModel.content.restriction) {
        // Fill restriction object
        switch (currentAttrModel.content.restriction.type) {
          case 'INTEGER_RANGE':
            initialValues = initializeNumberRangeForm('INTEGER_RANGE', initialValues, currentAttrModel)
            break
          case 'FLOAT_RANGE':
            initialValues = initializeNumberRangeForm('FLOAT_RANGE', initialValues, currentAttrModel)
            break
          case 'ENUMERATION':
            initialValues = initializeEnumerationForm(initialValues, currentAttrModel)
            break
          case 'PATTERN':
            initialValues = initializePatternForm(initialValues, currentAttrModel)
            break
        }
      }
      this.props.initialize(initialValues)
    } else {
      this.props.flushAttributeModelRestriction()
      this.props.initialize({
        alterable: true,
        queryable: true,
        fragment: parseInt(this.props.defaultFragmentId) || 1,
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
        break
      case 'FLOAT_RANGE':
        return (
          <NumberRangeComponent type="FLOAT_RANGE" />
        )
        break
      case 'ENUMERATION':
        return (
          <EnumerationComponent
            currentAttrModel={this.props.currentAttrModel}
            change={this.props.change}
          />
        )
        break
      case 'PATTERN':
        return (
          <PatternComponent />
        )
        break
      default:
        throw new Error(`The API sent a restriction name ${restrictionName} that is not supported on the frontend`)

    }
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const { attrModelTypeList, attrModelRestrictionList, fragmentList, pristine, submitting, invalid } = this.props
    const style = this.context.muiTheme.layout.cardEspaced
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
              onChange={this.handleChange}
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
              {map(fragmentList, (fragment, id) => (
                <MenuItem
                  value={fragment.content.id}
                  key={id}
                  primaryText={fragment.content.name}
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
            <Field
              name="queryable"
              component={RenderCheckbox}
              label={<FormattedMessage id="attrmodel.form.queryable" />}
            />
            <Field
              name="facetable"
              component={RenderCheckbox}
              label={<FormattedMessage id="attrmodel.form.facetable" />}
            />
          </CardText>
        </Card>
        {map(attrModelRestrictionList, (restriction, id) => (
          <Card style={style} key={id}>
            <CardText>
              {this.getRestrictionForm(restriction)}
            </CardText>
          </Card>
        ))}
        <Card style={style}>
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
    if (!/^[a-zA-Z0-9]+$/i.test(values.name)) {
      errors.name = 'invalid.only_alphanumeric'
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
    const restrictions = ['INTEGER_RANGE', 'FLOAT_RANGE', 'ENUMERATION', 'PATTERN']
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

