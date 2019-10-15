import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { unitWidth, width } from '../AdapterUtil'

export default class TipicTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static propTypes = {
        text: PropTypes.string,
        isStress: PropTypes.bool,
    };
    static defaultProps = {
        text: '标签',
        isStress: false,
    };
    render() {
        const {text,isStress} = this.props
        return (
            <View
                style={{
                    height: 32 * unitWidth,
                    backgroundColor: isStress ? "#A1D76C" : "#F2F4F7",
                    marginRight: 10 * unitWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: isStress ? "#FFFFFF" : "#606266",
                        fontSize: 20 * unitWidth,
                        // paddingVertical:6*unitWidth,
                        paddingHorizontal: 14 * unitWidth,
                    }}>{text}</Text>
            </View>
        );
    }
}
