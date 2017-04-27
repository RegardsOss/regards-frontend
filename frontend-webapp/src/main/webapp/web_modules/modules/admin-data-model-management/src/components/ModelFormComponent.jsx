import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderFileField, Field, RenderSelectField, reduxForm } from '@regardsoss/form-utils'
import { Model } from '@regardsoss/model'
import MenuItem from 'material-ui/MenuItem'
/**
 * Display edit and create project form
 */
export class ProjectFormComponent extends React.Component {

  static propTypes = {
    currentModel: Model,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    isCreating: React.PropTypes.bool.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    if (this.props.isCreating) {
      return (<FormattedMessage id="model.create.title" />)
    }
    if (this.props.isEditing) {
      return (<FormattedMessage
        id="model.edit.title"
        values={{
          name: this.props.currentModel.content.name,
        }}
      />)
    }
    return (<FormattedMessage
      id="model.duplicate.title"
      values={{
        name: this.props.currentModel.content.name,
      }}
    />)
  }

  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentModel } = this.props
      this.props.initialize({
        description: currentModel.content.description,
        name: currentModel.content.name,
      })
    }
  }

  render() {
    const { pristine, submitting, isCreating, isEditing } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={!isEditing}>
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
            <ShowableAtRender show={isCreating}>
              <div>
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
                <hr />
                <br />
                <FormattedMessage id="model.form.file" />
                <Field
                  name="file"
                  fullWidth
                  component={RenderFileField}
                  accept=".xml"
                />
              </div>
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
    if (values.name.length < 3) {
      errors.name = 'invalid.too_short'
    }
  }
  return errors
}

export default reduxForm({
  form: 'model-form',
  validate,
})(ProjectFormComponent)

