import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
const deviceWidth = Dimensions.get('window').width;
import { h } from 'react-native-responsiveness';
import { Icon } from 'react-native-elements';
import SharingInfo from '../../components/SharingInfo/index';
// import SharingInfo from '../../components/SharingInfo/index';
import TabComments from '../../components/TabComments'
//import FileView from '../../Drive/components/FielView'

// react native hook
import { useDeviceOrientation } from '@react-native-community/hooks';
// @package
import * as Device from 'expo-device';
import Checkbox from 'expo-checkbox';
import DatePickerFuture from '../../components/DatePickerFuture';
import { AirbnbRating } from 'react-native-ratings';
import { AppSingleDropdown } from '../homeo/components/InterviewTab';
// import { options,actions } from '../../config/pickerData';
import NavigationDropdown from '../../components/NavigationDropdown';
import DropdownActions from '../../components/DropdownActions';
const log = console.log;
// import Header from './components/Header';
export default function FilerViewer(props) {
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState('');
  const [navPicker, setnavPicker] = useState('viewTab');
  const [Actions, setActions] = useState('edit');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [view, setView] = useState(false);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [counter, setCounter] = useState(1);
  const [components, setComponents] = useState([1]);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);

  function addComponent() {
    setCounter(counter + 1);
    components.push(counter);
  }

  function removeComponent() {
    components.pop();
    setCounter(counter - 1);
  }
  useEffect(async () => {
    try {
      let device_type = await Device.getDeviceTypeAsync();
      if (device_type === 1) setDeviceType('Mobile');
      else if (device_type === 2) setDeviceType('Tablet');
    } catch (err) {
      log('err', err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.TopContainer}>
          <View style={styles.ContainerForPic}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={styles.TopLeftContianer}
            >
              <Icon
                name={'arrow-back-outline'}
                type="ionicon"
                color="#fff"
                size={35}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>File Viewer</Text>
            </View>
          </View>
        </View>
        {/* Header */}
        <ScrollView scrollEnabled={true} style={{ marginBottom: 130 }}>
          <View style={styles.navBarContainer}>
            {/* nav bar */}
            {deviceWidth < 800 ? (
              <View style={styles.navPicker}>
               <NavigationDropdown onChange={val=>setnavPicker(val)} value={navPicker}   />
                {/* <Picker
                  mode={'dropdown'}
                  style={[styles.headerPicker]}
                  selectedValue={navPicker}
                  onValueChange={(itemValue, itemIndex) =>
                    setnavPicker(itemValue)
                  }
                >
                  <Picker.Item
                    label="Select Options"
                    value=""
                    key={'unselectable'}
                  />
                  <Picker.Item color={'#E911DB'} label="Basic Information" value="basic_information"
                  />
                  <Picker.Item
                    color={'#8411E9'}
                    label=" Data Spreadsheet"
                    value="data_spreadsheet"
                  />
                  <Picker.Item color={'#1F11E9'} label="Comments" value="comments"
                  />
                  <Picker.Item color={'#11A8E9'} label="Reviews" value="reviews" />
                  <Picker.Item color={'#11E9BE'} label="Sharing" value="sharing" />
                  <Picker.Item color={'#11E93C'} label="Notes" value="notes" />
                </Picker> */}
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFC69F' }]}
                  onPress={() => setnavPicker('viewTab')}
                >
                  <Text>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#DED99F' }]}
                >
                  <Text>Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFC6FF' }]}
                >
                  <Text>Meta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFF5AD' }]}
                >
                  <Text>AI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#A2F5AD' }]}
                  onPress={() => setnavPicker('sharing')}
                >
                  <Text>Sharing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#FFFFC9' }]}
                >
                  <Text>Notes</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: '#F4FF2B' }]}
                > */}
                  
              </View>
            )}

            <View style={{ width: '35%' }}>
              <DropdownActions value={Actions}  onChange={val=> setActions(val)} />
            {/* <AppSingleDropdown
              title=""
              placeholder="Actions"
              options={actions}
              onChange={val=> setActions(val)}
            /> */}
              {/* <Picker
                style={styles.headerPicker}
                selectedValue={Actions}
                onValueChange={(itemValue, itemIndex) => setActions(itemValue)}
              >
                <Picker.Item label="Actions" value="actions" key={'unselectable'} />
                <Picker.Item color={'#E911DB'} label="Save" value="Save" />
                <Picker.Item color={'#8411E9'} label="Edit" value="Edit" />
                <Picker.Item color={'#1F11E9'} label="Print" value="Print" />
                <Picker.Item color={'#11A8E9'} label="Share" value="Share" />
                <Picker.Item
                  color={'#11E9BE'}
                  label="Archive"
                  value="Archive"
                />
                <Picker.Item
                  color={'#11E93C'}
                  label="Save as PDF"
                  value="Save as PDF"
                />
                <Picker.Item
                  color={'#d2e738'}
                  label="Save as XML"
                  value="Save as XML"
                />
                <Picker.Item
                  color={'#e7387a'}
                  label="Save as CSV"
                  value="Save as CSV"
                />
              </Picker> */}
            </View>
          </View>

          <View style={{ paddingHorizontal: 10, backgroundColor: '#fff' ,zIndex:-30}}>
            {navPicker == 'viewTab' ? (
              <>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                      View
                    </Text>
                  </View>
                <View>
                  <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <QRCode
                      value={`Qr code value here`}
                      logoSize={50}
                      logoBackgroundColor="transparent"
                    />
                  </View>
                </View>
                {/* attachment section */}
                <View
                  style={{ paddingHorizontal: 10, backgroundColor: '#fff' }}
                >
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}
                    >
                      Attachments
                    </Text>
                    <TouchableOpacity style={{ width: deviceWidth / 3 }}>
                      <Text
                        style={{
                          color: '#fff',
                          backgroundColor: '#00ACAC',
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        Add Attachments
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : navPicker == 'sharing' ? (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ fontSize: 30, fontWeight: 'bold', color: 'green' }}
                  >
                    Share with others
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: Dimensions.get('screen').width * 0.8,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: '45%',
                        backgroundColor: 'green',
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                      }}
                    >
                      <Text style={{ color: 'white' }}>Copy sharing link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '45%',
                        backgroundColor: '#49B6D6',
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                      }}
                      onPress={() => addComponent()}
                    >
                      <Text style={{ color: 'white' }}>Add User/Email</Text>
                    </TouchableOpacity>
                  </View>
                  {components.map((component) => (
                    <View
                      key={component}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 30,
                        width: '100%',
                      }}
                    >
                      {counter > 1 && (
                        <TouchableOpacity
                          style={{
                            width: '45%',
                            backgroundColor: 'red',
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => removeComponent()}
                        >
                          <Text style={{ color: 'white' }}>Delete</Text>
                        </TouchableOpacity>
                      )}
                      <SharingInfo />
                    </View>
                  ))}

                  <TouchableOpacity
                    style={{
                      width: '45%',
                      backgroundColor: '#49B6D6',
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                      marginTop: 20,
                    }}
                  >
                    <Text style={{ color: 'white' }}>Send invitation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('screen').width,
                      height: 50,
                      backgroundColor: 'black',
                      marginTop: 20,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                    onPress={() => setAccordion1(!accordion1)}
                  >
                    <Text style={{ color: 'white', marginLeft: 10 }}>
                      Access Control List
                    </Text>
                  </TouchableOpacity>
                  {accordion1 && (
                    <>
                      <View
                        style={{
                          width: '70%',
                          height: 50,
                          backgroundColor: '#c4c4c4',
                          borderRadius: 30,
                          paddingLeft: 10,
                          marginTop: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                          User: Dr. No
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '70%',
                          height: 50,
                          backgroundColor: '#c4c4c4',
                          borderRadius: 30,
                          paddingLeft: 10,
                          marginTop: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                          Email: info@gmail.com
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '80%',
                          alignSelf: 'center',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '25%',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            value={view}
                            onValueChange={setView}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            View
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '25%',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            value={comment}
                            onValueChange={setComment}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            Comment
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '25%',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            value={edit}
                            onValueChange={setEdit}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            Edit
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setShowCalendar(!showCalendar)}
                          style={{
                            marginTop: 20,
                            width: '30%',
                            height: 40,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                            }}
                          >
                            Share Till
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginTop: 20,
                            width: '30%',
                            height: 40,
                            backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                            }}
                          >
                            Delete
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginTop: 20,
                            width: '30%',
                            height: 40,
                            backgroundColor: 'green',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                            }}
                          >
                            Submit
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '90%',
                        }}
                      >
                        {showCalendar && (
                          <DatePickerFuture
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            display="default"
                            onChange={(e, selectedDate) => {
                              const currentDate = selectedDate || date;
                              setShowCalendar(Platform.OS === 'ios');
                              setDate(currentDate);
                            }}
                          />
                        )}
                      </View>
                    </>
                  )}
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('screen').width,
                      height: 50,
                      backgroundColor: 'black',
                      marginTop: 20,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                    onPress={() => setAccordion2(!accordion2)}
                  >
                    <Text style={{ color: 'white', paddingLeft: 10 }}>
                      Publicity
                    </Text>
                  </TouchableOpacity>
                  {accordion2 && (
                    <View style={{ width: '100%' }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '95%',
                          alignItems: 'center',
                          marginTop: 20,
                        }}
                      >
                        <FontAwesome5
                          name="dot-circle"
                          size={24}
                          color="#D5DBE0"
                        />
                        <Text style={{ marginLeft: 10, color: 'black' }}>
                          Only users linsted in Access Control List haave access
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '95%',
                          alignItems: 'center',
                          marginTop: 20,
                        }}
                      >
                        <FontAwesome5
                          name="dot-circle"
                          size={24}
                          color="#7FD5D5"
                        />
                        <Text style={{ marginLeft: 10, color: '#7FD5D5' }}>
                          Publish over the world
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '95%',
                          alignItems: 'center',
                          marginTop: 20,
                        }}
                      >
                        <FontAwesome5
                          name="dot-circle"
                          size={24}
                          color="#FFADAB"
                        />
                        <Text style={{ marginLeft: 10, color: '#FFADAB' }}>
                          Access by having link for everyone
                        </Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('screen').width,
                      height: 50,
                      backgroundColor: 'black',
                      marginTop: 20,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                    onPress={() => setAccordion3(!accordion3)}
                  >
                    <Text style={{ color: 'white', paddingLeft: 10 }}>
                      Settings
                    </Text>
                  </TouchableOpacity>
                  {accordion3 && (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '50%',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox
                          value={check1}
                          onValueChange={setCheck1}
                          style={{ marginRight: 10 }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          Allow viewers to download, save, copy
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '50%',
                          alignItems: 'center',
                          marginTop: 20,
                        }}
                      >
                        <Checkbox
                          value={check2}
                          onValueChange={setCheck2}
                          style={{ marginRight: 10 }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          Checkbox level 2
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </>
            ) : navPicker === 'reviews' ? (
              <>
                <View height={'100%'} >
                  <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                      Reviews
                    </Text>
                  </View>
                  <View>
                    <AirbnbRating reviews={['😟', '🙂', '🙂', '😀', '😀']} />


                  </View>
                </View>

              </>
            ) : null}
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   statusAndPriorityContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-around",
//   },
//   CategoryFieldPicker2: {
//     width: "50%",
//     flexDirection: "column",
//   },
// });

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  statusAndPriorityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  createdAndDeadlineContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CategoryFieldPicker2: {
    width: '50%',
    flexDirection: 'column',
  },
  CategoryFieldPicker3: {
    flexDirection: 'row',
    width: '50%',
  },
  CategoryFieldPicker: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerPicker: {
    padding: 10,
    borderColor: 'black',
  },
  attachmentContainer: {
    width: '32%',
    height: 80,
    borderWidth: 0.8,
    borderColor: '#1239',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  navTab: {
    backgroundColor: '#00ACAC',
    padding: 10,
    borderRadius: 5,
    margin: 0.5,
  },
  fieldPicker: {
    width: '70%',
    // width: deviceWidth / 1.5,
    borderColor: '#1239',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  navPicker: {
    width: '60%',
    
   
  },
  navBarContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  assignedTO: {
    paddingLeft: 10,
    borderColor: '#1239',
    borderWidth: 0.8,
    width: deviceWidth / 2 + 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  assignedTOContainer: {
    width: deviceWidth / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#1239',
  },
  //
  //

  TopContainer: {
    backgroundColor: '#00B7DD',
    width: '100%',
    height: h('8%'),
    alignItems: 'center',
  },
  ContainerForPic: {
    // backgroundColor: "red",
    width: '100%',
    height: h('6%'),
    flexDirection: 'row',
    marginTop: h('1%'),
    paddingLeft: h('2%'),
    paddingRight: h('3%'),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgRenderDesgin: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h('2.5%'),
    fontWeight: 'bold',
    color: 'white',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 5,
    width: '100%',
  },
  headingContainer: {
    marginVertical: 10
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});