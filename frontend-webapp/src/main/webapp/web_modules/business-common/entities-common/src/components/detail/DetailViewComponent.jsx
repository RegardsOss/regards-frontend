/**
 * LICENSE_PLACEHOLDER
 **/
import { Tab, Tabs } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import Measure from 'react-measure'
import { LoadableContentDialogContainer } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import AttributesViewComponent from './attributes/AttributesViewComponent'
import DescriptionComponent from './description/DescriptionComponent'

/**
 * Shows entity detail view. Note: you can add here properties that should be sent to inner dialog.
 * Note this component has state (for graphics variable)
 */
class DetailViewComponent extends React.Component {

  static propTypes = {
    // entity information API
    entityLabel: React.PropTypes.string,
    // entity attributes, empty array allowed
    attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      label: React.PropTypes.string.isRequired,
      renderer: React.PropTypes.func.isRequired,
      renderValue: React.PropTypes.any,
    })).isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    // Callback to run a new search with given tag
    onSearchTag: React.PropTypes.func,
    descriptionFileURL: React.PropTypes.string,
    descriptionFile: React.PropTypes.shape({
      entityId: React.PropTypes.number.isRequired,
      contentType: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
    }),
    // dialog API
    open: React.PropTypes.bool.isRequired,
    loaded: React.PropTypes.bool.isRequired, // external content loaded ? (separe from URL content loaded)
    onClose: React.PropTypes.func.isRequired, // on cloase callback
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    this.setState({
      contentHeight: 0,
    })
  }


  onContentHeightChanges = ({ height }) => {
    const { moduleTheme } = this.context
    this.setState({
      contentHeight: height - moduleTheme.tabHeaderHeight,
    })
  }

  render() {
    const { open, loaded, entityLabel, attributes, descriptionFileURL,
      descriptionFile, onClose, ...otherDialogProperties } = this.props
    // due to multiple overflows Y embedded in each other, we need here to compute the remaining tab content space on Y
    const { moduleTheme: { descriptionDialog } } = this.context
    return (
      <LoadableContentDialogContainer
        open={open}
        loaded={loaded}
        dialogHeightPercent={descriptionDialog.heightPercent}
        dialogWidthPercent={descriptionDialog.widthPercent}
        onRequestClose={onClose}
        loadingMessage={<FormattedMessage id="entities.common.loading.message" />}
        actions={[
          <FlatButton
            label={<FormattedMessage id="entities.common.close.button" />}
            onTouchTap={onClose}
          />]}
        {...otherDialogProperties}
      >
        <Measure onMeasure={this.onContentHeightChanges}>
          <Tabs style={{ height: '100%' }}>
            <Tab label={<FormattedMessage id="entities.common.attributes.tabs" />}>
              <AttributesViewComponent
                entityLabel={entityLabel}
                attributes={attributes}
                contentHeight={this.state.contentHeight}
                tags={this.props.tags}
                onSearchTag={this.props.onSearchTag}
              />
            </Tab>
            <Tab label={<FormattedMessage id="entities.common.description.tabs" />}>
              <DescriptionComponent
                entityLabel={entityLabel}
                descriptionFileURL={descriptionFileURL}
                descriptionFile={descriptionFile}
                contentHeight={this.state.contentHeight}
              />
            </Tab>
          </Tabs>
        </Measure>

      </LoadableContentDialogContainer>

    )
  }

}
export default DetailViewComponent
