/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Demo By Akhzar Nazir Simple GET API with ActivityIndicator
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,FlatList,ActivityIndicator} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state={
      isloading:true,
      dataSource:[],
      }
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){
          // Alert.alert(''+this.state.dataSource[0].title)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }else{
    return (
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
    }
  }
}
