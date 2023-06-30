/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'

/**
 * Input field value for an OpenSearch query parameter (handles specific validation based on parameter constraints)
 * @author Raphaël Mechali
 */
class OSQueryParameterInputField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    filterParameter: DataManagementShapes.OpenSearchURLParameterDescription.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    regexp: null,
    minInclusive: null,
    maxInclusive: null,
    minExclusive: null,
    maxExclusive: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { filterParameter } = newProps
    if (oldProps.filterParameter !== filterParameter) {
      // compute applying constraints
      let regexp = null
      if (filterParameter.pattern) {
        try {
          regexp = new RegExp(filterParameter.pattern)
        } catch (e) {
        // DO nothing, that regexp cannot be parsed
        }
      }
      const minInclusive = DescriptorHelper.parseFloatOrNull(filterParameter.minInclusive)
      const maxInclusive = DescriptorHelper.parseFloatOrNull(filterParameter.maxInclusive)
      const minExclusive = DescriptorHelper.parseFloatOrNull(filterParameter.minExclusive)
      const maxExclusive = DescriptorHelper.parseFloatOrNull(filterParameter.maxExclusive)
      this.setState({
        regexp,
        minInclusive,
        maxInclusive,
        minExclusive,
        maxExclusive,
      })
    }
  }

  /**
   * @return {boolean} true when there is a pattern
   */
  hasPattern = () => !isNil(this.state.regexp)

  /**
   * @return {boolean} true when there is a min inclusive bound
   */
  hasMinInclusiveBound = () => !isNil(this.state.minInclusive)

  /**
   * @return {boolean} true when there is a max inclusive bound
   */
  hasMaxInclusiveBound = () => !isNil(this.state.maxInclusive)

  /**
   * @return {boolean} true when there is a min exclusive bound
   */
  hasMinExclusiveBound = () => !isNil(this.state.minExclusive)

  /**
   * @return {boolean} true when there is a max exclusive bound
   */
  hasMaxExclusiveBound = () => !isNil(this.state.maxExclusive)

  /**
   * @return {boolean} true when at least one bound current applies
   */
  hasBounds = () => this.hasMinInclusiveBound() || this.hasMaxInclusiveBound() || this.hasMinExclusiveBound() || this.hasMaxExclusiveBound()

  /**
   * Validates value respects expected pattern
   * @param {string} value current field value, cannot be empty as it is mandatory
   * @return {sting} error message key or undefined when no error
   */
  validateRegexp = (value) => {
    const { regexp } = this.state
    if (this.hasPattern() && !regexp.test(value)) {
      return 'opensearch.crawler.form.query.input.field.pattern.error'
    }
    return undefined // no validation error
  }

  /**
   * Validates value bounds if any bound is provided
   * @param {string} value current field value
   * @return {sting} error message key or undefined when no error
   */
  validateBounds = (value) => {
    const {
      minInclusive, maxInclusive, minExclusive, maxExclusive,
    } = this.state
    if (this.hasBounds()) {
      // There are numeric bound: the value must be a valid number
      const parsedValue = DescriptorHelper.parseFloatOrNull(value)
      if (isNil(parsedValue)) {
        return 'opensearch.crawler.form.query.input.field.invalid.number.error'
      }
      // test outside bounds if they are provided
      if ((this.hasMinInclusiveBound() && parsedValue < minInclusive)
      || (this.hasMaxInclusiveBound() && parsedValue > maxInclusive)
      || (this.hasMinExclusiveBound() && parsedValue <= minExclusive)
      || (this.hasMaxExclusiveBound() && parsedValue >= maxExclusive)) {
        return 'opensearch.crawler.form.query.input.field.number.outside.bounds.error'
      }
    }
    return undefined // no validation error
  }

  /**
   * @return {[Function]} lazy initialized validators list
   */
  getValidators = () => {
    if (isNil(this.validators)) {
      this.validators = [
        ValidationHelpers.required,
        this.validateRegexp,
        this.validateBounds,
      ]
    }
    return this.validators
  }

  render() {
    const {
      name,
      filterParameter: {
        pattern, minExclusive, maxExclusive, minInclusive, maxInclusive,
      },
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { openSearchCrawler: { queryFilters: { filtersTable } } },
    } = this.context

    // compute label with pattern or bounds
    let fieldLabel = null
    if (this.hasBounds()) {
      let minBound = null
      let maxBound = null
      if (this.hasMinExclusiveBound()) {
        minBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.min.exclusive.bound' }, { bound: minExclusive })
      } else if (this.hasMinInclusiveBound()) {
        minBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.min.inclusive.bound' }, { bound: minInclusive })
      } else {
        minBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.min.free.bound' })
      }
      if (this.hasMaxExclusiveBound()) {
        maxBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.max.exclusive.bound' }, { bound: maxExclusive })
      } else if (this.hasMaxInclusiveBound()) {
        maxBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.max.inclusive.bound' }, { bound: maxInclusive })
      } else {
        maxBound = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.max.free.bound' })
      }
      fieldLabel = formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.value' }, { minBound, maxBound })
    } else if (this.hasPattern()) {
      fieldLabel = formatMessage({ id: 'opensearch.crawler.form.query.input.field.pattern.value' }, { pattern })
    } else {
      fieldLabel = formatMessage({ id: 'opensearch.crawler.form.query.input.field.free.value' })
    }

    return (
      <Field
        name={name}
        component={RenderTextField}
        label={fieldLabel}
        title={fieldLabel}
        validate={this.getValidators()}
        style={filtersTable.fieldsStyle}
        fullWidth
      />
    )
  }
}
export default OSQueryParameterInputField
