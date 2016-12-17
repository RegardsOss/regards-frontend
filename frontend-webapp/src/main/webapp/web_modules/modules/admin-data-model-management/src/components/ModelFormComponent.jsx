import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderSelectField } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
/**
 * Display edit and create project form
 */
export class ProjectFormComponent extends React.Component {

  static propTypes = {
    currentModel: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        type: React.PropTypes.string,
      }),
    }),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentModel === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentModel } = this.props
      this.props.initialize({
        description: currentModel.content.description,
      })
    }
  }


  render() {
    const { pristine, submitting } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="model.create.title" /> :
      (<FormattedMessage
        id="model.edit.title"
        values={{
          name: this.props.currentModel.content.name,
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
                label={<FormattedMessage id="model.form.name" />}
              />
            </ShowableAtRender>
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="model.form.description" />}
            />
            <ShowableAtRender show={this.state.isCreating}>
              <Field
                name="type"
                fullWidth
                component={RenderSelectField}
                label={<FormattedMessage id="model.form.type" />}
              >
                <MenuItem value="COLLECTION" primaryText={<FormattedMessage id="model.type.collection" />} />
                <MenuItem value="DOCUMENT" primaryText={<FormattedMessage id="model.type.document" />} />
                <MenuItem value="DATA" primaryText={<FormattedMessage id="model.type.data" />} />
                <MenuItem value="DATASET" primaryText={<FormattedMessage id="model.type.dataset" />} />
              </Field>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="model.form.action.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={<FormattedMessage id="model.form.action.cancel" />}
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
  form: 'project-form',
  validate,
})(ProjectFormComponent)

