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
import { SearchBar, AppText2, Appbtn } from "../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

class Schedule extends Component {
  state = {
    date: "",
    time: "",
    button: "",
    button2: "",
    button3: "",
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <View style={styles.TopContainer}>
            <View style={styles.ContainerForPic}>
              <View style={styles.TopLeftContianer}>
                <TouchableOpacity
                  style={styles.BackButton}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    color="#ffff"
                    size={35}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.TopMiddleContianer}>
                <Text style={styles.HeaderText}>Book Appointment</Text>
              </View>
              <TouchableOpacity
                style={styles.TopRightContianer}
              ></TouchableOpacity>
            </View>
          </View>

          <View style={styles.BoxContainer}>
            <View style={styles.left}>
              <Text style={styles.text2}>Patient Detail & Documents</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.text}>Schedule & Communication</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.right}>
              <Text style={styles.text2}>Payment Detail</Text>
            </View>
          </View>

          {/* LOGIN SCREEN */}
          <View style={styles.topDateBox}>
            <Text style={styles.Texts}>Select Date</Text>
            <Text style={styles.Texts2}>August 2020</Text>
          </View>

          {/* calander */}
          <View style={styles.topDateBox2}>
            {this.state.date === "Sun" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Sun</Text>
                <Text style={styles.dateText3}>15</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "Sun" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Sun</Text>
                <Text style={styles.dateText2}>15</Text>
              </TouchableOpacity>
            )}

            {this.state.date === "Mon" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Mon</Text>
                <Text style={styles.dateText3}>2</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "Mon" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Mon</Text>
                <Text style={styles.dateText2}>2</Text>
              </TouchableOpacity>
            )}
            {this.state.date === "Tue" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Tue</Text>
                <Text style={styles.dateText3}>3</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "Tue" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Tue</Text>
                <Text style={styles.dateText2}>3</Text>
              </TouchableOpacity>
            )}
            {this.state.date === "wed" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Wed</Text>
                <Text style={styles.dateText3}>4</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "wed" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Wed</Text>
                <Text style={styles.dateText2}>4</Text>
              </TouchableOpacity>
            )}
            {this.state.date === "thu" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Thu</Text>
                <Text style={styles.dateText3}>5</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "thu" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Thu</Text>
                <Text style={styles.dateText2}>5</Text>
              </TouchableOpacity>
            )}
            {this.state.date === "fri" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Fri</Text>
                <Text style={styles.dateText3}>6</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "fri" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Fri</Text>
                <Text style={styles.dateText2}>6</Text>
              </TouchableOpacity>
            )}
            {this.state.date === "sat" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "" });
                }}
                style={styles.DateBox3}
              >
                <Text style={styles.dateText4}>Sat</Text>
                <Text style={styles.dateText3}>7</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ date: "sat" });
                }}
                style={styles.DateBox}
              >
                <Text style={styles.dateText}>Sat</Text>
                <Text style={styles.dateText2}>7</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* calander */}

          {/* time slot */}
          <Text style={styles.leftbox}>Select an available Time Slot</Text>
          <View style={styles.TimeSLot}>
            <View style={styles.lefts}>
              {/* BUTTON1 */}
              {this.state.time === "8:00 AM - 8:15 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>8:00 AM - 8:15 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "8:00 AM - 8:15 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>8:00 AM - 8:15 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "8:30 AM - 8:45 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>8:30 AM - 8:45 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "8:30 AM - 8:45 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>8:30 AM - 8:45 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "9:00 AM - 9:15 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>9:00 AM - 9:15 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "9:00 AM - 9:15 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>9:00 AM - 9:15 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "9:30 AM - 9:45 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>9:30 AM - 9:45 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "9:30 AM - 9:45 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>9:30 AM - 9:45 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "2:00 PM - 2:15 PM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>2:00 PM - 2:15 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "2:00 PM - 2:15 PM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>2:00 PM - 2:15 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
            <View style={styles.Rights}>
              {/* BUTTON1 */}
              {this.state.time === "8:15 AM - 8:30 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>8:15 AM - 8:30 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "8:15 AM - 8:30 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>8:15 AM - 8:30 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "8:45 AM - 9:00 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>8:45 AM - 9:00 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "8:45 AM - 9:00 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>8:45 AM - 9:00 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "9:15 AM - 9:30 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>9:15 AM - 9:30 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "9:15 AM - 9:30 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>9:15 AM - 9:30 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "9:45 AM - 10:00 AM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>9:45 AM - 10:00 AM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "9:45 AM - 10:00 AM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>9:45 AM - 10:00 AM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
              {/* BUTTON1 */}
              {this.state.time === "2:15 PM - 2:30 PM" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "" });
                  }}
                  style={styles.Timebox2}
                >
                  <Text style={styles.timezone2}>2:15 PM - 2:30 PM</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ time: "2:15 PM - 2:30 PM" });
                  }}
                  style={styles.Timebox}
                >
                  <Text style={styles.timezone}>2:15 PM - 2:30 PM</Text>
                </TouchableOpacity>
              )}
              {/* BUTTON1 */}
            </View>
          </View>
          {/* time slot */}
          <Text style={styles.leftbox}>Select Communication Mode</Text>
          <View style={styles.CommunicationBox}>
            {/* call BUTTON */}
            {this.state.button === "Video call" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button: "" });
                }}
                style={styles.Buttons2}
              >
                <Text style={styles.buttonsText2}>Video Call</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button: "Video call" });
                }}
                style={styles.Buttons}
              >
                <Text style={styles.buttonsText}>Video Call</Text>
              </TouchableOpacity>
            )}
            {/* call BUTTON */}
            {/* call BUTTON */}
            {this.state.button2 === "Audio Call" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button2: "" });
                }}
                style={styles.Buttons2}
              >
                <Text style={styles.buttonsText2}>Audio Call</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button2: "Audio Call" });
                }}
                style={styles.Buttons}
              >
                <Text style={styles.buttonsText}>Audio Call</Text>
              </TouchableOpacity>
            )}
            {/* call BUTTON */}
            {/* call BUTTON */}
            {this.state.button3 === "Chat" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button3: "" });
                }}
                style={styles.Buttons2}
              >
                <Text style={styles.buttonsText2}>Chat</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ button3: "Chat" });
                }}
                style={styles.Buttons}
              >
                <Text style={styles.buttonsText}>Chat</Text>
              </TouchableOpacity>
            )}
            {/* call BUTTON */}
          </View>
          <View style={styles.buttonContainer}>
            <Appbtn
              onPress={() => {
                this.props.navigation.navigate("PaymentDetail");
              }}
              txt={"PROCEED"}
            />
          </View>
          {/* END LOGIN SCREEN */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("119%"),
    backgroundColor: "#F6F6F6",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("9%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("8%"),
    flexDirection: "row",
    marginTop: h("1%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "15%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: h('2%'),
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  HeaderText: {
    color: "white",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  BoxContainer: {
    backgroundColor: "white",
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
  },
  left: {
    // backgroundColor: 'green',
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("4%"),
    alignItems: "center",
  },
  right: {
    // backgroundColor: 'gold',
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("4%"),
    alignItems: "center",
  },
  middle: {
    // backgroundColor: 'orange',
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("4%"),
    alignItems: "center",
  },
  text: {
    color: "#003C75",
    fontSize: h("1.5%"),
    fontWeight: "bold",
    marginLeft: h("1%"),
    marginRight: h("1%"),
  },
  text2: {
    color: "#003C75",
    fontSize: h("1.3%"),
    marginLeft: h("2%"),
    marginRight: h("1%"),
  },
  line: {
    backgroundColor: "#003C75",
    width: "100%",
    height: h("0.6%"),
  },

  Texts: {
    color: "black",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  Texts2: {
    color: "#0007",
    fontSize: h("2%"),
  },
  topDateBox: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: h("2%"),
    paddingRight: h("2%"),
  },
  topDateBox2: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  DateBox: {
    // backgroundColor: 'gold',
    width: "13.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  DateBox3: {
    backgroundColor: "#003C75",
    width: "13.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  dateText: {
    color: "#0007",
    fontSize: h("2%"),
  },
  dateText4: {
    color: "#ffff",
    fontSize: h("2%"),
  },

  dateText2: {
    color: "#000",
    fontSize: h("4%"),
  },
  dateText3: {
    color: "#fff",
    fontSize: h("4%"),
  },
  TimeSLot: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("43%"),

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftbox: {
    paddingLeft: h("2%"),
    fontSize: h("2%"),
    color: "black",
    marginTop: h("2%"),
  },
  lefts: {
    // backgroundColor: 'gold',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Rights: {
    // backgroundColor: 'green',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Timebox: {
    backgroundColor: "white",
    width: "90%",
    height: h("7%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: h("1%"),
    marginTop: h("1%"),
  },
  timezone: {
    color: "#0007",
    fontSize: h("2.2%"),
  },
  Timebox2: {
    backgroundColor: "#003C75",
    width: "90%",
    height: h("7%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: h("1%"),
    marginTop: h("1%"),
  },
  timezone2: {
    color: "#ffff",
    fontSize: h("2.2%"),
  },
  CommunicationBox: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("15%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Buttons: {
    backgroundColor: "white",
    width: "30%",
    height: h("8%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: h("1%"),
    marginLeft: h("1%"),
    marginRight: h("1%"),
  },
  buttonsText: {
    color: "black",
    fontSize: h("2%"),
  },
  Buttons2: {
    backgroundColor: "#003C75",
    width: "30%",
    height: h("8%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: h("1%"),
    marginLeft: h("1%"),
    marginRight: h("1%"),
  },
  buttonsText2: {
    color: "white",
    fontSize: h("2%"),
  },
  buttonContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Schedule;