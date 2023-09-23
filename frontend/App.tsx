import React from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./data/store";
import Root from "./index";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Root />
      </NativeBaseProvider>
    </Provider>
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
  },
});
