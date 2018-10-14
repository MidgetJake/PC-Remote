import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import ConnectView from '../../Views/ConnectView';
import MacroView from '../../Views/MainButtons';

export default createStackNavigator(
    {
        home: { screen: ConnectView },
        macros: { screen: MacroView },
    },
    {
        navigationOptions: ({ navigation }) => ({
            header: (
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
                    <Appbar.Content title="Examples" />
                </Appbar.Header>
            ),
        }),
    }
);