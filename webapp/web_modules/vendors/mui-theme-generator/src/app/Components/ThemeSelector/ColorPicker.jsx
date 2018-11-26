import React from 'react'
import Slider from 'material-ui/Slider'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import { ColorInfo, ColorHelper, regexColor } from '../../utils/ColorHelper'


const multiplier = 1.5

const styles = {
  container: {
    main: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 14px 14px',
      marginLeft: 32,
      backgroundColor: 'rgba(125, 125, 125, 0.12)'
    },
    color: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    tone: {
      display: 'flex'
    },
    alpha: {
      display: 'flex',
      flexDirection: 'row'
    },
    alphaText: {
      flex: 10,
      textAlign: 'right',
      margin: 'auto'
    },
    alphaValue: {
      flex: 90
    },
    alphaSlider: {
      // margin: 0,
      marginTop: 10,
      marginBottom: 0
    }
  },
  button: {
    color: {
      width: 15,
      height: 15,
      padding: 0,
      flexGrow: 1
    },
    tone: {
      color: '#c3c3c3',
      width: 15,
      height: 20,
      padding: 0,
      flexGrow: 1
    }
  }
}


export default class ColorPicker extends React.PureComponent {
  constructor(props) {
    super(props)

    const colorInfo = new ColorInfo(props.color)
    const alpha = colorInfo.rgba.a

    this.state = {
      colorInfo,
      alpha,
      colorForTextValue: colorInfo.get(),
    }
  }

    changeColor = (color) => {
      const { colorInfo } = this.state
      const previousColor = colorInfo.colorTone && colorInfo.colorTone.color

      try {
        colorInfo.parse(color + (colorInfo.colorTone && colorInfo.colorTone.tone))
      } catch (e) {
        colorInfo.parse(color + Object.keys(ColorHelper.colorToneList[color])[5])
      }

      this.propagateColorChange(previousColor)
    }

    changeTone = (color, tone) => {
      const { colorInfo } = this.state
      const previousColor = colorInfo.colorTone && colorInfo.colorTone.color

      colorInfo.parse(color + tone)

      this.propagateColorChange(previousColor)
    }

    changeAlpha = (alpha) => {
      const { colorInfo } = this.state
      colorInfo.setAlpha(alpha)
      this.setState({ alpha })
    }

    propagateColorChange = (previousColor) => {
      let { colorInfo, alpha } = this.state
      const currentColor = colorInfo.colorTone && colorInfo.colorTone.color
      if (previousColor != undefined) {
        if (currentColor == '') alpha = colorInfo.getAlpha()
        else if (previousColor == '') alpha = 1
      }

      this.changeAlpha(alpha)
      this.setState({
        colorInfo,
        colorForTextValue: colorInfo.get(),
      })
      this.props.onColorChange(colorInfo.get())
    }

    generateColorSelector = () => {
      const { colorInfo } = this.state
      const selectedColor = colorInfo.colorTone && colorInfo.colorTone.color

      return (
        <div style={{ ...styles.container.color, height: styles.button.color.height * multiplier }}>
          {
                    Object.keys(ColorHelper.colorToneList).map(color => <IconButton
                      key={color}
                      style={{
                        ...styles.button.color,
                        backgroundColor: ColorHelper.getDefaultColor(color),
                        height: (color === selectedColor ? multiplier : 1) * styles.button.color.height
                      }}
                      onClick={() => this.changeColor(color)}
                      tooltip={color}
                      tooltipPosition="bottom-right"
                    />
                    )
                }
        </div>
      )
    }

    generateToneSelector = () => {
      const { colorInfo } = this.state
      const colorState = colorInfo.colorTone && colorInfo.colorTone.color
      const toneState = colorInfo.colorTone && colorInfo.colorTone.tone

      return (
        <div style={{ ...styles.container.tone, height: styles.button.tone.height * multiplier }}>
          {
                    Object.keys(ColorHelper.colorToneList[colorState]).map(tone => <IconButton
                      key={tone}
                      style={{
                        ...styles.button.tone,
                        backgroundColor: ColorHelper.colorToneList[colorState][tone].get(),
                        height: (tone === toneState ? multiplier : 1) * styles.button.tone.height
                      }}
                      onClick={() => this.changeTone(colorState, tone)}
                      tooltip={tone}
                      tooltipPosition="bottom-right"
                    />
                    )
                }
        </div>
      )
    }

    generateAlphaSelector = alpha => (
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={alpha}
        onChange={(e, alpha) => this.setState({ alpha })}
        onDragStop={e => this.propagateColorChange()}
        style={styles.container.alphaValue}
        sliderStyle={styles.container.alphaSlider}
      />
    );

    generateInputField = () => {
      const { colorForTextValue } = this.state
      return (<TextField
        value={colorForTextValue}
        floatingLabelText="Color"
        floatingLabelFixed
        fullWidth
        style={{ marginTop: -14 }}
        onChange={this.handleTextValueChange}
        onBlur={this.tryToSaveColor}
      />)
    }

    tryToSaveColor = () => {
      const { colorForTextValue } = this.state
      if (colorForTextValue.match(regexColor)) {
        const { colorInfo } = this.state
        const updatedColorInfo = new ColorInfo(colorForTextValue)
        this.props.onColorChange(updatedColorInfo.get())
        const alpha = updatedColorInfo.rgba.a || 1
        this.setState({
          alpha,
        })
      } else {
        // if the string is not a color
        // Just send it, the color picker will be removed and replaced by a text field
        this.props.onColorChange(colorForTextValue)
      }
    }

    handleTextValueChange = (event, text) => {
      this.setState({
        colorForTextValue: text
      })
    }


    render() {
      const tone = ((this.state.colorInfo || {}).colorTone || {}).tone
      const { alpha } = this.state

      return (
        <div style={styles.container.main}>
          {this.generateInputField()}
          {this.generateColorSelector()}
          {tone ? this.generateToneSelector() : null}
          {tone
            ? <div style={styles.container.alpha}>
              {this.generateAlphaSelector(alpha)}
              <div style={styles.container.alphaText}>{alpha}</div>
            </div> : null
                }
        </div>
      )
    }
}
