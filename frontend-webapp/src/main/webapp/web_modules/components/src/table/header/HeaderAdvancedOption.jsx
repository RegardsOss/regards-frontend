/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import DropDownButton from '../../buttons/DropDownButton'

/**
* Header advanced option
*/
class HeaderAdvancedOptionComponent extends React.Component {

  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.node),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getLabel = () => this.context.intl.formatMessage({ id: 'table.advanced.options.label' })

  render() {
    const { children } = this.props
    return (
      <DropDownButton getLabel={this.getLabel} disabled={!children || !children.length}>
        {children || null}
      </DropDownButton>
    )
  }
}
export default HeaderAdvancedOptionComponent
