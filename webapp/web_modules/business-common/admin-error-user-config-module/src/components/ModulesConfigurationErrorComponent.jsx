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
import join from 'lodash/join'
import get from 'lodash/get'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import CloseIcon from 'mdi-material-ui/Close'
import IconButton from 'material-ui/IconButton'
import RefreshIcon from 'mdi-material-ui/Refresh'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * @author Théo Lasserre
 */
class ModulesConfigurationErrorComponent extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errorConfContent: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchModulesAndAttributes: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isErrorConfDivOpen: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() { this.onPropertiesUpdated({}, this.props) }

  /**
      * Lifecycle method: component receive props. Used here to detect properties change and update local state
      * @param {*} nextProps next component properties
      */
  UNSAFE_componentWillReceiveProps(nextProps) { this.onPropertiesUpdated(this.props, nextProps) }

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, nextProps) => {
    if (!isEqual(oldProps.errorConfContent, nextProps.errorConfContent)) {
      this.setState({
        isErrorConfDivOpen: !isEmpty(nextProps.errorConfContent),
      })
    }
  }

  toogleErrorConfDiv = () => {
    this.setState({
      isErrorConfDivOpen: !this.state.isErrorConfDivOpen,
    })
  }

  buildErrorDiv = () => {
    const {
      isFetching, errorConfContent, fetchModulesAndAttributes,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        errorDivStyle: {
          mainDiv, infosDivStyle, titleAndSubStyle, titleStyle,
        },
      },
    } = this.context
    return (
      <div style={mainDiv}>
        <div style={infosDivStyle}>
          <div style={titleAndSubStyle}>
            <div style={titleStyle}>
              {formatMessage({ id: 'error.message.module.title' })}
            </div>
            {formatMessage({ id: 'error.message.module.subtitle' })}
            {formatMessage({ id: 'error.message.module.subtitle.one' })}
            {formatMessage({ id: 'error.message.module.subtitle.two' })}
            {formatMessage({ id: 'error.message.module.subtitle.three' })}
            <br />
            {formatMessage({ id: 'error.message.module.subtitle.four' })}
            <br />
          </div>
          {this.buildErrorMessage(errorConfContent)}
        </div>
        <div>
          <IconButton
            onClick={fetchModulesAndAttributes}
            title={formatMessage({ id: 'error.message.module.button.refresh' })}
            disabled={isFetching}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={this.toogleErrorConfDiv}
            title={formatMessage({ id: 'error.message.module.button.close' })}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    )
  }

  buildErrorMessage = (errorConfContent) => {
    const {
      intl: { locale, formatMessage }, moduleTheme: {
        errorMessageStyle: {
          mainErrorMessageStyle, errorDivContentStyle, ulStyle, criteriaStyle,
        },
      },
    } = this.context
    return (
      <div style={mainErrorMessageStyle}>
        {map(errorConfContent, (modul, i) => {
          const moduleFilters = get(modul, 'filters')
          const moduleCriteriaGroups = get(modul, 'criteriasGroup')
          return (
            <div
              key={i}
              style={errorDivContentStyle}
            >
              {formatMessage({ id: 'error.message.module.name' }, { value: modul.title[locale] })}
              <ul style={ulStyle}>
                {
                  moduleFilters
                    ? <li key="filters">{formatMessage({ id: 'error.message.module.filters' }, { values: join(map(modul.filters, (filt) => (`${filt.name}`)), ', ') })}</li>
                    : null
                }
                {
                  moduleCriteriaGroups
                    ? <li>
                      <div>
                        {formatMessage({ id: 'error.message.module.criteriaGroup.title' })}
                        {
                          map(moduleCriteriaGroups, (moduleCriteriaGroup, index) => <div key={`criteria${index}`} style={criteriaStyle}>
                            <br />
                            {formatMessage({ id: 'error.message.module.criteriaGroup' }, { value: moduleCriteriaGroup.title[locale], values: join(map(moduleCriteriaGroup.criteriaAttribute, (critAttr) => (`${critAttr.name}`)), ', ') })}
                          </div>)
                        }
                      </div>
                    </li>
                    : null
                }
              </ul>
              <br />
            </div>
          )
        })}
      </div>)
  }

  render() {
    const { isErrorConfDivOpen } = this.state
    return (
      isErrorConfDivOpen && this.buildErrorDiv()
    )
  }
}
export default ModulesConfigurationErrorComponent
