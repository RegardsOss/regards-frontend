/**
* LICENSE_PLACEHOLDER
**/
import Divider from 'material-ui/Divider'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TableOptionsSeparator from './TableOptionsSeparator'

/**
* Fixed table header Component
*/
class TablePaneHeader extends React.Component {

  static propTypes = {
    // adds tabs buttons to results table
    resultsTabsButtons: PropTypes.arrayOf(PropTypes.node),
    // adds custom table options, nearside parmaeters
    customTableOptions: PropTypes.arrayOf(PropTypes.node),
    contextOptions: PropTypes.arrayOf(PropTypes.node),
    // shows a custom table header area instand of results count, just above columns
    customTableHeaderArea: PropTypes.node,
    resultsCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { header } = this.context.moduleTheme
    const {
      resultsTabsButtons, customTableOptions, contextOptions,
      customTableHeaderArea, resultsCount } = this.props
    return (
      <div>
        <div className={header.line.classNames}>
          <div style={header.tabsLine.styles} className={header.tabsLine.classNames}>
            <div style={header.tabs.styles}>
              {
                // table tabs on left side
                resultsTabsButtons || null
              }
            </div>
            <div style={header.customOptions.styles}>
              {
                // context actions on center
                contextOptions || null
              }
              {
                // separator if requierd
                contextOptions && customTableOptions ?
                  <TableOptionsSeparator /> : null
              }
              {
                // custom options (after more button)
                customTableOptions || null
              }
            </div>
          </div>
        </div>
        <div className={header.line.classNames} >
          <Divider />
        </div>
        <div className={header.line.classNames}>
          {
            customTableHeaderArea ||
            // default area, shows result count
            <div style={header.text.styles}>
              {this.context.intl.formatMessage({ id: 'table.results.count' }, { count: resultsCount || '0' })}
            </div>
          }
        </div>
        <div className={header.line.classNames}>
          <Divider />
        </div>
      </div>
    )
  }
}
export default TablePaneHeader
