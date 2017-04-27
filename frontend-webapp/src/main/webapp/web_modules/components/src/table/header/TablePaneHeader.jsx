/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import Divider from 'material-ui/Divider'
import { themeContextType } from '@regardsoss/theme'

/**
* Fixed table header Component
*/
class TablePaneHeader extends React.Component {

  static propTypes = {
    // adds tabs buttons to results table
    resultsTabsButtons: React.PropTypes.arrayOf(React.PropTypes.node),
    // adds custom table options, nearside parmaeters
    customTableOptions: React.PropTypes.arrayOf(React.PropTypes.node),
    // shows a custom table header area instand of results count, just above columns
    customTableHeaderArea: React.PropTypes.node,
    resultsCount: React.PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { header } = this.context.moduleTheme
    const { resultsTabsButtons, customTableOptions, customTableHeaderArea, resultsCount } = this.props
    return (
      <div>
        <div className={header.line.classNames}>
          <div style={header.tabsLine.styles} className={header.tabsLine.classNames}>
            <div>
              {
                resultsTabsButtons ? resultsTabsButtons.map(button => button) : null
              }
            </div>
            <div>
              {
                customTableOptions ? customTableOptions.map(option => option) : null
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
              <FormattedMessage id="table.results.count" values={{ count: resultsCount || '0' }} />
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
