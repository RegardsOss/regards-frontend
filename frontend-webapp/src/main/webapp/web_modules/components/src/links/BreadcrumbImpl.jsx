/**
* LICENSE_PLACEHOLDER
**/
import flatten from 'lodash/flatten'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { themeContextType } from '@regardsoss/theme'
import BreadcrumbElement from './BreadcrumbElement'

/**
* Breadcrumb implementation, that work with context styles
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
    const { separator } = this.context.moduleTheme.breadcrumb
    return (
      <div>
        {
          /* TODO: manage the the styles, that can be used to collapse elements that do not fit the width
          We may need a sub component to impl it with BREADCRUMB STYLES */
          // for each element, generate array of separator from previous (if not first) and clickable element.
          flatten(elements.map(({ label, onAction }, index) => [
            index ? <LabelIcon key={`separator-${label}`} style={separator} /> : null,
            <BreadcrumbElement key={label} label={label} onAction={onAction} />,
          ]))
        }
      </div>
    )
  }
}
export default BreadcrumbImpl
