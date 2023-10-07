import React from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useOrderContext } from "../../hooks";
import { IOrder } from "../../models";
import { Pagination } from "../components/Pagination";
import "./style.scss";
import { OrderModal } from "../components/OrderModal";
import Swal from "sweetalert2";

export const Orders: React.FC = () => {
  const { orderList ,mutateDeleteOrder} = useOrderContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = React.useState<IOrder>();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedOrders = orderList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(orderList?.data.length / 7);
  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleDeleteOrder = (id: number) => {
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
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        mutateDeleteOrder(id).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
      }
    });
    
  };


  return (
    <div>
      <TableContainer className="table-container">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Customer Name</Th>
              <Th>Ordered Time</Th>
              <Th isNumeric>Status</Th>
              <Th isNumeric padding="0 80px 0 0">Actions</Th>
            </Tr>
          </Thead>
          {slicedOrders?.map((order: IOrder) => {
            const createdAt = new Date(order.createdAt);
            const formattedDate = `${createdAt.getFullYear()}-${(
              createdAt.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${createdAt
              .getDate()
              .toString()
              .padStart(2, "0")} ${createdAt
              .getHours()
              .toString()
              .padStart(2, "0")}:${createdAt
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;

            return (
              <Tbody key={order.id} className="table">
                <Tr>
                  <Td>{order.fullName}</Td>

                  <Td>{formattedDate}</Td>
                  <Td
                    className={
                      order.status === 1
                        ? "pending status"
                        : order.status === 2
                        ? "accepted status"
                        : order.status === 3
                        ? "rejected status"
                        : ""
                    }
                    isNumeric
                  >
                    {order.status === 1
                      ? "Pending"
                      : order.status === 2
                      ? "Accepted"
                      : order.status === 3
                      ? "Rejected"
                      : ""}
                  </Td>

                  <Td isNumeric>
                    <Button className="detail-btn" onClick={() => {
                      onOpen()
                      setSelectedOrder(order)
                    }}>
                      Detail
                    </Button>
                    <Button className="detail-btn" onClick={() => handleDeleteOrder(order.id)}>
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
      {selectedOrder && (
        <OrderModal order={selectedOrder} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
};
