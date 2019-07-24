/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import MultipleAttributesContainer from '../containers/MultipleAttributesContainer'
import SingleAttributeContainer from '../containers/SingleAttributeContainer'

/**
 * Main plugin component: it does nothing but redirection to adequate container: SingleAttributeContainer when configuration
 * holds a single attribute, MultipleAttributesContainer otherwise (therefore it is a component)
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComponent extends React.Component {
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      firstField: AttributeModelWithBounds.isRequired,
      secondField: AttributeModelWithBounds.isRequired,
    }).isRequired,
  }

  render() {
    const { pluginInstanceId, attributes: { firstField, secondField } } = this.props
    return firstField.jsonPath === secondField.jsonPath // same attribute?
      ? <SingleAttributeContainer pluginInstanceId={pluginInstanceId} searchField={firstField} />
      : <MultipleAttributesContainer pluginInstanceId={pluginInstanceId} firstField={firstField} secondField={secondField} />
  }
}

export default TwoNumericalCriteriaComponent
