/**
* LICENSE_PLACEHOLDER
**/
import Divider from 'material-ui/Divider'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TableOptionsSeparator from './TableOptionsSeparator'
import TableLoadingComponent from './TableLoadingComponent'

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
    loading: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    const {
      resultsTabsButtons, customTableOptions, contextOptions,
      customTableHeaderArea, resultsCount, loading } = this.props
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
            (function renderSubHeaderArea() {
              if (loading) { // loading
                return <TableLoadingComponent />
              } else if (customTableHeaderArea) { // custom table header area
                return customTableHeaderArea
              }  // default table hedaer area, shows result count
              return (
                <div style={header.text.styles}>
                  {formatMessage({ id: 'table.results.count' }, { count: resultsCount || '0' })}
                </div>)
            }())
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
