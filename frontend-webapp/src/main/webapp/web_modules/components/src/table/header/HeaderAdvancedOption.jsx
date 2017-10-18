/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import DropDownButton from '../../buttons/DropDownButton'

/**
* Header advanced option
*/
class HeaderAdvancedOptionComponent extends React.Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getLabel = () => this.context.intl.formatMessage({ id: 'table.advanced.options.label' })

  render() {
    const { children } = this.props
    return (
      <ShowableAtRender show={!!children && !!children.length}>
        <DropDownButton getLabel={this.getLabel}>
          {children || null}
        </DropDownButton>
      </ShowableAtRender>
    )
  }
}
export default HeaderAdvancedOptionComponent
