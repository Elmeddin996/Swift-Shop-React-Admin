import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPackage,
  FiLayers,
  FiBold,
  FiUser,
  FiTruck,
  FiSettings,
  FiFastForward,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { NavItem } from "../NavItem";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../enums";
import { useService } from "../../../APIs/Services";

interface ISidebarProps extends BoxProps {
  onClose: () => void;
}

interface ILinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<ILinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/" },
  { name: "Products", icon: FiPackage, path: "/products" },
  { name: "Categories", icon: FiLayers, path: "/categories" },
  { name: "Brands", icon: FiBold, path: "/brands" },
  { name: "Users", icon: FiUser, path: "/users" },
  { name: "Orders", icon: FiTruck, path: "/orders" },
  { name: "Sliders", icon: FiFastForward, path: "/sliders" },
  { name: "Store Data", icon: FiSettings, path: "/store-data" },
];

export const SidebarContent: React.FC<ISidebarProps> = ({
  onClose,
  ...rest
}) => {
  const navigate = useNavigate();
  const { storeDataService } = useService();

  const { data: storeDatas } = useQuery([EQueryKeys.GET_STORE_DATA], () =>
    storeDataService.getSiteDatas()
  );

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img
          src={storeDatas?.data.logoImageLink}
          alt="logo"
          style={{ maxWidth: "18%" }}
        />
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {storeDatas?.data.logoText}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() =>{
             navigate(link.path)
             onClose()
            }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
