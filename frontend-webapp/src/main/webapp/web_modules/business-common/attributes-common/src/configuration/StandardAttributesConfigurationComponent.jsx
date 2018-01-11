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
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { AccessShapes } from '@regardsoss/shape'
import { DamDomain } from '@regardsoss/domain'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure a standard attribute for search results
 * @author Sébastien binda
 */
class StandardAttributesConfigurationComponent extends React.Component {
  static propTypes = {
    allowFacettes: PropTypes.bool.isRequired,
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent).isRequired,
    onChangeAttributeConfiguration: PropTypes.func.isRequired,
  }

  render = () => {
    const { standardAttributes } = DamDomain.AttributeModelController
    const { allowFacettes, attributesConf, onChangeAttributeConfiguration } = this.props

    return (
      <div>
        <Subheader><FormattedMessage id="form.attributes.standard.section.title" /></Subheader>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {
            map(standardAttributes, (standardAttribute, attrKey) => {
              // Search existing associated attribute configuration if there is one
              let conf = find(attributesConf, configuration => configuration.attributeFullQualifiedName === attrKey)
              if (!conf) {
                conf = {
                  attributeFullQualifiedName: attrKey,
                  visibility: false,
                  facetable: false,
                  initialSort: false,
                  order: undefined,
                }
              }
              const attributes = {
                content: {
                  label: standardAttribute.label,
                  name: standardAttribute.entityPathName,
                  jsonPath: standardAttribute.entityPathName,
                  fragment: {
                    name: '',
                  },
                },
              }
              return (
                <AttributeConfigurationComponent
                  key={attrKey}
                  allowFacettes={allowFacettes}
                  attribute={attributes}
                  conf={conf}
                  onChange={onChangeAttributeConfiguration}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

export default StandardAttributesConfigurationComponent
