import { FormattedMessage } from 'react-intl'

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
import { CommonDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AttributeModelWithBounds, BOUND_TYPE } from '@regardsoss/plugins-api'
import NumericalCriterionComponent from './NumericalCriterionComponent'

/**
 * Single attribute display component
 * @author Raphaël Mechali
 */
class SingleAttributeComponent extends React.Component {
  static propTypes = {
    searchAttribute: AttributeModelWithBounds.isRequired,
    value1: PropTypes.number,
    value2: PropTypes.number,
    onChangeValue1: PropTypes.func.isRequired, // callback for value 1 updates, (number) => ()
    onChangeValue2: PropTypes.func.isRequired, // callback for value 2 updates, (number) => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      searchAttribute, value1, value2, onChangeValue1, onChangeValue2,
    } = this.props
    const {
      moduleTheme: { rootStyle, labelSpanStyle },
      intl: { formatMessage },
    } = this.context

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>
          {formatMessage(
            { id: 'criterion.aggregator.between' },
            { label: searchAttribute.label },
          )}
        </span>
        <NumericalCriterionComponent
          searchAttribute={searchAttribute}
          fieldBoundType={BOUND_TYPE.LOWER_BOUND}
          value={value1}
          comparator={CommonDomain.EnumNumericalComparator.GE}
          onChange={onChangeValue1}
          showAttributeLabel={false}
          showComparator={false}
        />
        <span style={{ marginRight: 10 }}>
          <FormattedMessage id="criterion.aggregator.and" />
        </span>
        <NumericalCriterionComponent
          searchAttribute={searchAttribute}
          fieldBoundType={BOUND_TYPE.UPPER_BOUND}
          value={value2}
          comparator={CommonDomain.EnumNumericalComparator.LE}
          onChange={onChangeValue2}
          showAttributeLabel={false}
          showComparator={false}
        />
      </div>
    )
  }
}
export default SingleAttributeComponent
