/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import SingleAttributeContainer from '../containers/SingleAttributeContainer'
import MultipleAttributesContainer from '../containers/MultipleAttributesContainer'

/**
 * Main plugin component: it does nothing but redirection to adequate container: SingleAttributeContainer when configuration
 * holds a single attribute, MultipleAttributesContainer otherwise (therefore it is a component)
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComponent extends React.Component {
  static propTypes = {
    ...PluginCriterionContainer.propTypes,
  }

  render() {
    // gather different attributes list values(this.props.attributes)
    const allKeys = values(this.props.attributes).reduce(
      (acc, attribute) => acc.includes(attribute.jsonPath) ? acc : [...acc, attribute.jsonPath], [])
    return allKeys.length <= 1
      ? <SingleAttributeContainer {...this.props} />
      : <MultipleAttributesContainer {...this.props} />
  }
}

export default TwoTemporalCriteriaComponent
