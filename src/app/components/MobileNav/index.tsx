import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown, FiUser } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import { useService } from "../../../APIs/Services";
import { ROUTES } from "../../../routes/consts";
import { useNavigate } from "react-router-dom";
import { EQueryKeys } from "../../../enums";
import Swal from "sweetalert2";

interface IMobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav: React.FC<IMobileProps> = ({ onOpen, ...rest }) => {
  const { accountService, storeDataService } = useService();
  const navigate = useNavigate();

  const { mutateAsync: mutateLogout } = useMutation(() =>
    accountService.logout()
  );

  const handleLogout = () => {
    mutateLogout()
      .then(() => navigate(ROUTES.LOGIN))
      .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
  };

  const { data: user } = useQuery([EQueryKeys.GET_USER], () =>
    accountService.userData()
  );

  const { data: storeDatas } = useQuery([EQueryKeys.GET_STORE_DATA], () =>
    storeDataService.getSiteDatas()
  );

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box
        style={{ display: "flex", alignItems: "center" }}
        display={{ md: "none" }}
      >
        <Image
          src={storeDatas?.data.logoImageLink}
          alt="logo"
          display={{ md: "none" }}
          style={{ width: "18%" }}
        />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {storeDatas?.data.logoText}
        </Text>
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <FiUser size="40" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.data.fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
