/**
 * Builds a node allowing to display a left & a right text in the {@code primaryText} of a {@link MenuItem}.
 *
 * @author Xavier-Alexandre Brochard
 */
export const buildMenuItemPrimaryText = (leftContent, rightContent) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {leftContent}
    <span style={{ color: '#bdbdbd' }}>
      {rightContent}
    </span>
  </div>
)
