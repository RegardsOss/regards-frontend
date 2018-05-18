import React from 'react';

import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ResetIcon from 'material-ui/svg-icons/action/settings-backup-restore';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import ColorPicker from './ColorPicker';
import { regexColor } from '../../utils/ColorHelper'

const styles = {
    container: {
        listItem: {
            innerDiv: {
                paddingTop: 8,
                paddingBottom: 6
            },
            rightIcon: {
                top: 2,
                marginTop: 10
            },
            leftIcon: {
                top: 0,
                marginTop: 12,
                padding: 0
            },
            leftIconMenu: {
                top: 0,
                marginTop: 0,
                padding: 0
            }
        }
    }
}

function renderBoth(resetOverwrite, removeFromOverwrites, overwriteSelector) {
    return (
        <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            style={styles.container.listItem.leftIconMenu}
            useLayerForClickAway
            onClick={e => e.stopPropagation()}
        >
            <MenuItem
                primaryText="Reset"
                onClick={e => resetOverwrite(overwriteSelector)}
                leftIcon={<ResetIcon style={{ color: 'gray' }} />}
            />
            <MenuItem
                primaryText="Remove"
                onClick={e => removeFromOverwrites(overwriteSelector)}
                leftIcon={<DeleteIcon style={{ color: 'gray' }} />}
            />
        </IconMenu>
    )
}

function renderRemove(removeFromOverwrites, overwriteSelector) {
    return (<IconButton
        key="remove"
        style={styles.container.listItem.leftIcon}
        title="Remove overwrite"
        iconStyle={{ color: 'gray' }}
        onClick={e => e.stopPropagation() || removeFromOverwrites(overwriteSelector)}
    >
        <DeleteIcon />
    </IconButton>)
}

function renderReset(resetOverwrite, overwriteSelector) {
    return (<IconButton
        key="reset"
        style={styles.container.listItem.leftIcon}
        title="Reset to initial overwrite"
        iconStyle={{ color: 'gray' }}
        onClick={e => e.stopPropagation() || resetOverwrite(overwriteSelector)}
    >
        <ResetIcon />
    </IconButton>)
}

function renderLeftIcon(allowRemove, allowReset, resetOverwrite, removeFromOverwrites, overwriteSelector) {
    if (allowReset && allowRemove) {
        return renderBoth(resetOverwrite, removeFromOverwrites, overwriteSelector)
    }
    if (allowReset) {
        return renderReset(resetOverwrite, overwriteSelector)
    }
    if (allowRemove) {
        return renderRemove(removeFromOverwrites, overwriteSelector)
    }
    return null
}

export const createAttributes = (object, overwrites, addToOverwrites, removeFromOverwrites, resetOverwrite, overwriteSelectorParent = [], allowRemove, allowReset) => {
    const changeNumericValue = (selector, val) => {
        if (!!/^\d+$/.test(val)) {
            addToOverwrites(selector, parseInt(val));
        }
    };
    let overwriteParent = overwriteSelectorParent.reduce((result, selector) => result[selector] || {}, overwrites);

    return Object.keys(object).map(key => {
        let children, right, left;
        let value = object[key];
        let type = typeof value;
        let secondaryText = type === "string" ? value : null;
        let overwriteSelector = [...overwriteSelectorParent, key];

        if (!!overwriteParent[key]) {
            left = renderLeftIcon(allowRemove, allowReset, resetOverwrite, removeFromOverwrites, overwriteSelector)
        }

        switch (type) {
            case "object": //Nested
                children = createAttributes(value, overwrites, addToOverwrites, removeFromOverwrites, resetOverwrite, overwriteSelector, allowRemove, allowReset);
                break;
            case "string": //Color or text
                if (!value.match(regexColor)) {
                    //text
                    return <div key={key} style={{ position: 'relative', marginLeft: 18 * (overwriteSelector.length), paddingLeft: 72, paddingRight: 56 }}>
                        <div style={{ position: 'absolute', left: 4 }}>
                            {left}
                        </div>
                        <TextField
                            value={value}
                            floatingLabelText={key}
                            floatingLabelFixed={true}
                            fullWidth={true}
                            style={{ marginTop: -14, marginLeft: -15 }}
                            onChange={(evt, text) => addToOverwrites(overwriteSelector, text)}
                        />
                    </div>
                }
                // color
                right = <IconButton style={{ backgroundColor: value, ...styles.container.listItem.rightIcon }} />;
                children = [<ColorPicker key={key} color={value} onColorChange={color => addToOverwrites(overwriteSelector, color)} />]

                break;
            case "number": //Size
                return <div key={key} style={{ position: 'relative', marginLeft: 18 * (overwriteSelector.length), paddingLeft: 72, paddingRight: 56 }}>
                    <div style={{ position: 'absolute', left: 4 }}>
                        {left}
                    </div>
                    <TextField
                        value={value}
                        floatingLabelText={key}
                        floatingLabelFixed={true}
                        fullWidth={true}
                        style={{ marginTop: -14, marginLeft: -15 }}
                        onChange={(evt, text) => changeNumericValue(overwriteSelector, text)}
                    />
                </div>
            default:
                return null;
        }

        return (
            <ListItem
                key={key}
                primaryText={key}
                secondaryText={secondaryText}
                primaryTogglesNestedList={true}
                innerDivStyle={!!secondaryText ? styles.container.listItem.innerDiv : null}
                rightIcon={right}
                leftIcon={left}
                insetChildren={!left}
                nestedItems={children}
            />
        );
    });
}