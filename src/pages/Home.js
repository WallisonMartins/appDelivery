import React, { Component } from 'react';

import { 
  View, 
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text, 
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  Platform
} from 'react-native';

import Constants from 'expo-constants';

var { height, width } = Dimensions.get("window");
import Swiper from 'react-native-swiper';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataBanner:[],
      dataCategories:[],
      dataFood:[],
      selectCatg: []
    }
  }

  componentDidMount() {
    const url = "http://tutofox.com/foodapp/api.json";
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoanding: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories,
        dataFood: responseJson.food
      })
    })
    .catch((error) => {
      console.log(error)
    })
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          vertical={true}
          scrollEnabled={true}
        >
          <View>
            <View style={{width: width, alignItems: 'center'}}>
              <Image
                resizeMode="contain" 
                style={{height: 60, width: width/2, margin: 10}} 
                source={{uri: 'http://tutofox.com/foodapp/foodapp.png'}} 
              />
              <Swiper 
                style={{height:width/2}} 
                showsButtons={false}
                loop={true}
                autoplay={true}
                autoplayTimeout={1.5}
              >
                {
                  this.state.dataBanner.map((itemmap, index) => {
                    return (
                      <View>
                        <Image 
                          style={styles.imagebanner}
                          resizeMode="contain"
                          source={{ uri: itemmap}}
                          key={index}
                        />
                      </View>
                    )
                  })
                }
              </Swiper>
            </View>
            <View style={{width:width, borderRadius:20, paddingVertical:20, marginTop: 20, backgroundColor: '#FFF'}}>
              {/* <Text style={styles.titlecatg}> Categories {this.state.selectCatg}</Text> */}
              <Text style={styles.titlecatg}> Ecolha as Categorias </Text>
              <FlatList 
                horizontal={true}
                data={this.state.dataCategories}
                renderItem={ ({ item }) => this._renderItem(item) }
                keyExtractor={ (item, index) => index.toString() }
              />
              <Text style={[styles.titlecatg, {paddingTop:20}]}>Categoria Selecionada</Text>
              <FlatList
                data={this.state.dataFood}
                numColumns={2}
                renderItem={({item}) => this._renderItemFood(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _renderItemFood(item){
    let catg = this.state.selectCatg
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image 
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View style={{height:((width/2)-20)-90, width:((width/2)-20)-10, backgroundColor: 'transparent'}}/>
          {/* <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center', color: '#f2f2f2'}}>{item.name}</Text> */}
          <Text style={{color: '#000', textAlign: 'center'}}>Descp Food and Details</Text>
          <Text style={{fontSize: 20, color: 'green'}}>${item.price}</Text>
        </TouchableOpacity>
      )
    }
  }

  _renderItem(item){
    return(
      <TouchableOpacity
        onPress={() => this.setState({selectCatg:item.id})}
        style={[styles.divCategories, {backgroundColor: item.color}]}
      >
        <Image
          style={{width:100,height:50}}
          resizeMode="contain"
          source={{uri: item.image}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 22}}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // backgroundColor: '#303033',
    ...Platform.select({
      ios: {
        marginTop: 0
      },
      android: {
        marginTop: Constants.statusBarHeight
      }
    }),
  },
  imagebanner: {
    height: width/2,
    width: width-40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  titlecatg: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000'
  },
  divCategories: {
    backgroundColor: 'red',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  imageFood: {
    width:((width/2) -20)-10,
    height: ((width/2)-20)-30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45
  },
  divFood: {
    width: (width/2)-20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: '#ededed'
  }
});

