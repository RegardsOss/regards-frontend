/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import BreadcrumbElement from './BreadcrumbElement'

/**
* Breadcrumb implementation, that work with context styles. XXX-V2 merge with Breadcrumb!
*/
class BreadcrumbImpl extends React.Component {

  static propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onAction: PropTypes.func.isRequired, // click callback: () => void
    }).isRequired).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { elements } = this.props
    const { moduleTheme: { breadcrumb: { style } } } = this.context
    return (
      <div style={style}>
        {
          // for each element, generate array of separator from previous (if not first) and clickable element.
          elements.map(({ label, onAction }, index) =>
            (<BreadcrumbElement
              isFirst={!index}
              isLast={index === elements.length - 1}
              key={label}
              label={label}
              onAction={onAction}
            />))
        }
      </div>
    )
  }
}
export default BreadcrumbImpl
