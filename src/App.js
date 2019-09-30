import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import Root from './container/rootStack';// app的入口

const store = configureStore();
export default class App extends Component {  

    render() {    
        return (
            <Provider store={store}>
                <Root />
           </Provider>
        ) 
    }
}