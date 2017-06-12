/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import get from 'lodash/get'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import { Dataset, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import { fragmentSelectors } from '../clients/FragmentClient'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list datasets.
 */
export class DatasetFormSubsettingComponent extends React.Component {

  static propTypes = {
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
    currentDataset: Dataset,
    onSubmit: PropTypes.func.isRequired,
    handleTestSubsetting: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }


  getAttributeName = (attribute) => {
    if (attribute.fragment.name === fragmentSelectors.noneFragmentName) {
      return `${attribute.name}`
    }
    return `${attribute.fragment.name} ${attribute.name}`
  }

  getTitle = () => {
    const { isEditing } = this.props
    if (!isEditing) {
      return this.context.intl.formatMessage({ id: 'dataset.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'dataset.edit.title' }, { name: this.props.currentDataset.content.label })
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
    const { currentDataset, modelAttributeList, submitting, invalid, handleBack, onSubmit, handleSubmit, handleTestSubsetting } = this.props
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardTitle
            title={this.getTitle()}
            subtitle={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.subtitle' })}
          />
          <DatasetStepperContainer
            stepIndex={1}
            currentDatasetIpId={get(currentDataset, 'content.ipId', '')}
            currentDatasetId={get(currentDataset, 'content.id', '')}
            isEditing={this.props.isEditing}
          />
          <CardText>
            <div className="row">
              <div className="col-sm-30">
                <List>
                  <Subheader><FormattedMessage id="dataset.form.subsetting.attributes" /></Subheader>
                  {map(modelAttributeList, (modelAttribute, id) => (
                    <ListItem
                      primaryText={this.getAttributeName(modelAttribute.content.attribute)}
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
                  label={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.opensearch' })}
                  multiLine
                />
                <div style={styleButton}>
                  <RaisedButton
                    label={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.testSubsetQuery' })}
                    secondary
                    onTouchTap={handleSubmit(handleTestSubsetting)}
                  />
                </div>
              </div>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.action.cancel' })}
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

