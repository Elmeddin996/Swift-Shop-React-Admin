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
  Image,
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
import { useProductContext } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../routes/consts";
import "./style.scss";

type FormValues = {
  posterImageFile?: FileList;
  imageFiles?: FileList;
  id: number;
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
  name: Nope.string(),
  description: Nope.string(),
  salePrice: Nope.number(),
  costPrice: Nope.number(),
  discountPercent: Nope.number(),
  rate: Nope.number(),
  stock: Nope.number(),
});

const validateFiles = (value: FileList | undefined) => {
  if (value !== undefined) {
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  }
};

export const ProductEdit: React.FC = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const { categoryService, brandsService, productService } = useService();
  const { mutateEditProduct } = useProductContext();
  const [product, setProduct] = React.useState<FormValues>();

  const { data: categoryList } = useQuery([EQueryKeys.GET_CATEGORY_LIST], () =>
    categoryService.getCategoryList()
  );

  const { data: brandList } = useQuery([EQueryKeys.GET_BRAND_LIST], () =>
    brandsService.getBrandList()
  );

  const { data: productData } = useQuery([EQueryKeys.GET_PRODUCT], () =>
    id ? productService.getProduct(id) : null
  );

  React.useEffect(() => {
    setProduct(productData?.data);
  }, [productData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({ resolver: nopeResolver(schema) });
  const onSubmit = (data: FormValues) => {
    const values: FormValues = {
      name: data.name ? data.name : productData?.data.name,
      salePrice: data.salePrice ? data.salePrice : productData?.data.salePrice,
      costPrice: data.costPrice ? data.costPrice : productData?.data.costPrice,
      discountPercent: data.discountPercent
        ? data.discountPercent
        : productData?.data.discountPercent,
      stock: data.stock ? data.stock : productData?.data.stock,
      description: data.description ? data.description : productData?.data.description,
      rate: data.rate ? data.rate : productData?.data.rate,
      id: productData?.data.id,
      brandId: data.brandId?data.brandId: productData?.data.brandId,
      categoryId:data.categoryId?data.categoryId: productData?.data.categoryId,
    };

    const reqBody = new FormData();
    data.imageFiles &&
      Array.from(data.imageFiles).forEach((image) => {
        reqBody.append(`imageFiles`, image);
      });
    data.posterImageFile &&
      reqBody.append("posterImageFile", data.posterImageFile[0]);
    reqBody.append("brandId", values.brandId.toString());
    reqBody.append("id", id ? id.toString() : "");
    reqBody.append("categoryId", values.categoryId.toString());
    reqBody.append("costPrice", values.costPrice.toString());
    reqBody.append("salePrice", values.salePrice.toString());
    reqBody.append("discountPercent", values.discountPercent.toString());
    reqBody.append("description", values.description);
    reqBody.append("name", values.name);
    reqBody.append("rate", values.rate.toString());
    reqBody.append("stock", values.stock.toString());
    mutateEditProduct(reqBody)
    .then(() => navigate(ROUTES.PRODUCT.LIST))
      .then(() => {
        Swal.fire("Changed!", "Product data changed successfully.", "success");
      }).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel sx={{fontSize:33}}>Edit Product</FormLabel>
      <FormControl isInvalid={!!errors.name} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          {...register("name")}
          placeholder="Enter Product Name"
          defaultValue={product?.name || ""}
        />
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
          defaultValue={product?.salePrice || ""}
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
          defaultValue={product?.costPrice || ""}
        />
        <FormErrorMessage>
          {errors.costPrice && errors.costPrice.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.discountPercent} isRequired>
        <FormLabel>Discount Percent</FormLabel>
        <Input
          type="number"
          {...register("discountPercent")}
          placeholder="Enter Discount Percent"
          defaultValue={product?.discountPercent || ""}
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
          initialRating={product?.rate || 0}
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
          defaultValue={product?.stock || ""}
        />
        <FormErrorMessage>
          {errors.stock && errors.stock.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.categoryId} isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          {...register("categoryId")}
          defaultValue={productData?.data.categoryId}
        >
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
        <Select
          {...register("brandId")}
          defaultValue={productData?.data.brandId}
        >
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
          defaultValue={product?.description || ""}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.posterImageFile}>
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
      <div className="image-container">
        <Image className="img" alt="poster" src={productData?.data.imageUrl}/>
      </div>

      <FormControl mt={4} isInvalid={!!errors.imageFiles}>
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
      <div className="image-container">
        {productData?.data.imageUrls.map((img:string,index:number)=>(
        <Image key={index}  src={img}/>
        ))}
      </div>


      <Button mt={4} className="submit-btn" type="submit">
        Save Changes
      </Button>
    </form>
  );
};
