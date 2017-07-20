/**
* LICENSE_PLACEHOLDER
**/
import flatten from 'lodash/flatten'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import BreadcrumbElement from './BreadcrumbElement'
import styles from './styles/styles'

/** Render constant: module syles  */
const BREADCRUMB_STYLES = { styles }

/**
 * Breadcrumb displayer (with element types). Note that it must be called like BreadcrumbComponent(Type).
 *
 * @author Raphaël Mechali
 */
class Breadcrumb extends React.Component {

  static propTypes = {
    /** list of breadcrumb elements */
    // eslint-disable-next-line
    elements: PropTypes.array,
    /** Element label generator: (element, index) => void */
    // eslint-disable-next-line react/no-unused-prop-types
    labelGenerator: PropTypes.func.isRequired,
    /** On breadcrumb element action callback: (element, index) => void */
    // eslint-disable-next-line react/no-unused-prop-types
    onAction: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => this.onPropertiesChanged(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps)

  onPropertiesChanged = ({ elements, labelGenerator, onAction }) => {
    // recompute the dynamic list of elements to show
    this.setState({
      elements: (elements || []).map(this.packElementModel.bind(this, labelGenerator, onAction)),
    })
  }

  /**
   * Packs the rendering model for element and index as parameter, so that no newq reference is generated at render time
   * @param label gen
   */
  packElementModel = (labelGenerator, onAction, element, index) => ({
    label: labelGenerator(element, index),
    onAction: () => onAction(element, index),
  })

  render() {
    const { elements } = this.state
    const { separator } = this.context.moduleTheme.breadcrumb
    return (
      <div>
        {
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

export default withModuleStyle(BREADCRUMB_STYLES)(Breadcrumb)
