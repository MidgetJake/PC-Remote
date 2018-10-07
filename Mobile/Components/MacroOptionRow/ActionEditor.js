import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Button, Portal, Dialog, Checkbox, Text, Divider, RadioButton } from 'react-native-paper';

type Props = {};
export default class ActionEditor extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            action: this.props.action || 'keypress',
            value: this.props.value || 'a',
        };
    };

    updateValue = value => {
        this.setState({ value });
    };

    toggleDouble = () => {
        const newState = {
            ...this.state,
            value: { ...this.state.value, double: !this.state.value.double },
        };

        this.setState(newState);
        this.props.update(newState);
    };

    setMouseButton = button => {
        const newState = {
            ...this.state,
            value: { ...this.state.value, button },
        };

        this.setState(newState);
        this.props.update(newState);
    };

    static getDerivedStateFromProps(props, state) {
        return {
            action: props.action,
            value: props.value,
        };
    }

    render() {
        return (
            <View>
                {this.state.action === 'mouseclick' ? (
                    <View style={styles.actions}>
                        <View style={styles.radioList}>
                            <Text>Button:</Text>
                            <RadioButton.Group onValueChange={this.setMouseButton} value={this.state.value.button}>
                                <View style={styles.radioSet}>
                                    <Text>Left</Text>
                                    <RadioButton value={0}/>
                                </View>
                                <View style={styles.radioSet}>
                                    <Text>Middle</Text>
                                    <RadioButton value={2}/>
                                </View>
                                <View style={styles.radioSet}>
                                    <Text>Right</Text>
                                    <RadioButton value={1}/>
                                </View>
                            </RadioButton.Group>
                        </View>

                        <View style={styles.singleCheck}>
                            <Text>Double click:</Text>
                            <Checkbox
                                status={this.state.value.double ? 'checked' : 'unchecked'}
                                onPress={this.toggleDouble}
                            />
                        </View>
                    </View>
                ) : (
                    <View>
                        {this.state.action === 'sendstring' ? (
                            null
                        ) : (
                            null
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    root: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    singleCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 7,
    },
    radioSet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1,
    },
});
