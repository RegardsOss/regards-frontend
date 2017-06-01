/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'

/**
 * Material-UI extension of the "Toggle" component, allowing to add extra left and right labels
 *
 * @author Xavier-Alexandre Brochard
 */
const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  rightLabel: {
    marginLeft: 10,
  },
  leftLabel: {},
}

const DoubleLabelToggle = ({
  rightLabel,
  leftLabel,
  ...rest
}) => (
  <div style={styles.wrapper}>
    <span style={styles.leftLabel}>
      {leftLabel}
    </span>
    <Toggle
      {...rest}
    />
    <span style={styles.rightLabel}>
      {rightLabel}
    </span>
  </div>
  )

export default DoubleLabelToggle
