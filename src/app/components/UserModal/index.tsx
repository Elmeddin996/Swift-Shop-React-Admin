import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { IUser } from "../../../models";
import "./style.scss"

interface IModal {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDetail: React.FC<IModal> = ({ user, isOpen, onClose }) => {
  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="95%"
      backdropBlur="1px"
    />
  );

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <ModalContent>
        <ModalHeader>{user.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          <Text><span>Email: </span> {user.email}</Text>
          <Divider />
          <Text><span>Username: </span> {user.userName}</Text>
          <Divider />
          <Text><span>Phone: </span> {user.phone}</Text>
          <Divider />
          <Text><span>Address: </span> {user.address}</Text>
          <Divider />
          <Text><span>Role: </span> {user.isAdmin ? "User" : "Admin"}</Text>
          <Divider />
          <Text>
            {user.emailConfirm
              ? "User email is confirmed"
              : "User email is not confirmed"}
          </Text>
          <Divider />
        </ModalBody>
        <ModalFooter sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ width: "80%" }}>Delete User</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
