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
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import TemporalCriterionComponent from './TemporalCriterionComponent'

/**
 * Main plugin display component
 * @author Raphaël Mechali
 */
class TwoTemporalCriteriaComponent extends React.Component {
  static propTypes = {
    attribute1: AttributeModelWithBounds.isRequired,
    attribute2: AttributeModelWithBounds.isRequired, // provide here the same reference than attribute 1 if same attribute
    value1: PropTypes.instanceOf(Date),
    value2: PropTypes.instanceOf(Date),
    onDate1Changed: PropTypes.func.isRequired, // value 1 update callback like: (Date) => ()
    onDate2Changed: PropTypes.func.isRequired, // value 2 update callback like: (Date) => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      attribute1, value1, onDate1Changed,
      attribute2, value2, onDate2Changed,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { rootStyle, labelSpanStyle } } = this.context

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>
          { // Message
          attribute1.jsonPath === attribute2.jsonPath
            // single attribute message
            ? formatMessage({ id: 'single.attributes.label' }, { label: attribute1.label })
            // Two attributes (range) message
            : formatMessage({ id: 'multiple.attributes.label' }, {
              label1: attribute1.label,
              label2: attribute2.label,
            })
        }
        </span>
        <TemporalCriterionComponent
          searchAttribute={attribute1}
          value={value1}
          hintDate={attribute1.boundsInformation.lowerBound}
          onDateChanged={onDate1Changed}
          isStopDate={false}
        />
        <Arrow />
        <TemporalCriterionComponent
          searchAttribute={attribute2}
          value={value2}
          hintDate={attribute2.boundsInformation.upperBound}
          onDateChanged={onDate2Changed}
          isStopDate
        />
      </div>
    )
  }
}
export default TwoTemporalCriteriaComponent
