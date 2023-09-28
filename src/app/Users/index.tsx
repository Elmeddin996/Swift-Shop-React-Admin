import {
  Button,
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
import { useAuthentication } from "../../hooks";
import { IUser } from "../../models";
import "./style.scss";
import { ModalDetail } from "../components/UserModal";
import { Pagination } from "../components/Pagination";

export const Users: React.FC = () => {
  const { userList } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState<IUser>();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedUsers = userList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(userList?.data.length / 7);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  return (
    <div>
      <TableContainer className="table-container">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>FullName</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {slicedUsers?.map((user: IUser) => {
            return (
              <Tbody key={user.id} className="table">
                <Tr>
                  <Td>{user.fullName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>
                    <Button
                    className="detail-btn"
                      onClick={() => {
                        onOpen();
                        setSelectedUser(user);
                      }}
                    >
                      Detail
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
      {selectedUser && (
        <ModalDetail
          user={selectedUser}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};
