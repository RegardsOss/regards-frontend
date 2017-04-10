/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { RadioButton } from 'material-ui/RadioButton'
import {
  AttributeModel,
  SearchResultsTargetsEnum,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
} from '@regardsoss/model'
import { Field, RenderRadio, RenderCheckbox } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-configuration'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 */
class SearchResultsConfigurationComponent extends React.Component {

  static MODULE_ATTRIBUTES_CONF = 'conf.attributes'
  static MODULE_REGROUPEMENTS_CONF = 'conf.attributesRegroupements'

  static propTypes = {
    defaultResultType: React.PropTypes.string,
    defaultEnableFacettes: React.PropTypes.bool,
    defaultAttributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    defaultAttributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    changeField: React.PropTypes.func.isRequired,
  }


  renderAttributesConfiguration = () => (
    <MainAttributesConfigurationComponent
      allowFacettes
      allowAttributesRegroupements
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_ATTRIBUTES_CONF}
      regroupementsFieldName={SearchResultsConfigurationComponent.MODULE_REGROUPEMENTS_CONF}
      attributesConf={this.props.attributesConf}
      attributesRegroupementsConf={this.props.attributesRegroupementsConf}
      defaultAttributesConf={this.props.defaultAttributesConf}
      defaultAttributesRegroupementsConf={this.props.defaultAttributesRegroupementsConf}
      selectableAttributes={this.props.selectableAttributes}
      changeField={this.props.changeField}
    />
  )

  render() {
    return (
      <Card>
        <CardTitle subtitle={<FormattedMessage id="form.configuration.tab.title" />} />
        <Field
          name="conf.resultType"
          component={RenderRadio}
          defaultSelected={this.props.defaultResultType}
        >
          <RadioButton
            value={SearchResultsTargetsEnum.DATASET_RESULTS}
            label={<FormattedMessage id="form.configuration.result.type.datasets" />}
          />
          <RadioButton
            value={SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
            label={<FormattedMessage id="form.configuration.result.type.dataobjects" />}
          />
        </Field>
        <Field
          name="conf.enableFacettes"
          component={RenderCheckbox}
          checked={this.props.defaultEnableFacettes}
          label={<FormattedMessage id="form.configuration.result.enable.facettes.label" />}
        />
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Subheader><FormattedMessage id="form.attributes.parameters.title" /></Subheader>
        {this.renderAttributesConfiguration()}
      </Card>
    )
  }
}

export default SearchResultsConfigurationComponent
