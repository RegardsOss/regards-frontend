/**
 * LICENSE_PLACEHOLDER
 **/
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Table select all component
 */
export default class TableSelectAllComponent extends React.Component {

  static propTypes = {
    allSelected: PropTypes.bool.isRequired,
    onToggleSelectAll: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { allSelected, onToggleSelectAll } = this.props
    const [icon, labelKey, titleKey] = !allSelected ?
      // select all
      [<CheckBoxOutLineIcon />, 'table.select.all.label', 'table.select.all.tooltip'] :
      // deselect all
      [<CheckBoxIcon />, 'table.deselect.all.label', 'table.deselect.all.tooltip']

    return (
      <FlatButton
        onTouchTap={onToggleSelectAll}
        icon={icon}
        title={this.context.intl.formatMessage({ id: titleKey })}
        label={this.context.intl.formatMessage({ id: labelKey })}
      />
    )
  }

}
