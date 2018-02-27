import React from 'react';
import pick from 'lodash/pick'
import concat from 'lodash/concat'
import omit from 'lodash/omit'
import { List, ListItem } from 'material-ui/List';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import ComponentIcon from 'material-ui/svg-icons/action/view-quilt';

import { createAttributes } from '../ThemeSelector/Attribute';


export const SideBar = ({ overwrites, theme, customConfigurationKeys, addToOverwrites, removeFromOverwrites }) => {
    const {
        alternativeTheme,
        mainTheme: {
            palette,
            ...otherMainThemes,
        }
    } = theme
    const materialUIProps = omit(otherMainThemes, concat(customConfigurationKeys, 'rawTheme', 'baseTheme', 'themeName'))
    const regardsCustomComp = pick(otherMainThemes, customConfigurationKeys)
    let paletteItems = createAttributes(palette, overwrites, addToOverwrites, removeFromOverwrites, ["mainTheme", "palette"], true);
    let materialItems = createAttributes(materialUIProps, overwrites, addToOverwrites, removeFromOverwrites, ["mainTheme"], true);
    let regardsItems = createAttributes(regardsCustomComp, overwrites, addToOverwrites, removeFromOverwrites, ["mainTheme"], true);
    let alternativeItems = createAttributes(alternativeTheme, overwrites, addToOverwrites, removeFromOverwrites, ["alternativeTheme"], true);

    return (
        <div>
            <List>
                <ListItem
                    primaryText="Palette"
                    leftIcon={<PaletteIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={paletteItems}
                />
                <ListItem
                    primaryText="Material components"
                    leftIcon={<ComponentIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={materialItems}
                />
                <ListItem
                    primaryText="Regards components"
                    leftIcon={<ComponentIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={regardsItems}
                />
                <ListItem
                    primaryText="Secondary theme"
                    leftIcon={<ComponentIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={alternativeItems}
                />
            </List>
        </div>
    );
};