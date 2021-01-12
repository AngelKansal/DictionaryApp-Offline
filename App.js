import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import db from './database'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :"",
      definition : ""
    };
  }

getWord=(text)=>{
    var text = text.toLowerCase()
    try{
    var word = db[text]["word"]
    var lexicalCategoray = db[text]["lexicalCategory"]
     var definition = db[text]["definition"]
          this.setState({
 "word" : word, 
 "definition" :definition,
 "lexicalCategory": lexicalCategory     
})
    }
    catch(err){
      alert("Sorry this word is not avaible for now")
        this.setState({
  'text': '',
  'isSearchedPressed': false
  })
    }
}


  render() {
  return (
    <View style={{backgroundColor: 'lightblue', flex: 1}}>
    <View style={styles.textContainer}>
    <Text style={styles.text}>
    DICTIONARY APP
    </Text>
    </View>
    <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
            value={this.state.text}
          />
      <TouchableOpacity
      style={styles.goButton}
       onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
      <Text  style={styles.buttonText}>
      SEARCH
      </Text>
      </TouchableOpacity>
      <View>
      <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18, marginTop: -23 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18, marginTop: -23}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.defination}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18, marginTop: -23}}>
                      {this.state.definition}
                    </Text>
                    
                  </View>
                </View>
              )
              :null
            }
      </View>
      </View>
  );
}}

const styles = StyleSheet.create({
  inputBox:{
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'centre',
    borderWidth: 5,
    outline: 'none'
  },
  goButton:{
    width: '50%',
    height: 20,
    alignSelf: 'center',
    margin: 10,
    padding: 10
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -20
  },
  detailsTitle:{
    width: 100,
    height: 20,
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: -240,
    marginTop: 20,
  },
 defination:{
   width: 100,
    height: 20,
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: -102,
    marginTop: 20,
 },
 textContainer:{
    backgroundColor: 'lightgreen',
    height: 60,
  },
  text:{
    color: 'black',
    height: 20,
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',

  }
});

