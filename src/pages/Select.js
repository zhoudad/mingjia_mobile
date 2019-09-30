import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid
} from 'react-native';
import { unitWidth, width } from '../AdapterUtil'
export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    selected() {
        // if(this.state.text == ''){
        //   ToastAndroid.show('内容不能为空', ToastAndroid.SHORT);
        //   return
        // }
        this.props.navigation.navigate('Main')
        // axios({
        //   method: 'post',
        //   url: 'http://192.168.10.79:8080/choose',
        //   data: {
        //     name: this.state.text,
        //     token: this.state.token
        //   }
        // }).then((res) => {
        //     console.log(res)
        //     this.props.navigation.navigate('Main')
        //   })
      }

    render() {
        return (
            <ScrollView style={styles.selectPage}>
                <View style={styles.logo}>
                </View>
                <View style={styles.selectTit}>
                    <Text style={{ textAlign: 'center', fontSize: 24*unitWidth, }}>请选择开发商并输入相应的识别码 </Text>
                    <Text style={{ marginTop: 20 * unitWidth, textAlign: 'center',fontSize: 24*unitWidth, }}>温馨提示:不同的开发商有不同的识别码和楼盘信息哦！</Text>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <KeyboardAvoidingView behavior={'position'} >
                        <TextInput
                            style={styles.selectInput}
                            placeholder='请输入相应的开发商或者楼盘'
                            onChangeText={(text) => this.setState({text})}
                        ></TextInput>
                    </KeyboardAvoidingView>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{alignItems:'center'}}>
                    <Text style={styles.selectButton} onPress={() => this.selected()}>进入App</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    selectPage: {
        flex: 1,
        width: width,
        paddingHorizontal: 20 * unitWidth,
    },
    logo: {
        backgroundColor: '#ddd',
        marginTop: 280 * unitWidth,
        height: 120 * unitWidth,
    },
    selectTit: {
        alignItems: 'center',
        marginTop: 60 * unitWidth,
    },
    selecrItem: {
        backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    selectInput: {
        width: 480 * unitWidth,
        height: 75 * unitWidth,
        borderRadius: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 45 * unitWidth,
        fontSize:28 * unitWidth,
        backgroundColor: '#f5f7fa',
        textAlign: 'center'
    },
    selectButton: {
        color: '#fff',
        width: 540 * unitWidth,
        height: 90 * unitWidth,
        // fontSize: 20,
        textAlign: 'center',
        lineHeight: 90 * unitWidth,
        backgroundColor: '#ea4c4c',
        borderRadius: 45 * unitWidth,
        // height: 60,
        marginTop: 200 * unitWidth,
    }
})
