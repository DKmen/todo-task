import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, FormControl, Input, Spacer, Select } from "native-base";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../data/store";
import { Status, addTask } from "../data/reducer/task.reducer";

export default function CustomModal(params: {
  open: boolean;
  openFun: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState(Status.New);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        isOpen={params.open}
        onClose={() => params.openFun(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Task</Modal.Header>
          <Modal.Body h="xs">
            <FormControl w="100%">
              <FormControl.Label>Title</FormControl.Label>
              <Input
                placeholder="Enter Ttile"
                value={name}
                onChangeText={(val) => setName(val)}
              />
              <Spacer />
              <FormControl.Label>Details</FormControl.Label>
              <Input
                placeholder="Enter Details"
                multiline
                value={description}
                onChangeText={(val) => setDescription(val)}
              />
              <FormControl.Label>Status</FormControl.Label>
              <Select
                accessibilityLabel="Choose Status"
                placeholder="Choose Status"
                selectedValue={status}
                onValueChange={(val) => setStatus(val as Status)}
              >
                <Select.Item label="New" value="New" />
                <Select.Item label="Working" value="Working" />
                <Select.Item label="Done" value="Done" />
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  params.openFun(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  await dispatch(
                    addTask({
                      name: name,
                      description: description,
                      status: status,
                    })
                  );
                  params.openFun(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
