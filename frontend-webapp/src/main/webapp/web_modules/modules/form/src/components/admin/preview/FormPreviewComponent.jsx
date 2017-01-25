/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent, ModuleShape } from '@regardsoss/modules'

/**
 * Component to display a preview of the current search form module
 */
class FormPreviewComponent extends React.Component {

  static propTypes = {
    module: ModuleShape,
  }

  render() {
    if (this.props.module && this.props.module.name && this.props.module.conf && this.props.module.conf.layout) {
      const previewModule = Object.assign({}, this.props.module, { active: true })
      console.log('PREVIEW', previewModule)
      return (
        <div style={{ marginTop: 10 }}>
          <LazyModuleComponent
            module={previewModule}
            appName={'admin'}
          />
        </div>
      )
    }
    return <div>Loading...</div>
  }
}

export default FormPreviewComponent
