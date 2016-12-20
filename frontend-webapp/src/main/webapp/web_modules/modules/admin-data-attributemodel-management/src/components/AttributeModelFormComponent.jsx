import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { AttributeModel } from '@regardsoss/model'
import { map } from 'lodash'
import IntegerRangeComponent, { initializeIntegerRangeForm } from './IntegerRangeComponent'
import EnumerationComponent, { initializeEnumerationForm } from './EnumerationComponent'

/**
 * Display edit and create attribute model form
 */
export class AttributeModelFormComponent extends React.Component {

  static propTypes = {
    attrModelTypeList: React.PropTypes.arrayOf(React.PropTypes.string),
    attrModelRestrictionList: React.PropTypes.arrayOf(React.PropTypes.string),
    currentAttrModel: AttributeModel,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleUpdateAttributeModelRestriction: React.PropTypes.func,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
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

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentAttrModel } = this.props
      let initialValues = {
        name: currentAttrModel.content.name,
        type: currentAttrModel.content.type,
        description: currentAttrModel.content.description,
        alterable: currentAttrModel.content.alterable,
        optional: currentAttrModel.content.optional,
        queryable: currentAttrModel.content.queryable,
        facetable: currentAttrModel.content.facetable,
        restriction: {},
      }
      // Fill restriction object
      switch (currentAttrModel.content.type) {
        case 'INTEGER':
          initialValues = initializeIntegerRangeForm(initialValues, currentAttrModel)
          break
      }
      this.props.initialize(initialValues)
    }
  }

  handleChange = (event, index, value, input) => {
    input.onChange(value)
    this.props.handleUpdateAttributeModelRestriction(value)
  }

  getRestrictionForm = (restrictionName) => {
    switch (restrictionName) {
      case 'INTEGER_RANGE':
        return (
          <IntegerRangeComponent />
        )
        break
      case 'ENUMERATION':
        return (
          <EnumerationComponent currentAttrModel={this.props.currentAttrModel} />
        )
        break
      case 'PATTERN':
        return (
          <div>TODO</div>
        )
        break
      default:
        throw new Error(`The API sent a restriction name ${restrictionName} that is not supported on the frontend`)

    }
  }

  render() {
    const { attrModelTypeList, attrModelRestrictionList, pristine, submitting, invalid } = this.props
    const style = {
      marginTop: '20px',
    }
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
            <Field
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="attrmodel.form.name" />}
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
              onChange={this.handleChange}
              label={<FormattedMessage id="attrmodel.form.type" />}
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

function validate(values) {
  const errors = {}
  if (values.name) {
    if (!/^[a-zA-Z0-9]+$/i.test(values.name)) {
      errors.name = 'invalid.only_alphanumeric'
    }
  }
  return errors
}

export default reduxForm({
  form: 'attribute-model-form',
  validate,
})(AttributeModelFormComponent)

