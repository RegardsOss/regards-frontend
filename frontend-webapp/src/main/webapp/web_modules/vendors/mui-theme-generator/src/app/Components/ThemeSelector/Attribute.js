import React from 'react';

import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ResetIcon from 'material-ui/svg-icons/action/restore';

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
            }
        }
    }
}

export const createAttributes = (object, overwrites, addToOverwrites, removeFromOverwrites, overwriteSelectorParent = [], allowReset) => {
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

        if (!!overwriteParent[key] && allowReset) {
            left = <IconButton style={styles.container.listItem.leftIcon} iconStyle={{ color: 'gray' }} onClick={e => removeFromOverwrites(overwriteSelector)}><ResetIcon /></IconButton>
        }

        switch (type) {
            case "object": //Nested
                children = createAttributes(value, overwrites, addToOverwrites, removeFromOverwrites, overwriteSelector, allowReset);
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
                            style={{ marginTop: -14 }}
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
                        style={{ marginTop: -14 }}
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