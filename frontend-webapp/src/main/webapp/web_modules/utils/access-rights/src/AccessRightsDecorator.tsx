/** @module common */
import * as React from "react"
import { connect } from "react-redux"
import { fetchAccessRights } from "./AccessRightsActions"
import { DependencyAccessRight } from "@regardsoss/access-rights"

export default function checkDependencies (dependencies: Array<DependencyAccessRight>): any {

  return function (DecoratedComponent: React.ComponentClass<any>): any {

    class AccessRightsDecorator extends React.Component<any, any> {

      checkDependencies (): boolean {
        // const ret: boolean = false

        if (!dependencies || dependencies.length === 0) {
          return true
        } else {
          if (this.props.api && this.props.api.length > 0) {
            const missingDependencies: Array<DependencyAccessRight> =
              dependencies.filter((dependency: DependencyAccessRight) => {
                const object: any = this.props.api.find((apiDependency: DependencyAccessRight) => {
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
      }

      componentWillMount (): any {
        // GET ALL missing dependencies
        const missingDependencies: Array<DependencyAccessRight> = dependencies.map((dependency: DependencyAccessRight) => {
          const found = this.props.api.find((apiDependency: DependencyAccessRight) => apiDependency.id === dependency.id)
          if (!found) {
            return dependency
          }
        })

        if (missingDependencies && missingDependencies.length > 0) {
          this.props.getDependencies(missingDependencies)
        }

      }

      render (): JSX.Element {
        if (this.checkDependencies() === true) {
          return <DecoratedComponent {...this.props} />
        } else {
          return null
        }
      }
    }

    const mapStateToProps = (state: any) => {
      return {
        api: state.common.api.items
      }
    }

    const mapDispatchToProps = (dispatch: any) => {
      return {
        getDependencies: (ldependencies: Array<DependencyAccessRight>) => dispatch(fetchAccessRights(ldependencies))
      }
    }

    return connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AccessRightsDecorator)

  }
}
