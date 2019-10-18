import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

// import Video from 'react-native-video';

import ImagePicker from 'react-native-image-crop-picker'; 
import px from '../utils/px';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class Crop extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }

  

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log(image.path);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(e => {
      alert(e);
    });
  }

  cleanupSingleImage() {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
      alert(e);
    })
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
    //   compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log(image.path);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }
  pickSingleBase64(cropit) {
    this._timer=setInterval(()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            multiple: true,
            includeBase64: true,
            includeExif: true,
            compressImageQuality:0.3 //图片压缩，1位最高质量
        }).then(image => {
            const List=[];
            console.log(image);
            for (let i=0; i<image.length; i++)
            {
                List.push('data:image/png;base64,'+image[i]['data'])
            }
            if(List.length>0){
                this.setState({
                    image:(this.state.image.concat(List)).slice(0,3)
                })
            }
        }).catch(e => console.log(e));
        this._timer&&clearInterval(this._timer);

    },1000);

}
//   renderVideo(video) {
//     return (<View style={{height: 300, width: 300}}>
//       <Video source={{uri: video.uri, type: video.mime}}
//          style={{position: 'absolute',
//             top: 0,
//             left: 0,
//             bottom: 0,
//             right: 0
//           }}
//          rate={1}
//          paused={false}
//          volume={1}
//          muted={false}
//          resizeMode={'cover'}
//          onError={e => console.log(e)}
//          onLoad={load => console.log(load)}
//          repeat={true} />
//      </View>);
//   }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

//   renderAsset(image) {
//     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//       return this.renderVideo(image);
//     }

//     return this.renderImage(image);
//   }

  render() {
    return (<View style={styles.container}>
      <ScrollView>
        {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
        {/* {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null} */}
      </ScrollView>

      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
        <Text style={styles.text}>选择拍照不剪切</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
        <Text style={styles.text}>选择拍照并剪切</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>选择单个</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
        <Text style={styles.text}>选择 Base64</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>选择多张</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Circular Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity> */}
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1}}>
        <View style={{borderColor:'#ddd',borderWidth:1,width:100,height:100}}>
        {/* <Image style={{width:100,height:100}} source={{uri:this.state.image[0]}}/> */}
        {/* <Image source={require('file:///storage/emulated/0/Pictures/dffa58a0-09e6-4e89-921b-f94e6211e485.jpg')}/> */}
        </View>
      </View>
    </View>);
  }
}
