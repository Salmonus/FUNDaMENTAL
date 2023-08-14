import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Header2 from "./Header";
import { LadderIcon } from "../../assets/icons";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

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
      <Header2
        text="Character Sheet"
        leftButton={<LadderIcon height={30} width={30} />}
        rightButton={
          <TouchableOpacity
            style={{backgroundColor: "#2196F3", padding: 8, borderRadius: 10}}
            onPress={saveNFTDataToFirebase}
          >
            <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>Mint</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={[styles.tile, {justifyContent: "space-around"}]}>
          <Text style={{fontSize: 20, fontWeight: 600, flex: 1, textAlign: "center"}}>Balance : </Text>
          <View style={[styles.items, {flex: 2}]}>
            <Text style={{fontSize: 20}}>100 UNITS</Text>
          </View>
        </View>
        <View style={[styles.tile, {borderWidth: 0, paddingVertical: 0}]}>
          <View style={[styles.nestedTile, {width: 88, height: 200}]}>
            <Text style={{fontSize: 20, fontWeight: 600}}>Stats</Text>
          </View>
          <View style={[styles.nestedTile, {flex: 1}]}>
            
          </View>
          <View style={[styles.nestedTile, {width: 88, height: 200}]}>
            <Text style={{fontSize: 20, fontWeight: 600}}>Name</Text>
            <Text style={{fontSize: 16}}>layz</Text>
          </View>
        </View>
        <View style={[
          styles.tile, 
          {
            justifyContent: "space-around", 
            marginBottom: 0, 
            borderBottomLeftRadius: 0, 
            borderBottomRightRadius: 0
          }
          ]}>
          <Text style={{fontSize: 20, fontWeight: 600, flex: 1, textAlign: "center"}}>Inventory</Text>
          <View style={[styles.items, {flex: 2}]}>
            <Text style={{fontSize: 20}}>Item 1</Text>
            <Text style={{fontSize: 20}}>Item 2</Text>
            <Text style={{fontSize: 20}}>Item 3</Text>
          </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  mint: {
    backgroundColor: "#2196F3",
    padding: 8,
    margin: 2,
  },
  tile: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 8
  },
  nestedTile: {
    borderWidth: 2,
    borderColor: "black",
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
    width: 63.15,
    height: 63.15,
    backgroundColor: "white",
    borderWidth: 2,
    margin: -2
  }
});

export default Profile;