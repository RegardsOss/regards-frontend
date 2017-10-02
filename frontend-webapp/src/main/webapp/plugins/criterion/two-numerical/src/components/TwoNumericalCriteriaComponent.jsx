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
import flow from 'lodash/flow'
import uniq from 'lodash/uniq'
import fpmap from 'lodash/fp/map'
import { DataManagementShapes } from '@regardsoss/shape'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import TwoNumericalCriteriaSimpleComponent from './TwoNumericalCriteriaSimpleComponent'
import TwoNumericalCriteriaComposedComponent from './TwoNumericalCriteriaComposedComponent'

/**
 * Search form criteria plugin allowing the user to configure the numerical value of two different attributes with comparators.
 *
 * Below is an example of the simple layout for two different attributes :
 * attribute1 < value1 and attribute2 != value2
 *
 * XXX + TBC
 * Now if the two passed attributes are the same, we switch to as composed layout:
 * value1 <= attribute <= value2
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComponent extends React.Component {

  static propTypes = {
    // container props (propagated to children)
    ...PluginCriterionContainer.propTypes,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: DataManagementShapes.AttributeModelList,
  }

  constructor(props) {
    super(props)
    this.state = {
      // Switch to composed mode if only one attribute passed
      isComposed: flow(fpmap('name'), uniq)(props.attributes).length === 1,
    }
  }

  render() {
    const { isComposed } = this.state

    return isComposed ?
      <TwoNumericalCriteriaComposedComponent {...this.props} /> :
      <TwoNumericalCriteriaSimpleComponent {...this.props} />
  }
}

export default TwoNumericalCriteriaComponent
