/**
* LICENSE_PLACEHOLDER
**/
import { ModuleThemeProvider } from '@regardsoss/modules'
import BreadcrumbImpl from './BreadcrumbImpl'
import styles from './styles/styles'

/** Render constant: module syles  */
const BREADCRUMB_STYLES = { styles }

/**
* Breadcrumb displayer (with element types). Note that it must be called like BreadcrumbComponent(Type).
* It packs elements model then delegates to BreadcrumbImpl (that can use styles)
*/
export default class Breadcrumb extends React.Component {

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
    return (
      <ModuleThemeProvider module={BREADCRUMB_STYLES}>
        <BreadcrumbImpl elements={elements} />
      </ModuleThemeProvider >
    )
  }
}

