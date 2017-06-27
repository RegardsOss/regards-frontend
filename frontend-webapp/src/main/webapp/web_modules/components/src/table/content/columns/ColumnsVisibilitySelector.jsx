/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import ColumnConfiguration from './model/ColumnConfiguration'
import { withI18n, i18nContextType } from '@regardsoss/i18n'

/**
 * Render a react component to display a panel to change visibility of table columns.
 *
 * @author Sébastien Binda
 */
class ColumnsVisibilitySelector extends React.Component {

  static propTypes = {
    columns: PropTypes.arrayOf(ColumnConfiguration),
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    changeColumnVisibility: PropTypes.func,
    closePanel: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    const actions = [
      <FlatButton
        key="OK"
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.props.closePanel}
      />,
    ]

    return (
      <Dialog
        title={intl.formatMessage({ id: 'table.column.visibility.filter' })}
        modal={false}
        open
        onRequestClose={this.props.closePanel}
        actions={actions}
      >
        <div className="row">
          {map(this.props.columns, (column, idx) => (
            <Checkbox key={column.label} label={column.label} checked={!this.props.hiddenColumns.includes(column.label)} onCheck={() => this.props.changeColumnVisibility(column.label)} />
          ))}
        </div>
      </Dialog>
    )
  }
}

export default ColumnsVisibilitySelector
