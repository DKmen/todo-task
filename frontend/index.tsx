import React from "react";
import { StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Flex,
  Box,
  ScrollView,
  VStack,
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  Spacer,
  Select,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Card from "./components/card";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./data/store";
import { Status, addTask, fetchTask } from "./data/reducer/task.reducer";
import CustomModal from "./components/modal";

export default function Root(params: any) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.task.task);

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(fetchTask());
  }, []);

  return (
    <>
      <Flex style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <Button
          onPress={() => setModalVisible(true)}
          startIcon={<AntDesign name="plus" size={24} color="white" />}
        >
          Add Task
        </Button>
        <ScrollView w="full">
          <Box style={styles.list} w="full">
            {tasks.map((item, index) => {
              return (
                <Card
                  title={item.name}
                  details={item.description}
                  status={item.status}
                  id={item.id}
                  index={index}
                />
              );
            })}
          </Box>
        </ScrollView>
      </Flex>
      <CustomModal open={modalVisible} openFun={setModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
