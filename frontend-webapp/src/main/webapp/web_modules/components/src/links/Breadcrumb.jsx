/**
* LICENSE_PLACEHOLDER
**/
import DefaultRootIconConstructor from 'material-ui/svg-icons/communication/location-on'
import { ModuleThemeProvider } from '@regardsoss/modules'
import BreadcrumbImpl from './BreadcrumbImpl'
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
    /** Root icon constructor (optional, replaced by default if not provided) */
    RootIconConstructor: PropTypes.func,
  }

  static defaultProps = {
    RootIconConstructor: DefaultRootIconConstructor,
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
   * @param labelGenerator label generator
   */
  packElementModel = (labelGenerator, onAction, element, index) => ({
    label: labelGenerator(element, index),
    onAction: () => onAction(element, index),
  })

  render() {
    const { elements } = this.state
    const { RootIconConstructor } = this.props
    return (
      <ModuleThemeProvider module={BREADCRUMB_STYLES}>
        <BreadcrumbImpl elements={elements} RootIconConstructor={RootIconConstructor} />
      </ModuleThemeProvider >
    )
  }
}

export default withModuleStyle(BREADCRUMB_STYLES)(Breadcrumb)
