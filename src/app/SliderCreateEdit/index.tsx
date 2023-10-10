import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
} from "@chakra-ui/react";
import Nope from "nope-validator";
import React from "react";
import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { FiFile } from "react-icons/fi";
import { FileUpload } from "../components/FileUpload";
import { useSliderContext } from "../../hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useService } from "../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import Swal from "sweetalert2";
import { ROUTES } from "../../routes/consts";
type FormValues = {
  title: string;
  desc: string;
  imageFile?: FileList;
};

const schema = Nope.object().shape({
  title: Nope.string()
    .max(30, "Title length should be maximum 30"),
  desc: Nope.string()
    .max(150, "Description length should be maximum 150")
});

export const SliderCreateEdit: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { sliderService } = useService();
  const { mutateCreateSlider, mutateEditSlider } = useSliderContext();
  const [slider, setSlider] = React.useState<FormValues>();

  const { data: sliderData } = useQuery([EQueryKeys.GET_SLIDER], () =>
    id ? sliderService.getSlider(id) : null
  );

  React.useEffect(() => {
    setSlider(sliderData?.data);
  }, [sliderData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: nopeResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const values: FormValues = {
      desc: data.desc ? data.desc : sliderData?.data.desc,
      title: data.title ? data.title : sliderData?.data.title,
    };
    const newbody = new FormData();
    data.imageFile && newbody.append("imageFile", data.imageFile[0]);
    id && newbody.append("id", id);
    newbody.append("desc", values.desc.toString());
    newbody.append("title", values.title);

    if (location.pathname === "/slider-create") {
      mutateCreateSlider(newbody)
        .then(() => navigate(ROUTES.SLIDER.LIST))
        .then(() => {
          Swal.fire("Created!", "New Slider created successfully.", "success");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            Swal.fire("Error!", "Title is already exists.", "error");
          } else {
            Swal.fire("Error!", "Something is wrong.", "error");
          }
        });
    } else {
      mutateEditSlider(newbody)
      .then(() => navigate(ROUTES.SLIDER.LIST))
        .then(() => {
          Swal.fire("Changed!", "Slider changed successfully.", "success");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            Swal.fire("Error!", "Title is already exists.", "error");
          } else {
            Swal.fire("Error!", "Something is wrong.", "error");
          }
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel sx={{ fontSize: 33 }}>
        {location.pathname === "/slider-create"
          ? "Create New Slider"
          : "Edit Slider"}
      </FormLabel>
      <FormControl isInvalid={!!errors.title} isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          {...register("title")}
          placeholder="Enter Slider Title"
          defaultValue={slider ? slider.title : ""}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.desc} isRequired>
        <FormLabel>Description</FormLabel>
        <Input
          {...register("desc")}
          placeholder="Enter Slider Description"
          defaultValue={slider ? slider.desc : ""}
        />
        <FormErrorMessage>
          {errors.desc && errors.desc.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!errors.imageFile} isRequired>
        <FormLabel>Image File</FormLabel>
        <FileUpload accept={"image/*"} register={register("imageFile")}>
          <Button leftIcon={<Icon as={FiFile} />}>Choose File</Button>
        </FileUpload>
        <FormErrorMessage>
          {errors.imageFile && errors?.imageFile.message}
        </FormErrorMessage>
      </FormControl>

      {location.pathname !== "/slider-create" && (
        <div>
          <Image
            sx={{ maxWidth: 400 }}
            alt="poster"
            src={sliderData?.data.imageUrl}
          />
        </div>
      )}

      <Button mt={4} className="submit-btn" type="submit">
        {location.pathname === "/slider-create"
          ? "Create New Slider"
          : "Save Changes"}
      </Button>
    </form>
  );
};
