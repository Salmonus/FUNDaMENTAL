import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { Header } from "../../components";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const deviceWidth = Dimensions.get("window").width;

const Profile = () => {
  const saveNFTDataToFirebase = () => {
    const user = auth.currentUser;
    if (user) {
      const nftData = {
        "CONTRACT_ADDRESS": "0x0089206500CFba2Be87b2c51cE39Efa72910C2BD",
        "SCAN_LINK": "https://polygonscan.com/token/0x0089206500CFba2Be87b2c51cE39Efa72910C2BD",
        "NETWORK": {
          "NAME": "Polygon",
          "SYMBOL": "Matic",
          "ID": 137
        },
        "NFT_NAME": `${this.state.profile.nickname}_${Object.keys(this.state.clothesIndices).join('_')}`,
        "SYMBOL": "TSNFT",
        "MAX_SUPPLY": 1,
        "WEI_COST": 0,
        "DISPLAY_COST": 0,
        "GAS_LIMIT": 200000,
        "MARKETPLACE": "Opensea",
        "MARKETPLACE_LINK": "https://opensea.io/collection/fundamental-fundy",
        "SHOW_BACKGROUND": true
      };

      const docRef = doc(db, "profiles", "NFT");
      setDoc(docRef, nftData)
        .then(() => {
          Alert.alert("NFT Data saved successfully!");
        })
        .catch((error) => {
          Alert.alert("Error saving NFT Data: ", error.message);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Character Sheet"
        rightButton={<TouchableOpacity
          style={{backgroundColor: "#2196F3", padding: 8, borderRadius: 8,}}
          onPress={saveNFTDataToFirebase}
        >
          <Text style={{color: "white", fontSize: 16, fontFamily: "ChakraPetch-Bold"}}>Mint</Text>
        </TouchableOpacity>}
      />
      <ScrollView>
        <View style={{borderColor: "white", borderWidth: 1, borderRadius: 8, justifyContent: "center", margin: 8}}>
          <Image 
            source={require("../../assets/images/character-tile.png")} 
            style={{width: "100%"}}
            resizeMode="stretch"
          />
          <View style={[styles.tile, {borderWidth: 0, position: "absolute", justifyContent: "space-around"}]}>
            <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-SemiBold", flex: 1, textAlign: "center"}}>Balance : </Text>
            <View style={[styles.items, {flex: 2}]}>
              <Text style={{color: "white", fontFamily: "ChakraPetch-Regular", fontSize: 20}}>100 UNITS</Text>
            </View>
          </View>
        </View>
        <View style={[styles.tile, {height: 200}]}>
          <Image 
              source={require("../../assets/images/character-tile.png")} 
              style={{flexGrow: 1, height: 200}}
              resizeMode="cover"
          />
          <View style={{flexDirection: "row", position: "absolute", width: "100%"}}>
            <View style={[styles.nestedTile, {width: 88, height: 200}]}>
              <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-SemiBold"}}>Stats</Text>
            </View>
            <View style={[styles.nestedTile, {flex: 1}]}>
              
            </View>
            <View style={[styles.nestedTile, {width: 88, height: 200}]}>
              <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-SemiBold"}}>Name</Text>
              <Text style={{color: "white", fontSize: 16, fontFamily: "ChakraPetch-Regular"}}>layz</Text>
            </View>
          </View>
        </View>
        <View style={[styles.tile, {flex: 1, height: (deviceWidth)*3/7 + 24, borderWidth: 0}]}>
          <Image 
            source={require("../../assets/images/character-tile.png")} 
            style={{flexGrow: 1, height: "100%"}}
            resizeMode="cover"
          />
          <View style={{position: "absolute"}}>
            <View style={[
              styles.tile, 
              {
                justifyContent: "space-around", 
                marginBottom: 0, 
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
              }
              ]}>
              <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-SemiBold", flex: 1, textAlign: "center"}}>Inventory</Text>
              {/* <View style={[styles.items, {flex: 2}]}>
                <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-Regular"}}>Item 1</Text>
                <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-Regular"}}>Item 2</Text>
                <Text style={{color: "white", fontSize: 20, fontFamily: "ChakraPetch-Regular"}}>Item 3</Text>
              </View> */}
            </View>
            <View style={{marginHorizontal: 8, flexDirection: "row"}}>
              <View style={[styles.inventoryItem, {marginLeft: 0}]}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
            </View>
            <View style={{marginHorizontal: 8, flexDirection: "row"}}>
              <View style={[styles.inventoryItem, {marginLeft: 0}]}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
            </View>
            <View style={{marginHorizontal: 8, flexDirection: "row"}}>
              <View style={[styles.inventoryItem, {marginLeft: 0}]}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
              <View style={styles.inventoryItem}></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    alignItems: "center",
    gap: 8
  },
  mint: {
    backgroundColor: "#2196F3",
    padding: 8,
    margin: 2,
  },
  tile: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 8,
    marginBottom: 8
  },
  nestedTile: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  inventoryItem: {
    width: (deviceWidth)*1/7,
    height: (deviceWidth)*1/7,
    borderWidth: 1,
    borderColor: "white",
    margin: -1
  }
});

export default Profile;