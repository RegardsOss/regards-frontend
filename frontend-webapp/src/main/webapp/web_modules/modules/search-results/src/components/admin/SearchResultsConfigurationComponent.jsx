/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
} from '@regardsoss/model'
import { ShowableAtRender } from '@regardsoss/components'
import { Field, RenderCheckbox } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 */
class SearchResultsConfigurationComponent extends React.Component {

  static MODULE_ATTRIBUTES_CONF = 'conf.attributes'
  static MODULE_REGROUPEMENTS_CONF = 'conf.attributesRegroupements'

  static propTypes = {
    defaultDisplayDatasets: PropTypes.bool,
    defaultEnableFacettes: PropTypes.bool,
    defaultAttributesConf: PropTypes.arrayOf(AttributeConfiguration),
    defaultAttributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributesConf: PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    hideDatasetsConfiguration: PropTypes.bool.isRequired,
    changeField: PropTypes.func.isRequired,
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
        { /* Show result type choice only if the datasets results are not hidden */}
        <ShowableAtRender show={!this.props.hideDatasetsConfiguration} >
          <Field
            name="conf.displayDatasets"
            component={RenderCheckbox}
            checked={this.props.defaultDisplayDatasets}
            label={<FormattedMessage id="form.configuration.result.type.datasets" />}
          />
        </ShowableAtRender>
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
