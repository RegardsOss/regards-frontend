/**
* LICENSE_PLACEHOLDER
**/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import isEmpty from 'lodash/isEmpty'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { reduxForm } from '@regardsoss/form-utils'
import DynamicServiceParameter from '../../definitions/service/DynamicServiceParameter'

/**
* Service dynamic parameters edition form component
*/
export class ParametersEditionComponent extends React.Component {

  static propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.instanceOf(DynamicServiceParameter)).isRequired,
    onDone: React.PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  render() {
    const { parameters, onDone, handleSubmit } = this.props
    const { intl: formatMessage } = this.context
    return (
      <div >
        <form
          onSubmit={handleSubmit(onDone)}
        >
          <Card>
            <CardTitle
              subtitle={formatMessage({ id: 'entities.common.edit.service.parameters.message' })}
            />
            <CardText>
              {
                // One field for each parameter
                parameters.map(parameter => (<ParameterField parameter={parameter} />))
              }
            </CardText>
            <CardActions>
              <RaisedButton
                disabled={this.props.submitting || this.props.invalid}
                label="Hello"
                primary
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'service.dynamic.parameters.edition.form',
})(ParametersEditionComponent)
