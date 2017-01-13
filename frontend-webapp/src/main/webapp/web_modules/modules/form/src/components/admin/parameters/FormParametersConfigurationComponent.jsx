/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButton } from 'material-ui/RadioButton'
import { Field, RenderRadio } from '@regardsoss/form-utils'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'

/**
 * Display form to configure main parameters of search form.
 */
class FormParametersConfigurationComponent extends React.Component {

  static propTypes = {
    defaultResultType: React.PropTypes.string,
  }

  render() {
    return (
      <Card>
        <CardTitle subtitle={<FormattedMessage id="form.configuration.tab.title" />} />
        <Field name="conf.resultType" component={RenderRadio} defaultSelected={this.props.defaultResultType}>
          <RadioButton
            value="datasets"
            label={<FormattedMessage id="form.configuration.result.type.datasets" />}
          />
          <RadioButton
            value="dataobjects"
            label={<FormattedMessage id="form.configuration.result.type.dataobjects" />}
          />
        </Field>
      </Card>
    )
  }
}

export default FormParametersConfigurationComponent
