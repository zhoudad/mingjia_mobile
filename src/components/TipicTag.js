import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { unitWidth, width } from '../AdapterUtil'
import px from '../utils/px'

export default class TipicTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static propTypes = {
        text: PropTypes.string,
        isStress: PropTypes.bool,
        newStyle:PropTypes.object
    };
    static defaultProps = {
        text: '标签',
        isStress: false,
        newStyle:null
    };
    render() {
        const {text,isStress,newStyle} = this.props
        return (
            <View
                style={[
                    {
                        height: px(32),
                        backgroundColor: isStress ? "#A1D76C" : "#F2F4F7",
                        marginRight: px(10),
                        justifyContent: 'center',
                        alignItems: 'center',
                    },newStyle
                ]}>
                <Text
                    style={{
                        color: isStress ? "#FFFFFF" : "#606266",
                        fontSize: px(20),
                        // paddingVertical:6*unitWidth,
                        paddingHorizontal: px(14),
                    }}>{text}</Text>
            </View>
        );
    }
}
