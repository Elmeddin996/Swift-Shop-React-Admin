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
import "./style.scss"
import { ModalDetail } from "../components/UserModal";

export const Users:React.FC = () => {
  const { userList } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>UserName</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {userList?.data.map((user:IUser) => {
            return (
              <Tbody className="table">
                <Tr>
                  <Td>{user.userName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td><Button onClick={()=>onOpen()}>Detail</Button></Td>
                </Tr>
                <ModalDetail user={user} isOpen={isOpen}  onClose={onClose}/>
              </Tbody>
            );
          })}
          <Tfoot>pagination</Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};
