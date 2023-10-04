import React from "react";
import Nope from "nope-validator";
import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { FileUpload } from "../components/FileUpload";
import RatingStars from "../components/RatingStars";
import { IBrand, ICategory } from "../../models";
import { useService } from "../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import "./style.scss";
import { useProductContext } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import Swal from "sweetalert2";

type FormValues = {
  posterImageFile: FileList;
  imageFiles: FileList;
  name: string;
  description: string;
  salePrice: number;
  costPrice: number;
  discountPercent: number;
  rate: number;
  stock: number;
  brandId: number;
  categoryId: number;
};

const schema = Nope.object().shape({
  name: Nope.string().required("Name is required."),
  description: Nope.string().required("Description is required"),
  salePrice: Nope.number().required("Sale Price is required"),
  costPrice: Nope.number().required("Cost Price is required"),
  discountPercent: Nope.number().required("Discount Percent is required"),
  rate: Nope.number().required("Rate is required"),
  stock: Nope.number().required("Stock is required"),
});

const validateFiles = (value: FileList) => {
  if (value.length < 1) {
    return "Files is required";
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fsMb > MAX_FILE_SIZE) {
      return "Max file size 10mb";
    }
  }
  return true;
};

export const ProductCreate: React.FC = () => {
  const { categoryService, brandsService } = useService();
  const { mutateCreateProduct } = useProductContext();
  const navigate = useNavigate();

  const { data: categoryList } = useQuery([EQueryKeys.GET_CATEGORY_LIST], () =>
    categoryService.getCategoryList()
  );

  const { data: brandList } = useQuery([EQueryKeys.GET_BRAND_LIST], () =>
    brandsService.getBrandList()
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({
    resolver: nopeResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    const reqBody = new FormData();
    Array.from(data.imageFiles).forEach((image) => {
      reqBody.append(`imageFiles`, image);
    });
    reqBody.append("posterImageFile", data.posterImageFile[0]);
    reqBody.append("brandId", data.brandId.toString());
    reqBody.append("categoryId", data.categoryId.toString());
    reqBody.append("costPrice", data.costPrice.toString());
    reqBody.append("salePrice", data.salePrice.toString());
    reqBody.append("discountPercent", data.discountPercent.toString());
    reqBody.append("description", data.description);
    reqBody.append("name", data.name);
    reqBody.append("rate", data.rate.toString());
    reqBody.append("stock", data.stock.toString());
    mutateCreateProduct(reqBody)
      .then(() => navigate(ROUTES.PRODUCT.LIST))
      .then(() => {
        Swal.fire("Created!", "New Product created successfully.", "success");
      }).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel sx={{fontSize:33}}>Create New Product</FormLabel>
      <FormControl isInvalid={!!errors.name} isRequired>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} placeholder="Enter Product Name" />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.salePrice} isRequired>
        <FormLabel>Sale Price</FormLabel>
        <Input
          type="number"
          {...register("salePrice")}
          placeholder="Enter Sale Price"
        />
        <FormErrorMessage>
          {errors.salePrice && errors.salePrice.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.costPrice} isRequired>
        <FormLabel>Cost Price</FormLabel>
        <Input
          type="number"
          {...register("costPrice")}
          placeholder="Enter Cost Price"
        />
        <FormErrorMessage>
          {errors.costPrice && errors.costPrice.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.discountPercent} isRequired>
        <FormLabel>Discount Percent</FormLabel>
        <Input
          type="number"
          defaultValue={0}
          {...register("discountPercent")}
          placeholder="Enter Discount Percent"
        />
        <FormErrorMessage>
          {errors.discountPercent && errors.discountPercent.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.rate} isRequired>
        <FormLabel>Rating</FormLabel>
        <RatingStars
          onChange={(newRating: number) => {
            setValue("rate", newRating);
          }}
        />
        <FormErrorMessage>
          {errors.rate && errors.rate.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.stock} isRequired>
        <FormLabel>Stock</FormLabel>
        <Input
          type="number"
          {...register("stock")}
          placeholder="Enter Stock Count"
        />
        <FormErrorMessage>
          {errors.stock && errors.stock.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.categoryId} isRequired>
        <FormLabel>Category</FormLabel>
        <Select {...register("categoryId")}>
        <option>Select Category</option>
          {categoryList?.data.map((category: ICategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.categoryId && errors.categoryId.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.brandId} isRequired>
        <FormLabel>Brand</FormLabel>
        <Select {...register("brandId")}>
        <option>Select Brand</option>
          {brandList?.data.map((brand: IBrand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.brandId && errors.brandId.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.description} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          {...register("description")}
          placeholder="Enter Product Description"
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.posterImageFile} isRequired>
        <FormLabel>Poster Image</FormLabel>
        <FileUpload
          accept={"image/*"}
          register={register("posterImageFile", { validate: validateFiles })}
        >
          <Button leftIcon={<Icon as={FiFile} />}>Choose File</Button>
        </FileUpload>
        <FormErrorMessage>
          {errors.posterImageFile && errors?.posterImageFile.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.imageFiles} isRequired>
        <FormLabel>Product Images</FormLabel>
        <FileUpload
          accept={"image/*"}
          multiple
          register={register("imageFiles", { validate: validateFiles })}
        >
          <Button leftIcon={<Icon as={FiFile} />}>Choose Files</Button>
        </FileUpload>
        <FormErrorMessage>
          {errors.imageFiles && errors?.imageFiles.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} className="submit-btn" type="submit">
        Create New Product
      </Button>
    </form>
  );
};
