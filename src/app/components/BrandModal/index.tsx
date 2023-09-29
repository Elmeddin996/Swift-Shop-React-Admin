import React from "react";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IBrand } from "../../../models";
import Swal from "sweetalert2";
import { useBrandContext } from "../../../hooks";

interface IModal {
  brand: IBrand;
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  id: number;
  name: string;
};

export const BrandModal: React.FC<IModal> = ({ brand, isOpen, onClose }) => {
  const { mutateEditBrand } = useBrandContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="95%"
      backdropBlur="1px"
    />
  );

  const onSubmit: SubmitHandler<Inputs> = (data: IBrand) => {
    const reqBody = {
      id: brand.id,
      name: data.name,
    };
    mutateEditBrand(reqBody)
      .then(onClose)
      .then(() =>
        Swal.fire("Changed!", "Data changed successfully.", "success")
      )
      .catch((err) => console.log(err));
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Edit Brand</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Brand Name"
                defaultValue={brand.name}
                {...register("name", {
                  required: "Name is required!",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters!",
                  },
                })}
              />
            </FormControl>
            {errors.name ? (
              <p className="error-messages">{errors.name?.message}</p>
            ) : (
              <br />
            )}

            <Divider />
          </ModalBody>
          <ModalFooter className="modal-footer">
            <Button type="submit" className="delete-btn">
              Save Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
