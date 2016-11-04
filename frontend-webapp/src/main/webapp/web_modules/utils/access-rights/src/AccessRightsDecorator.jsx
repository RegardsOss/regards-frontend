/** @module common */

import { connect } from 'react-redux'
import { fetchAccessRights } from './AccessRightsActions'

export default function checkDependencies(dependencies) {
  return function (DecoratedComponent) {
    class AccessRightsDecorator extends React.Component {

      componentWillMount() {
        // GET ALL missing dependencies
        const missingDependencies = dependencies.map((dependency) => {
          const found = this.props.api.find(apiDependency => apiDependency.id === dependency.id)
          return !found ? dependency : null
        })

        if (missingDependencies && missingDependencies.length > 0) {
          this.props.getDependencies(missingDependencies)
        }
      }
      checkDependencies() {
        // const ret: boolean = false

        if (!dependencies || dependencies.length === 0) {
          return true
        } else if (this.props.api && this.props.api.length > 0) {
          const missingDependencies =
              dependencies.filter((dependency) => {
                const object = this.props.api.find(apiDependency => (
                   !(apiDependency.id === dependency.id && apiDependency.access)
                ))
                return object.length > 0
              })

          if (missingDependencies && missingDependencies.length === 0) {
            return true
          }
          return false
        }
        return false
      }

      render() {
        return this.checkDependencies() === true ? <DecoratedComponent {...this.props} /> : null
      }
    }

    AccessRightsDecorator.propTypes = {
      api: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
      getDependencies: React.PropTypes.func.isRequired,
    }

    const mapStateToProps = state => (
      {
        api: state.common.api.items,
      })

    const mapDispatchToProps = dispatch => (
      {
        getDependencies: ldependencies => dispatch(fetchAccessRights(ldependencies)),
      })


    return connect(mapStateToProps, mapDispatchToProps)(AccessRightsDecorator)
  }
}
