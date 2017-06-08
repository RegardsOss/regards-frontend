/**
 * LICENSE_PLACEHOLDER
 **/
import { Tab, Tabs } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import Measure from 'react-measure'
import { LoadableContentDialogContainer } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import AttributesViewComponent from './attributes/AttributesViewComponent'
import DescriptionComponent from './description/DescriptionComponent'

/**
 * Shows entity detail view. Note: you can add here properties that should be sent to inner dialog.
 * Note this component has state (for graphics variable)
 */
class DetailViewComponent extends React.Component {

  static propTypes = {
    // entity information API
    entityLabel: PropTypes.string,
    // entity attributes, empty array allowed
    attributes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      renderer: PropTypes.func.isRequired,
      renderValue: PropTypes.any,
    })).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    // Callback to run a new search with given tag
    onSearchTag: PropTypes.func,
    descriptionFileURL: PropTypes.string,
    descriptionFile: PropTypes.shape({
      entityId: PropTypes.number.isRequired,
      contentType: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
    // dialog API
    open: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired, // external content loaded ? (separe from URL content loaded)
    onClose: PropTypes.func.isRequired, // on cloase callback
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
    const tabStyles = { height: '100%' }
    const actions = [
      <FlatButton
        key="button"
        label={this.context.intl.formatMessage({ id: 'entities.common.close.button' })}
        onTouchTap={onClose}
      />]
    return (
      <LoadableContentDialogContainer
        open={open}
        loaded={loaded}
        dialogHeightPercent={descriptionDialog.heightPercent}
        dialogWidthPercent={descriptionDialog.widthPercent}
        onRequestClose={onClose}
        loadingMessage={this.context.intl.formatMessage({ id: 'entities.common.loading.message' })}
        actions={actions}
        {...otherDialogProperties}
      >
        <Measure onMeasure={this.onContentHeightChanges}>
          <Tabs style={tabStyles}>
            <Tab label={this.context.intl.formatMessage({ id: 'entities.common.attributes.tabs' })}>
              <AttributesViewComponent
                entityLabel={entityLabel}
                attributes={attributes}
                contentHeight={this.state.contentHeight}
                tags={this.props.tags}
                onSearchTag={this.props.onSearchTag}
              />
            </Tab>
            <Tab label={this.context.intl.formatMessage({ id: 'entities.common.description.tabs' })}>
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
