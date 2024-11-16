import React from "react";
import { View, ScrollView } from "react-native";
import TabItem from "./TabItem";

export default function TabBar({ index, setIndex }) {
  return (
    <View style={{ flex: 0 }}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TabItem
            color="#FFC69F"
            title="Medical History"
            active={index === 0}
            setIndex={() => setIndex(0)}
          />
          <TabItem
            color="#DED99F"
            title="Interview"
            active={index === 1}
            setIndex={() => setIndex(1)}
          />
          <TabItem
            color="#FFC6FF"
            title="Inspection & Examination"
            active={index === 2}
            setIndex={() => setIndex(2)}
          />
          <TabItem
            color="#FFF5AD"
            title="Homeo Treatment"
            active={index === 3}
            setIndex={() => setIndex(3)}
          />
          <TabItem
            color="#A2F5AD"
            title="File Attachments"
            active={index === 4}
            setIndex={() => setIndex(4)}
          />
          <TabItem
            color="#F4FF2B"
            title="Previous Session"
            active={index === 5}
            setIndex={() => setIndex(5)}
          />
          <TabItem
            color="#F4FF2B"
            title="Notes"
            active={index === 6}
            setIndex={() => setIndex(6)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
