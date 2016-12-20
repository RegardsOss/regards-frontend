import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { AttributeModel, AttributeModelType } from '@regardsoss/model'
import { map } from 'lodash'
/**
 * Display edit and create attribute model form
 */
export class AttributeModelFormComponent extends React.Component {

  static propTypes = {
    attrModelTypeList: React.PropTypes.arrayOf(AttributeModelType),
    currentAttrModel: AttributeModel,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
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
      this.props.initialize({
        description: currentAttrModel.content.description,
      })
    }
  }


  render() {
    const { attrModelTypeList, pristine, submitting, invalid } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="attrmodel.create.title" /> :
      (<FormattedMessage
        id="attrmodel.edit.title"
        values={{
          name: this.props.currentAttrModel.content.name,
        }}
      />)
    const typeList = [
      {
        content: {
          id: 1,
          name: 'Java',
        },
      },
    ]
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
            <Field
              name="type"
              fullWidth
              component={RenderSelectField}
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

          </CardText>
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

