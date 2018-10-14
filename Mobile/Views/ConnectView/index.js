import React, {Component} from 'react';
import { View,  ScrollView, AsyncStorage, Dimensions } from 'react-native';
import style from './style';
import { FAB, Button, Appbar, withTheme, Text, Card, TouchableRipple } from 'react-native-paper';
import { SocketContext } from '../../Components/SocketProvider/context';
import ConnectToDevice from '../../Components/ConnectToDevice';

type Props = {};
class ConnectView extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        header: (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
            <Appbar.Content title="Connect to device" />
        </Appbar.Header>
        ),
    });

    constructor(props) {
        super(props);

        this.state= {
            ips: [],
            open_newdevice: false,
            connectable: [],
        };

        AsyncStorage.getItem('savedips').then(list => {
            console.log('list', list);
            const newlist = JSON.parse(list).saved;
            const devices = [];
            for(let device of newlist) {
                devices.push(
                    <SocketContext.Consumer key={this.state.connectable.length + devices.length}>
                        {socket => (
                            <Card
                                style={{...style.macro, backgroundColor: this.props.theme.colors.primary}}
                                key={this.state.connectable.length + 1}
                            >
                                <TouchableRipple
                                    onPress={() => this.handleConnect(socket, device.ip)}
                                    style={style.ripple}
                                    onLongPress={() => this.openOptions()}
                                >
                                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                                        {device.name}
                                    </Text>
                                </TouchableRipple>
                            </Card>
                        )}
                    </SocketContext.Consumer>
                )
            }
            this.setState({ connectable: [...this.state.connectable, ...devices] });
        }).catch(() => {
            AsyncStorage.setItem('savedips', JSON.stringify({saved: []}))
        })
    };

    openOptions = () => {
        console.log('OPTIONS');
    };

    openCreateView = () => {
        this.setState({ open_create: true });
    };

    closeCreateView = () => {
        this.setState({ open_create: false });
    };

    handleNewDevice = (ip, name) => {
        this.setState({ ips: [...this.state.ips, {ip, name}] });

        AsyncStorage.getItem('savedips').then(list => {
            console.log('newlist', list);
            const oldlist = JSON.parse(list);

            const newlist = {
                saved: [...oldlist.saved, {ip, name}],
            };
            AsyncStorage.setItem('savedips', JSON.stringify(newlist));
            this.setState({
                connectable: [
                    ...this.state.connectable,
                    <SocketContext.Consumer key={this.state.connectable.length + 1}>
                        {socket => (
                            <Card
                                style={{...style.macro, backgroundColor: this.props.theme.colors.primary}}
                                key={this.state.connectable.length + 1}
                            >
                                <TouchableRipple
                                    onPress={() => this.handleConnect(socket, ip)}
                                    style={style.ripple}
                                    onLongPress={() => this.openOptions()}
                                >
                                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                                        {name}
                                    </Text>
                                </TouchableRipple>
                            </Card>
                        )}
                    </SocketContext.Consumer>,
                ],
                open_create: false,
            });
        })
    };

    handleConnect = (socket, ip) => {
        console.log('test');
        socket.setServer(ip).then(() => {
            this.props.connected();
        });
    };

    render() {
        const { theme } = this.props;

        return (

            <SocketContext.Consumer>
                {socket => (
                    <View style={{...style.back, backgroundColor: theme.colors.background}}>
                        <ScrollView style={style.back}>
                            { this.state.connectable }
                        </ScrollView>
                        <View style={style.fab}>
                            <FAB style={{backgroundColor: theme.colors.primary}} icon={'add'} onPress={this.openCreateView}/>
                        </View>
                        {this.state.open_create ? (
                            <ConnectToDevice
                                onClose={this.closeCreateView}
                                onSubmit={this.handleNewDevice}
                            />
                        ) : (
                            null
                        )}
                    </View>
                )}
            </SocketContext.Consumer>
        );
    }
}

export default withTheme(ConnectView);
