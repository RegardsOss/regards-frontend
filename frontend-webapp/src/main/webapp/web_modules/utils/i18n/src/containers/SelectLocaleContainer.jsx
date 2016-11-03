/** @module common */

import { connect } from 'react-redux'
import { updateLocale } from '../I18nActions'
import SelectLocalComponent from '../components/SelectLocaleComponent'
import I18nProvider from '../I18nProvider'
/*

interface SelectLocaleTypes {
  locales: Array<string>,
  currentLocale?: string,
  setLocale?: (locale: string) => void
}
*/


/**
 * React component to display the language selector widget
 */
export class SelectLocaleContainer extends React.Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, index, value) {
    this.setState({ value })
    this.props.setLocale(value)
  }

  render() {
    return (
      <I18nProvider messageDir="utils/i18n/src/messages">
        <SelectLocalComponent
          locales={this.props.locales}
          currentLocale={this.props.currentLocale}
          setLocale={this.props.setLocale}
        />
      </I18nProvider>
    )
  }
}

// Add projects from store to the containers props
const mapStateToProps = (state) => {
  return {
    currentLocale: state.common.i18n.locale,
  }
}

// Add functions dependending on store dispatch to containers props.
const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: locale => dispatch(updateLocale(locale)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocaleContainer)
