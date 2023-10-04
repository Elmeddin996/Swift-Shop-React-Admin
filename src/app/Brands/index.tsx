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
import { useBrandContext } from "../../hooks";
import { IBrand } from "../../models";
import { Pagination } from "../components/Pagination";
import Swal from "sweetalert2";
import { BrandModal } from "../components/BrandModal";
import "./style.scss";

export const Brands = () => {
  const { brandList, mutateDeleteBrand } = useBrandContext();
  const [brandId, setBrandId] = React.useState<number>();
  const [isEditOrCreate, setIsEditOrCreate] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedBrands = brandList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(brandList?.data.length / 7);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleDeleteBrand = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't take it back! There are products of this brand. Are you sure you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#506ba5",
      cancelButtonColor: "#f16969",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Brand has been deleted.", "success");
        mutateDeleteBrand(id).catch((err) => console.log(err));
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
        Create New Brand
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
          {slicedBrands?.map((brand: IBrand) => {
            return (
              <Tbody key={brand.id} className="table">
                <Tr>
                  <Td>{brand.id}</Td>
                  <Td>{brand.name}</Td>

                  <Td isNumeric>
                    <Button
                      className="detail-btn"
                      onClick={() => {
                        onOpen();
                        setBrandId(brand.id);
                        setIsEditOrCreate("edit");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="detail-btn"
                      onClick={() => {
                        handleDeleteBrand(brand.id);
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
      {isOpen && <BrandModal editOrCreate={isEditOrCreate} id={brandId} isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};
