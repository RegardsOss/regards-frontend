/** @module common */

import { connect } from 'react-redux'
import { fetchAccessRights } from './AccessRightsActions'
import { DependencyAccessRight } from '@regardsoss/access-rights'

export default function checkDependencies(dependencies) {
  return function (DecoratedComponent) {
    class AccessRightsDecorator extends React.Component {

      checkDependencies() {
        // const ret: boolean = false

        if (!dependencies || dependencies.length === 0) {
          return true
        } else if (this.props.api && this.props.api.length > 0) {
          const missingDependencies =
              dependencies.filter((dependency) => {
                const object = this.props.api.find((apiDependency) => {
                  return !(apiDependency.id === dependency.id && apiDependency.access)
                })
                return object ? true : false
              })

          if (missingDependencies && missingDependencies.length === 0) {
            return true
          }
          return false
        } else {
          return false
        }
      }

      componentWillMount() {
        // GET ALL missing dependencies
        const missingDependencies = dependencies.map((dependency) => {
          const found = this.props.api.find(apiDependency => apiDependency.id === dependency.id)
          if (!found) {
            return dependency
          }
        })

        if (missingDependencies && missingDependencies.length > 0) {
          this.props.getDependencies(missingDependencies)
        }
      }

      render() {
        if (this.checkDependencies() === true) {
          return <DecoratedComponent {...this.props} />
        } else {
          return null
        }
      }
    }

    const mapStateToProps = (state) => {
      return {
        api: state.common.api.items,
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        getDependencies: ldependencies => dispatch(fetchAccessRights(ldependencies)),
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(AccessRightsDecorator)
  }
}
