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
import { ICategory } from "../../../models";
import Swal from "sweetalert2";
import { useCategoryContext } from "../../../hooks";

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

export const CategoryModal: React.FC<IModal> = ({
  id,
  isOpen,
  onClose,
  editOrCreate,
}) => {
  const { mutateEditCategory, categoryList, mutateCreateCategory } = useCategoryContext();

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

  const onSubmit: SubmitHandler<Inputs> = (data: ICategory) => {
    if (editOrCreate === "edit") {
      const reqBody = {
        id: id,
        name: data.name,
      };
      mutateEditCategory(reqBody)
        .then(onClose)
        .then(() =>
          Swal.fire("Changed!", "Data changed successfully.", "success")
        )
        .catch((err) => console.log(err));
    } else {
      const reqBody = {
        name: data.name,
      };
      mutateCreateCategory(reqBody)
        .then(onClose)
        .then(() =>
          Swal.fire("Created!", "Data created successfully.", "success")
        )
        .catch((err) => console.log(err));
    }
  };

  const category: ICategory[] = categoryList?.data.filter(
    (category: ICategory) => category.id === id
  );

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>{editOrCreate==="edit"?"Edit Category":"Create New Category"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Category Name"
                defaultValue={editOrCreate === "edit" ? category[0]?.name:""}
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
