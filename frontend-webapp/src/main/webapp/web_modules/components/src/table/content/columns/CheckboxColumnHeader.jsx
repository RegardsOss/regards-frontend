/**
* LICENSE_PLACEHOLDER
**/
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Checked from 'material-ui/svg-icons/toggle/check-box'
import Unchecked from 'material-ui/svg-icons/toggle/check-box-outline-blank'

/**
* Shows a checkbox column header cell, sitching selection modes and selected object as follow:
* - Initially, or when AT LEAST one object is not selected: Show select all. Clicking that option will result
* in listing the non selected objects
* - When all objects are selected, in list non selected objects, shows unselect all. Clicking that option will result
*/
class CheckboxColumnHeader extends React.Component {

  static propTypes = {
    lineHeight: React.PropTypes.number.isRequired,
    areAllSelected: React.PropTypes.bool.isRequired,
    onToggleSelectAll: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onToggleSelection = () => {

  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { fixedCellHeader, checkButton: { checkedIcon, uncheckedIcon } } } = this.context
    const { areAllSelected, onToggleSelectAll } = this.props

    const cellStyle = fixedCellHeader
    const { lineHeight } = this.props
    const height = `${lineHeight - 1}px`
    const minHeight = height

    const [tooltipKey, iconStyle, Icon] = areAllSelected ?
      ['table.deselect.all', checkedIcon, Checked] :
      ['table.select.all', uncheckedIcon, Unchecked]

    return (
      <div style={{ ...cellStyle, height, minHeight }} >
        <IconButton
          title={formatMessage({ id: tooltipKey })}
          iconStyle={iconStyle}
          onTouchTap={onToggleSelectAll}
        >
          <Icon />
        </IconButton>
      </div >
    )
  }
}
export default CheckboxColumnHeader
