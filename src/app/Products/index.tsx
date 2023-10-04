import React from "react";
import {
  Button,
  Divider,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IProduct } from "../../models";
import { useProductContext } from "../../hooks";
import { Pagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import Swal from "sweetalert2";

export const Products: React.FC = () => {
  const { productList, mutateDeleteProduct } = useProductContext();
  const navigate = useNavigate();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedProducts = productList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(productList?.data.length / 7);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleDeleteProduct = (id: number) => {
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
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        mutateDeleteProduct(id).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
      }
    });
    
  };

  return (
    <div>
      <Button
        className="create-btn"
        onClick={() => navigate(ROUTES.PRODUCT.CREATE)}
      >
        Create New Product
      </Button>
      <Divider />
      <TableContainer className="table-container">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th isNumeric>Sale Price</Th>
              <Th isNumeric>Discount</Th>
              <Th isNumeric>Stock</Th>
              <Th isNumeric padding="0 80px 0 0">
                Actions
              </Th>
            </Tr>
          </Thead>
          {slicedProducts?.map((product: IProduct) => {
            return (
              <Tbody key={product.id} justifyContent="center" className="table">
                <Tr>
                  <Td>
                    <Image
                      borderRadius="full"
                      boxSize="60px"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric padding="0 40px 0 0">
                    {product.salePrice}$
                  </Td>
                  <Td isNumeric padding="0 40px 0 0">
                    {product.discountPercent}%
                  </Td>
                  <Td isNumeric>{product.stock}-units</Td>

                  <Td isNumeric>
                    <Button
                      className="detail-btn"
                      onClick={() =>
                        navigate(`${ROUTES.PRODUCT.EDIT}/${product.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="detail-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            );
          })}
        </Table>
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </TableContainer>
    </div>
  );
};
