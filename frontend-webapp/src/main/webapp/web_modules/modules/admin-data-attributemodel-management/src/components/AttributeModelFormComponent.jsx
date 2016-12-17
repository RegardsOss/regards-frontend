import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { AttributeModel } from '@regardsoss/model'

/**
 * Display edit and create attribute model form
 */
export class AttributeModelFormComponent extends React.Component {

  static propTypes = {
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
    const { pristine, submitting, invalid } = this.props
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

