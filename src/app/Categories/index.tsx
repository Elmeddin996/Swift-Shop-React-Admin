import {
  Button,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useCategoryContext } from "../../hooks";
import { ICategory } from "../../models";
import { Pagination } from "../components/Pagination";
import Swal from "sweetalert2";
import { CategoryModal } from "../components/CategoryModal";
import "./style.scss";

export const Categories = () => {
  const { categoryList, mutateDeleteCategory } = useCategoryContext();
  const [categoryId, setCategoryId] = React.useState<number>();
  const [isEditOrCreate, setIsEditOrCreate] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedCategorys = categoryList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(categoryList?.data.length / 7);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleDeleteCategory = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't take it back! There are products of this Category. Are you sure you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#506ba5",
      cancelButtonColor: "#f16969",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        mutateDeleteCategory(id).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
      }
    });
  };

  return (
    <div>
      <Button
        className="create-btn"
        onClick={() => {
          setIsEditOrCreate("create");
          onOpen();
        }}
      >
        Create New Category
      </Button>
      <Divider />
      <TableContainer className="table-container">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th isNumeric padding="0 80px 0 0">
                Actions
              </Th>
            </Tr>
          </Thead>
          {slicedCategorys?.map((category: ICategory) => {
            return (
              <Tbody key={category.id} className="table">
                <Tr>
                  <Td>{category.id}</Td>
                  <Td>{category.name}</Td>

                  <Td isNumeric>
                    <Button
                      className="detail-btn"
                      onClick={() => {
                        onOpen();
                        setCategoryId(category.id);
                        setIsEditOrCreate("edit");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="detail-btn"
                      onClick={() => {
                        handleDeleteCategory(category.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            );
          })}
          <Tfoot></Tfoot>
        </Table>
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </TableContainer>
      {isOpen && (
        <CategoryModal
          editOrCreate={isEditOrCreate}
          id={categoryId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};
