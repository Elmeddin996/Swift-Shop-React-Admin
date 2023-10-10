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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IBrand } from "../../../models";
import Swal from "sweetalert2";
import { useBrandContext } from "../../../hooks";
import "./style.scss";

interface IModal {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
  editOrCreate: string;
}

type Inputs = {
  id: number;
  name: string;
};

export const BrandModal: React.FC<IModal> = ({
  id,
  isOpen,
  onClose,
  editOrCreate,
}) => {
  const { mutateEditBrand, brandList, mutateCreateBrand } = useBrandContext();

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
    if (editOrCreate === "edit") {
      const reqBody = {
        id: id,
        name: data.name,
      };
      mutateEditBrand(reqBody)
        .then(onClose)
        .then(() =>
          Swal.fire("Changed!", "Data changed successfully.", "success")
        )
       .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
    } else {
      const reqBody = {
        name: data.name,
      };
      mutateCreateBrand(reqBody)
        .then(onClose)
        .then(() =>
          Swal.fire("Created!", "Data created successfully.", "success")
        )
       .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
    }
  };

  const brand: IBrand[] = brandList?.data.filter(
    (brand: IBrand) => brand.id === id
  );

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>{editOrCreate==="edit"?"Edit Brand":"Create New Brand"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Brand Name"
                defaultValue={editOrCreate === "edit" ? brand[0]?.name:""}
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
            <Button type="submit" className="save-btn">
              {editOrCreate === "create" ? "Create" : "Save Change"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
