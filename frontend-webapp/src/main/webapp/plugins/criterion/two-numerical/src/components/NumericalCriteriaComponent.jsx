/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import NumericalComparatorComponent from './NumericalComparatorComponent'
import EnumNumericalComparator from '../model/EnumNumericalComparator'
import AttributeModel from '../common/AttributeModel'

/**
 * Plugin component allowing the user to configure the numerical value of an attribute with a mathematical comparator (=, >, <=, ...).
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attribute: AttributeModel.isRequired,
    /**
     * Init with a specific comparator set.
     */
    comparator: React.PropTypes.oneOf(values(EnumNumericalComparator)),
    /**
     * Default value to display
     */
    value: React.PropTypes.number,
    /**
     * Does the comparator is modifiable
     */
    fixedComparator: React.PropTypes.bool,
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
    /**
     * If true, the commparator will not be rendered.
     * Default to false.
     */
    hideComparator: React.PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
    fixedComparator: false,
    hideComparator: false,
    value: '',
    comparator: EnumNumericalComparator.EQ
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const { onChange, attribute, comparator } = this.props
    onChange(attribute, this.parse(newValue), comparator)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator The new value of the comparator.
   */
  handleChangeComparator = (comparator) => {
    const { onChange, attribute, value } = this.props
    onChange(attribute, value, comparator)
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
    const { attribute, comparator, value, reversed, hideAttributeName, hideComparator, fixedComparator } = this.props

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) content.push(<span key="attributeName" style={{
      margin: '0px 10px',
      fontSize: '1.3em'
    }}>{attribute.label || attribute.name}</span>)
    if (!hideComparator) {
      content.push(
        <NumericalComparatorComponent
          key="comparator"
          value={comparator}
          onChange={this.handleChangeComparator}
          fixedComparator={fixedComparator}
        />,
      )
    }
    content.push(
      <TextField
        id="search"
        key="field"
        type="number"
        floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
        value={this.format(value)}
        onChange={this.handleChangeValue}
        style={{
          top: -13,
          maxWidth: 80,
          margin: '0px 10px',
        }}
      />,
    )

    if (reversed) content.reverse()

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {content}
      </div>
    )
  }
}

export default NumericalCriteriaComponent
