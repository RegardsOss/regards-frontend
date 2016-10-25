import * as React from "react"
import RaisedButton from "material-ui/RaisedButton"
import ActionButtonComponent from "./ActionButtonComponent"

/**
 * Generic back button
 */
interface MainActionButtonProps {
  label: string | JSX.Element
  url?: string
  style?: any
  onTouchTap?: (event: React.FormEvent) => void
  isVisible?: boolean
}
export default class MainActionButtonComponent extends React.Component<MainActionButtonProps, any> {

  render (): JSX.Element {
    return <ActionButtonComponent
            button={RaisedButton}
            {...this.props}
           />
  }
}
