import React from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
const options = {
  title: 'Video Picker', 
  mediaType: 'video', 
  storageOptions:{
    skipBackup:true,
    path:'video'
  }
};
export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      avatarSource:''
    }
  }

ChooseImage=()=>{

  ImagePicker.showImagePicker((options), (response) => {
    console.log('Response = ', response);
   
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({
        avatarSource: response.uri
      });
    }
  });
}

 render()
  {
    return(
      <View>
      <View style={{width:300,height:300}}>
      <Video source={{uri: this.state.avatarSource}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
      </View>
      <View>
      <TouchableOpacity  onPress={this.ChooseImage} style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:30,color:'blue',fontWeight:'bold'}}>
          Select Video
        </Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width:300,
    height:300
  },
});