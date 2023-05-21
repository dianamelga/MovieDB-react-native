import React, { ReactNode, useState, useEffect } from "react";
import uuid from "uuid-random";
import {
  ScrollView,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  data: ReactNode[];
  rowsCount: number;
  style?: StyleProp<ViewStyle>;
};

const GridList: React.FC<Props> = ({ data, rowsCount }) => {
  const [rows, setRows] = useState<ReactNode[][] | null>(null);

  useEffect(() => {
    setRows(splitList(data, rowsCount));
  }, [data]);

  const splitList = (list: any[], numLists: number): any[][] => {
    const chunkSize = Math.ceil(list.length / numLists);
    const result: any[][] = Array.from({ length: numLists }, (_, i) =>
      list.slice(i * chunkSize, (i + 1) * chunkSize)
    );

    return result;
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {rows?.map((rowItems) => (
          <View key={uuid()} style={styles.gridContainer}>
            {rowItems.map((item) => (
              <View key={uuid()}>{item}</View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  gridContainer: {
    flexDirection: "row",
  },
});

export default GridList;
