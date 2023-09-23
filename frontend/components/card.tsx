import React from "react";

import {
  Flex,
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../data/store";
import { Status, deleteTask, editTask } from "../data/reducer/task.reducer";

export default function Card(params: {
  title: string;
  details: string;
  status: Status;
  id: string;
  index: number;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = React.useState(params.title);
  const [description, setDescription] = React.useState(params.details);
  const [status, setStatus] = React.useState(params.status);

  const [open, setOpen] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Flex
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        maxWidth="2xl"
        width="full"
        p={2}
        my={2}
        borderWidth={2}
        borderColor="black"
        borderRadius={4}
        marginX="auto"
      >
        <VStack flex={1} mr={4}>
          <Text fontSize="2xl" bold>
            {params.title}
          </Text>
          <Text fontSize="sm">{params.details}</Text>
          <Text fontSize="xs" bold>
            {params.status}
          </Text>
        </VStack>
        <VStack>
          <Button
            startIcon={<AntDesign name="delete" size={24} color="red" />}
            onPress={async () => {
              await dispatch(
                deleteTask({ id: params.id, index: params.index })
              );
            }}
            bgColor="white"
          ></Button>
          <Button
            startIcon={<AntDesign name="edit" size={24} color="blue" />}
            onPress={() => setOpen(true)}
            bgColor="white"
          ></Button>
        </VStack>
      </Flex>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
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
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  await dispatch(
                    editTask({
                      name,
                      description,
                      status,
                      id: params.id,
                      index: params.index,
                    })
                  );
                  setOpen(false);
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
