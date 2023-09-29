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
import "./style.scss";
import { useMutation, useQueryClient } from "react-query";
import { useService } from "../../../APIs/Services";
import { EQueryKeys } from "../../../enums";
import Swal from "sweetalert2";

interface IModal {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDetail: React.FC<IModal> = ({ user, isOpen, onClose }) => {
  const { accountService } = useService();
  const queryClient = useQueryClient();

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="95%"
      backdropBlur="1px"
    />
  );

  const { mutateAsync: mutateDeleteUser } = useMutation(
    (id: string) => accountService.deleteUser(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_USER_LIST]);
      },
    }
  );

  const handleDeleteUser = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't take it back!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#506ba5",
      cancelButtonColor: "#f16969",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        mutateDeleteUser(email).catch((err) => console.log(err));
      }
    });
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <ModalContent>
        <ModalHeader>{user?.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          <Text>
            <span>Email: </span> {user?.email}
          </Text>
          <Divider />
          <Text>
            <span>Username: </span> {user?.userName}
          </Text>
          <Divider />
          <Text>
            <span>Phone: </span> {user?.phone}
          </Text>
          <Divider />
          <Text>
            <span>Address: </span> {user?.address}
          </Text>
          <Divider />
          <Text>
            <span>Role: </span> {user?.isAdmin ? "Admin" : "User"}
          </Text>
          <Divider />
          <Text>
            {user?.emailConfirm ? (
              <span className="confimed-email">User email is confirmed</span>
            ) : (
              <span className="confimed-not-email">
                User email is not confirmed
              </span>
            )}
          </Text>
          <Divider />
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button
            isDisabled={user.isAdmin}
            className="delete-btn"

            onClick={() => handleDeleteUser(user.email)}
          >
            Delete User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
