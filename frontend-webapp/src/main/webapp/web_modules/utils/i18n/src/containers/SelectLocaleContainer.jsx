/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { updateLocale } from '../model/I18nActions'
import SelectLocalComponent from '../components/SelectLocaleComponent'
import I18nProvider from '../I18nProvider'


/**
 * React component to display the language selector widget
 */
export class SelectLocaleContainer extends React.Component {

  /**
   * on change locale
   * @param {TouchEvent} event
   * @param {number} index
   * @param {string} value Form value
   */
  handleLocaleChange = (event, index, value) => {
    this.setState({ value })
    this.props.setLocale(value)
  }

  render() {
    const locales = ['en', 'fr']
    return (
      <I18nProvider messageDir="utils/i18n/src/i18n">
        <SelectLocalComponent
          locales={locales}
          currentLocale={this.props.currentLocale}
          handleLocaleChange={this.handleLocaleChange}
        />
      </I18nProvider>
    )
  }
}

SelectLocaleContainer.propTypes = {
  currentLocale: React.PropTypes.string,
  setLocale: React.PropTypes.func,
}

// Add projects from store to the containers props
const mapStateToProps = state => ({
  currentLocale: state.common.i18n.locale,
})

// Add functions dependending on store dispatch to containers props.
const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(updateLocale(locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocaleContainer)
