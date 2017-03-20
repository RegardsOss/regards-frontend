/**
 * LICENSE_PLACEHOLDER
 **/
import { map, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Dataset, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetFormSubsettingComponent extends React.Component {

  static propTypes = {
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    currentDataset: Dataset,
    onSubmit: React.PropTypes.func.isRequired,
    handleTestSubsetting: React.PropTypes.func.isRequired,
    handleBack: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    const { isEditing } = this.props
    if (!isEditing) {
      return (<FormattedMessage id="dataset.create.title" />)
    }
    return (<FormattedMessage
      id="dataset.edit.title"
      values={{
        name: this.props.currentDataset.content.label,
      }}
    />)
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (this.props.isEditing) {
      const { currentDataset } = this.props
      const initialValues = {
        subsetting: currentDataset.content.subsetting,
      }
      this.props.initialize(initialValues)
    }
  }

  render() {
    const styleButton = {
      display: 'flex',
      justifyContent: 'flex-end',
    }
    const { modelAttributeList, submitting, invalid, handleBack, onSubmit, handleSubmit, handleTestSubsetting } = this.props
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardTitle
            title={this.getTitle()}
            subtitle={<FormattedMessage id="dataset.form.subsetting.subtitle" />}
          />
          <DatasetStepperComponent stepIndex={1} />
          <CardText>
            <div className="row">
              <div className="col-sm-30">
                <List>
                  <Subheader><FormattedMessage id="dataset.form.subsetting.attributes" /></Subheader>
                  {map(modelAttributeList, (modelAttribute, id) => (
                    <ListItem
                      primaryText={`${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
                      key={id}
                      disabled
                    />
                  ))}
                </List>
              </div>
              <div className="col-sm-70">
                <Field
                  name="subsetting"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={<FormattedMessage id="dataset.form.subsetting.opensearch" />}
                  multiLine
                />
                <div style={styleButton}>
                  <RaisedButton
                    label={<FormattedMessage id="dataset.form.subsetting.testSubsetQuery" />}
                    secondary
                    onTouchTap={handleSubmit(handleTestSubsetting)}
                  />
                </div>
              </div>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="dataset.form.subsetting.action.next" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="dataset.form.subsetting.action.cancel" />}
              secondaryButtonTouchTap={handleBack}
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
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  return errors
}

export default reduxForm({
  form: 'dataset-subsetting-form',
  validate,
})(DatasetFormSubsettingComponent)

