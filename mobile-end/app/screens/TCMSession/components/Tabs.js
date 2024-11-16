import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TabButton from "./TabButton";
import { tcmState as state } from "../../../(public)/TCMSession";
import { useSnapshot } from "valtio";

const Tabs = ({}) => {
  const { tabName } = useSnapshot(state);
  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TabButton
            title="Medical History"
            bgColor={tabName === "medicalHistory" ? "transparent" : "#FFC69F"}
            onPress={() => {
              state.tabName = "medicalHistory";
            }}
          />
          <TabButton
            title="Interview"
            bgColor={tabName === "interview" ? "transparent" : "#DED99F"}
            onPress={() => {
              state.tabName = "interview";
            }}
          />
          <TabButton
            title="Inspection & Examination"
            bgColor={
              tabName === "inspectionAndExamination" ? "transparent" : "#FFC6FF"
            }
            onPress={() => {
              state.tabName = "inspectionAndExamination";
            }}
          />
          <TabButton
            title="TCM Treatment"
            bgColor={tabName === "tcmTreatment" ? "transparent" : "#FFF5AD"}
            onPress={() => {
              state.tabName = "tcmTreatment";
            }}
          />
          <TabButton
            title="File Attachment"
            bgColor={tabName === "fileAttachment" ? "transparent" : "#A2F5AD"}
            onPress={() => {
              state.tabName = "fileAttachment";
            }}
          />
          <TabButton
            title="Previous Session"
            bgColor={tabName === "previousSession" ? "transparent" : "#F4FF2B"}
            onPress={() => {
              state.tabName = "previousSession";
            }}
          />
          {/* <TabButton
            title="Note"
            bgColor={tabName === "note" ? "transparent" : "#F4FF2B"}
            onPress={() => {
              state.tabName = "note";
            }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
