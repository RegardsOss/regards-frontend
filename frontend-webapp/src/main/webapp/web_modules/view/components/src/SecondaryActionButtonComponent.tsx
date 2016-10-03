import * as React from "react"
import FlatButton from "material-ui/FlatButton"
import ActionButtonComponent from "./ActionButtonComponent"

/**
 * Generic back button
 */
interface SecondaryActionButtonProps {
  label: string | JSX.Element,
  url?: string,
  style?: any
  onTouchTap?: (event: any) => void
  isVisible?: boolean
}
export default class SecondaryActionButtonComponent extends React.Component<SecondaryActionButtonProps, any> {

  render (): JSX.Element {
    return <ActionButtonComponent
              button={FlatButton}
              secondary={true}
              {...this.props}
            />
  }
}
