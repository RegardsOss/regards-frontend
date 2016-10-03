import SecondaryActionButtonComponent from "./SecondaryActionButtonComponent"
import MainActionButtonComponent from "./MainActionButtonComponent"
import { ThemeInjector } from "@regardsoss/theme"
import ShowableAtRender from "./ShowableAtRender"

interface CardActionsProps {
  secondaryButtonLabel?: string | JSX.Element
  secondaryButtonUrl?: string
  secondaryButtonTouchTap?: (event: React.FormEvent) => void
  isSecondaryButtonVisible?: boolean

  mainButtonLabel: string | JSX.Element
  mainButtonUrl?: string
  mainButtonTouchTap?: (event: React.FormEvent) => void
  isMainButtonVisible?: boolean
}
/**
 */
class CardActionsComponent extends React.Component<CardActionsProps, any> {

  static defaultProps: any = {
    isMainButtonVisible: true
  }

  render (): JSX.Element {

    return (
      <ThemeInjector>
        <CardActionsView
          secondaryButtonLabel={this.props.secondaryButtonLabel}
          secondaryButtonUrl={this.props.secondaryButtonUrl}
          secondaryButtonTouchTap={this.props.secondaryButtonTouchTap}
          isSecondaryButtonVisible={this.props.isSecondaryButtonVisible}

          mainButtonUrl={this.props.mainButtonUrl}
          mainButtonLabel={this.props.mainButtonLabel}
          mainButtonTouchTap={this.props.mainButtonTouchTap}
          isMainButtonVisible={this.props.isMainButtonVisible}

          theme={null}
        />
      </ThemeInjector>
    )
  }
}

// Internal view
interface CardActionsViewProps {
  secondaryButtonLabel: string | JSX.Element
  secondaryButtonUrl: string
  secondaryButtonTouchTap: (event: React.FormEvent) => void
  isSecondaryButtonVisible: boolean

  mainButtonLabel: string | JSX.Element
  mainButtonUrl: string
  mainButtonTouchTap: (event: React.FormEvent) => void
  isMainButtonVisible: boolean

  theme: any
}
class CardActionsView extends React.Component<CardActionsViewProps, any> {

  static defaultProps: any = {
    isSecondaryButtonVisible: true,
    isMainButtonVisible: true
  }

  render (): JSX.Element {

    const styleCardActions: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end"
    }

    return (
      <div style={styleCardActions}>
        <ShowableAtRender
          show={!!((this.props.secondaryButtonUrl || this.props.secondaryButtonTouchTap) && this.props.isSecondaryButtonVisible)}
        >
          <SecondaryActionButtonComponent
            label={this.props.secondaryButtonLabel}
            url={this.props.secondaryButtonUrl}
            onTouchTap={this.props.secondaryButtonTouchTap}
          />
        </ShowableAtRender>
        <MainActionButtonComponent
          label={this.props.mainButtonLabel}
          url={this.props.mainButtonUrl}
          onTouchTap={this.props.mainButtonTouchTap}
          isVisible={this.props.isMainButtonVisible}
        />
      </div>
    )
  }


}
export default CardActionsComponent
