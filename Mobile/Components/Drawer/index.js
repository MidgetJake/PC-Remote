import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
    Drawer,
    withTheme,
    Switch,
    TouchableRipple,
    Text,
    Colors,
} from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';
import { withNavigation } from 'react-navigation';

type Props = {
    theme: Theme,
    toggleTheme: Function,
    toggleRTL: Function,
    isRTL: boolean,
    isDarkTheme: boolean,
};

type State = {
    open: boolean,
    drawerItemIndex: number,
};

const DrawerItemsData = [
    { name: 'home', label: 'Connect', icon: 'inbox', key: 0 },
    { name: 'macros', label: 'Macros', icon: 'star', key: 1 },
];

class DrawerItems extends React.Component<Props, State> {
    state = {
        open: false,
        drawerItemIndex: 0,
    };

    _setDrawerItem = index => {
        this.setState({ drawerItemIndex: index });
        this.props.navigator.navigation.navigate(DrawerItemsData[index].name)
    };

    render() {
        const { colors } = this.props.theme;
        console.log('nav', this.props.navigator);

        return (
            <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
                <Drawer.Section title={'Main Sector'}>
                    {DrawerItemsData.map((props, index) => (
                        <Drawer.Item
                            {...props}
                            key={props.key}
                            theme={
                                props.key === 3
                                    ? { colors: { primary: Colors.tealA200 } }
                                    : undefined
                            }
                            active={this.state.drawerItemIndex === index}
                            onPress={() => this._setDrawerItem(index)}
                        />
                    ))}
                </Drawer.Section>

                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={this.props.toggleTheme}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={this.props.isDarkTheme} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 22,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default withTheme(DrawerItems);