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
import { connect } from 'react-redux'
import { setLocale } from '../model/I18nActions'
import SelectLocaleComponent from '../components/SelectLocaleComponent'
import I18nProvider from './I18nProvider'
import messages from '../i18n'

/**
 * React component to display the language selector widget
 * @author Sébastien Binda
 */
export class SelectLocaleContainer extends React.Component {

  /**
   * on change locale
   * @param {TouchEvent} event
   * @param {number} index
   * @param {string} value Form value
   */
  handleLocaleChange = (event, value) => {
    this.setState({ value })
    this.props.setLocale(value)
  }

  render() {
    const locales = ['en', 'fr']
    return (
      <I18nProvider messages={messages}>
        <SelectLocaleComponent
          locales={locales}
          currentLocale={this.props.currentLocale}
          muiTheme={this.props.muiTheme}
          handleLocaleChange={this.handleLocaleChange}
        />
      </I18nProvider>
    )
  }
}

SelectLocaleContainer.propTypes = {
  currentLocale: PropTypes.string,
  setLocale: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  muiTheme: PropTypes.object.isRequired,
}

// Add projects from store to the containers props
const mapStateToProps = state => ({
  currentLocale: state.common.i18n.locale,
})

// Add functions dependending on store dispatch to containers props.
const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocaleContainer)
