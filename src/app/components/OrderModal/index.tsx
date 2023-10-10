import React from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { IOrder } from "../../../models";
import { useOrderContext } from "../../../hooks";
import Swal from "sweetalert2";
import "./style.scss"

interface IOrderModal {
  order: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<IOrderModal> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { mutateEditOrder } = useOrderContext();
  const [selectedValue, setSelectedValue] = React.useState(1);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(event.target.value);
    setSelectedValue(newValue);
  };

  const handleSaveChanges = () => {
    const reqBody = {
      id: order.id,
      status: selectedValue,
    };
    Swal.fire("Changed!", "Order Status has been changed.", "success");
    mutateEditOrder(reqBody).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
    onClose();
  };

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="95%"
      backdropBlur="1px"
    />
  );

  const createdAt = new Date(order.createdAt);
  const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${createdAt
    .getDate()
    .toString()
    .padStart(2, "0")} ${createdAt
    .getHours()
    .toString()
    .padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`;

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <ModalContent>
        <ModalHeader>{order?.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          <Text>
            <span>Email: </span> {order?.email}
          </Text>
          <Divider />
          <Text>
            <span>Ordered Time: </span> {formattedDate}
          </Text>
          <Divider />
          <Text>
            <span>Phone: </span> {order?.phone}
          </Text>
          <Divider />
          <Text>
            <span>Address: </span> {order?.address}
          </Text>
          <Divider />
          <Box>
            <span>Status: </span>{" "}
            {order.status === 1 ? (
              <Select value={selectedValue} onChange={handleSelectChange}>
                <option>Select Status</option>
                <option value={2}>Accepted</option>
                <option value={3}>Rejected</option>
              </Select>
            ) : order.status === 2 ? (
              "Accepted"
            ) : order.status === 3 ? (
              "Rejected"
            ) : (
              ""
            )}
          </Box>
          <Divider />
          <Text><span>Note: </span>{order?.note}</Text>
          <Divider />
          {order.orderItems.map((item, index) => (
            <Text key={index} className="product-in-order">
              <span>{item.productName} </span>
              <span>x{item.count}</span>
            </Text>
          ))}
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
