import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Navbar2, AppText, Appbtn } from "../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

class TermsofUse extends Component {
  state = {
    active: "Active",
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <Navbar2
            arrow={() => {
              this.props.navigation.goBack();
            }}
            Text={"Terms of Use"}
          />

          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTextHeader}>Terms of Use</Text>
            <Text style={styles.abouttextbottom}>
			  Making use of the apps/site mean you will have to behave, conduct according certain social rules.
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("170%"),
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  TopLogoContainer: {
    backgroundColor: "white",
    width: "100%",
    height: h("20%"),
    alignItems: "center",
    justifyContent: "center",
  },

  logoimg: {
    width: "80%",
    height: h("20%"),
    resizeMode: "contain",
  },
  aboutContainer: {
    backgroundColor: "white",
    width: "90%",
    height: h("145%"),
    marginTop: h("2%"),
    paddingLeft: h("3%"),
    paddingRight: h("3%"),
    paddingTop: h("3%"),
    paddingBottom: h("3%"),
  },
  aboutTextHeader: {
    color: "black",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  abouttextbottom: {
    color: "#0007",
    fontSize: h("2%"),
  },
});

export default TermsofUse;
