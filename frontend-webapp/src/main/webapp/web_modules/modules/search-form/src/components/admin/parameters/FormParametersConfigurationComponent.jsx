/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButton } from 'material-ui/RadioButton'
import { Field, RenderRadio } from '@regardsoss/form-utils'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { DATAOBJECT_RESULTS, DATASET_RESULTS } from './ResultTypesEnum'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
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
            value={DATASET_RESULTS}
            label={<FormattedMessage id="form.configuration.result.type.datasets" />}
          />
          <RadioButton
            value={DATAOBJECT_RESULTS}
            label={<FormattedMessage id="form.configuration.result.type.dataobjects" />}
          />
        </Field>
      </Card>
    )
  }
}

export default FormParametersConfigurationComponent
