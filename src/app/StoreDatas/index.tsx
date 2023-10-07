import { nopeResolver } from "@hookform/resolvers/nope";
import { FiFile } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Nope from "nope-validator";
import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FileUpload } from "../components/FileUpload";
import { useService } from "../../APIs/Services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EQueryKeys } from "../../enums";
import { IStoreDatas } from "../../models";
import Swal from "sweetalert2";

type FormValues = {
  phone: string;
  address: string;
  logoText: string;
  companyName: string;
  aboutCompany: string;
  whatsappLink: string;
  instagramLink: string;
  facebookLink: string;
  linkedinLink: string;
  logoImageFile?: FileList;
};

const schema = Nope.object().shape({
  phone: Nope.string(),
  address: Nope.string(),
  logoText: Nope.string(),
  companyName: Nope.string(),
  aboutCompany: Nope.string(),
  whatsappLink: Nope.string(),
  instagramLink: Nope.string(),
  facebookLink: Nope.string(),
  linkedinLink: Nope.string(),
});

export const StoreDatas: React.FC = () => {
  const { storeDataService } = useService();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: nopeResolver(schema) });
  const [storeData, setStoreData] = React.useState<IStoreDatas>();

  const { data: storeDatas } = useQuery([EQueryKeys.GET_STORE_DATA], () =>
    storeDataService.getSiteDatas()
  );

  const { mutateAsync: mutateEditStoreDatas } = useMutation((body:FormData) => storeDataService.editStoreData(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_STORE_DATA]);
      },
    }
  );

  React.useEffect(() => {
    setStoreData(storeDatas?.data);
  }, [storeDatas]);

  const onSubmit = (data: FormValues) => {
    const values: FormValues = {
      phone: data.phone ? data.phone : storeDatas?.data.phone,
      address: data.address ? data.address : storeDatas?.data.address,
      logoText: data.logoText ? data.logoText : storeDatas?.data.logoText,
      companyName: data.companyName
        ? data.companyName
        : storeDatas?.data.companyName,
      aboutCompany: data.aboutCompany
        ? data.aboutCompany
        : storeDatas?.data.aboutCompany,
      whatsappLink: data.whatsappLink
        ? data.whatsappLink
        : storeDatas?.data.whatsappLink,
      instagramLink: data.instagramLink
        ? data.instagramLink
        : storeDatas?.data.instagramLink,
      facebookLink: data.facebookLink
        ? data.facebookLink
        : storeDatas?.data.facebookLink,
      linkedinLink: data.linkedinLink
        ? data.linkedinLink
        : storeDatas?.data.linkedinLink,
    };
    const reqBody = new FormData();
    reqBody.append("aboutCompany", values.aboutCompany);
    reqBody.append("address", values.address);
    reqBody.append("companyName", values.companyName);
    reqBody.append("facebookLink", values.facebookLink);
    reqBody.append("instagramLink", values.instagramLink);
    reqBody.append("linkedinLink", values.linkedinLink);
    reqBody.append("whatsappLink", values.whatsappLink);
    reqBody.append("logoText", values.logoText);
    reqBody.append("phone", values.phone);
    data.logoImageFile && reqBody.append("logoImageFile", data.logoImageFile[0]);
    mutateEditStoreDatas(reqBody)
    .then(() => {
      Swal.fire("Changed!", "Store data changed successfully.", "success");
    }).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.phone} isRequired>
        <FormLabel>Phone</FormLabel>
        <Input
          {...register("phone")}
          placeholder="Enter Phone Number"
          defaultValue={storeData?.phone}
        />
        <FormErrorMessage>
          {errors.phone && errors.phone.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.address} isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          {...register("address")}
          placeholder="Enter Address"
          defaultValue={storeData?.address}
        />
        <FormErrorMessage>
          {errors.address && errors.address.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.logoText} isRequired>
        <FormLabel>Logo Text</FormLabel>
        <Input
          {...register("logoText")}
          placeholder="Enter Logo Text"
          defaultValue={storeData?.logoText}
        />
        <FormErrorMessage>
          {errors.logoText && errors.logoText.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.companyName} isRequired>
        <FormLabel>Company Name</FormLabel>
        <Input
          {...register("companyName")}
          placeholder="Enter Company Name"
          defaultValue={storeData?.companyName}
        />
        <FormErrorMessage>
          {errors.companyName && errors.companyName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.aboutCompany} isRequired>
        <FormLabel>About Company</FormLabel>
        <Textarea
          {...register("aboutCompany")}
          placeholder="Enter About Company"
          defaultValue={storeData?.aboutCompany}
        />
        <FormErrorMessage>
          {errors.aboutCompany && errors.aboutCompany.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.whatsappLink} isRequired>
        <FormLabel>Whatsapp Link</FormLabel>
        <Input
          {...register("whatsappLink")}
          placeholder="Enter Whatsapp Link"
          defaultValue={storeData?.whatsappLink}
        />
        <FormErrorMessage>
          {errors.whatsappLink && errors.whatsappLink.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.instagramLink} isRequired>
        <FormLabel>Instagram Link</FormLabel>
        <Input
          {...register("instagramLink")}
          placeholder="Enter Instagram Link"
          defaultValue={storeData?.instagramLink}
        />
        <FormErrorMessage>
          {errors.instagramLink && errors.instagramLink.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.facebookLink} isRequired>
        <FormLabel>Facebook Link</FormLabel>
        <Input
          {...register("facebookLink")}
          placeholder="Enter Facebook Link"
          defaultValue={storeData?.facebookLink}
        />
        <FormErrorMessage>
          {errors.facebookLink && errors.facebookLink.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.linkedinLink} isRequired>
        <FormLabel>Linkedin Link</FormLabel>
        <Input
          {...register("linkedinLink")}
          placeholder="Enter Linkedin Link"
          defaultValue={storeData?.linkedinLink}
        />
        <FormErrorMessage>
          {errors.linkedinLink && errors.linkedinLink.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.logoImageFile}>
        <FormLabel>Logo Image</FormLabel>
        <FileUpload accept={"image/*"} register={register("logoImageFile")}>
          <Button leftIcon={<Icon as={FiFile} />}>Choose File</Button>
        </FileUpload>
        <FormErrorMessage> 
          {errors.logoImageFile && errors?.logoImageFile.message}
        </FormErrorMessage>
      </FormControl>
      <div className="image-container">
        <Image className="img" alt="logo" src={storeData?.logoImageLink} />
      </div>

      <Button mt={4} className="submit-btn" type="submit">
        Save Changes
      </Button>
    </form>
  );
};
