/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import { withI18n, setLocale } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import SelectLocaleComponent from '../components/SelectLocaleComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * React component to display the language selector widget
 * @author Sébastien Binda
 */
export class SelectLocaleContainer extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.string,
    setLocale: PropTypes.func,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      currentLocale: state.common.i18n.locale,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      setLocale: (locale) => dispatch(setLocale(locale)),
    }
  }

  /**
   * on change locale
   * @param {TouchEvent} event
   * @param {number} index
   * @param {string} value Form value
   */
  handleLocaleChange = (event, value) => {
    this.props.setLocale(value)
  }

  render() {
    return (
      <SelectLocaleComponent
        currentLocale={this.props.currentLocale}
        handleLocaleChange={this.handleLocaleChange}
      />
    )
  }
}

export default compose(
  connect(SelectLocaleContainer.mapStateToProps, SelectLocaleContainer.mapDispatchToProps),
  withModuleStyle(styles), withI18n(messages),
)(SelectLocaleContainer)
