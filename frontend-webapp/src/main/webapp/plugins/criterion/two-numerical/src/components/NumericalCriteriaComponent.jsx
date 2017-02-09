/**
 * LICENSE_PLACEHOLDER
 **/
import { keys } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import NumericalComparatorComponent from './NumericalComparatorComponent'
import EnumNumericalComparator from '../model/EnumNumericalComparator'

/**
 * Plugin component allowing the user to configure the numerical value of an attribute with a mathematical comparator (=, >, <=, ...).
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.number,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attribute: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      type: React.PropTypes.string,
    }),
    /**
     * Init with a specific comparator set.
     */
    comparator: React.PropTypes.oneOf(keys(EnumNumericalComparator)),
    /**
     * If true, the attribute name, comparator and and field will be rendered in reversed order
     * Default to false.
     */
    reversed: React.PropTypes.bool,
    /**
     * If true, the attribute name will not be rendered.
     * Default to false.
     */
    hideAttributeName: React.PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      comparator: props.comparator || 'EQ',
    }
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const { attribute, pluginInstanceId, onChange } = this.props
    const { comparator } = this.state

    this.setState({
      value: this.parse(newValue),
    })

    // Call the plugin's output callback
    onChange({
      attribute,
      comparator,
      value: newValue,
    }, pluginInstanceId)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator The new value of the comparator.
   */
  handleChangeComparator = (comparator) => {
    const { attribute, pluginInstanceId, onChange } = this.props
    const { value } = this.state

    this.setState({
      comparator,
    })

    // Call the plugin's output callback
    onChange({
      attribute,
      comparator,
      value,
    }, pluginInstanceId)
  }

  /**
   * Parses the value given from the field input component.
   *
   * @param {String} value
   */
  parse = value => parseFloat(value)

  /**
   * Formats the value before displaying in the field input component.
   *
   * @param {String} value
   */
  format = value => value

  render() {
    const { attribute, reversed, hideAttributeName } = this.props
    const { comparator } = this.state

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) content.push(<span key="attributeName">{attribute.name}</span>)
    content.push(
      <NumericalComparatorComponent
        key="comparator"
        value={comparator}
        onChange={this.handleChangeComparator}
      />,
    )
    content.push(
      <TextField
        id="search"
        key="field"
        type="number"
        floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
        value={this.format(this.state.value)}
        onChange={this.handleChangeValue}
        style={{
          top: -10,
          width: '33%',
        }}
      />,
    )

    if (reversed) content.reverse()

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0px 16px',
          }}
        >
          {content}
        </div>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
