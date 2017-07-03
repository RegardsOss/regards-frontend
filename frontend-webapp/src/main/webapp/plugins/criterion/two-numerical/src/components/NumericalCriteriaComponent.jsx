/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
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
     * Callback to change the current criteria values in form
     * Parameters :
     * value:<value>
     * comparator:<ComparatorEnumType>
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Label of the field
     */
    label: React.PropTypes.string.isRequired,
    /**
     * Init with a specific comparator set.
     */
    comparator: React.PropTypes.oneOf(values(EnumNumericalComparator)),
    /**
     * Default value to display
     */
    value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
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
    value: undefined,
    comparator: EnumNumericalComparator.EQ,
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const { onChange, comparator } = this.props
    onChange(this.parse(newValue), comparator)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator The new value of the comparator.
   */
  handleChangeComparator = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
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
  format = value => value || ''

  render() {
    const { label, comparator, value, reversed, hideAttributeName, hideComparator, fixedComparator } = this.props

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) {
      content.push(<span
        key="label" style={{
        margin: '0px 10px',
      }}
      >{label}</span>)
    }
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
