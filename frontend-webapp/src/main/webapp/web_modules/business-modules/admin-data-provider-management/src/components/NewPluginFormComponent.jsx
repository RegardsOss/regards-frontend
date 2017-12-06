/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import { Field, ValidationHelpers } from '@regardsoss/form-utils'
/**
 * Component to display a PluginConfigurator for one of the configurable plugins of an ingest processing chain.
 * Every ingest processing chain contains many plugins to configure. @see IngestProcessingPluginType
 * @author Sébastien Binda
 */
export class NewPluginFormComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    ingestPluginType: PropTypes.string.isRequired,
    defaultPluginConfLabel: PropTypes.string.isRequired,
    fieldNamePrefix: PropTypes.string,
  }

  render() {
    const storePath = ['admin', 'acquisition', 'processing-chain-management', 'pluginConfigurator']
    return (
      <Field
        name={this.props.fieldNamePrefix}
        component={RenderPluginField}
        title={this.props.title}
        selectLabel={this.props.selectLabel}
        ingestPluginType="fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation"
        storePath={storePath}
        defaultPluginConfLabel={this.props.defaultPluginConfLabel}
        validate={ValidationHelpers.required}
        microserviceName={STATIC_CONF.MSERVICES.INGEST}
        hideDynamicParameterConf
        hideGlobalParameterConf
      />
    )
  }
}
export default NewPluginFormComponent
