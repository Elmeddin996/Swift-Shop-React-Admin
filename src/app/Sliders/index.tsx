import React from 'react';
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
import { useSliderContext } from '../../hooks';
import { Pagination } from '../components/Pagination';
import { ISlider } from '../../models';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';
import Swal from 'sweetalert2';

export const Sliders:React.FC = () => {
  const{sliderList, mutateDeleteSlider}=useSliderContext();
  const navigate=useNavigate()

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 7;
  const slicedSliders = sliderList?.data.slice(startIndex, startIndex + 7);
  const totalPages = Math.ceil(sliderList?.data.length / 7);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleDelete=(id:number)=>{
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
        Swal.fire("Deleted!", "Slider has been deleted.", "success");
        mutateDeleteSlider(id).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
      }
    });
  }

  return (
    <div>
        <Button
        className="create-btn"
        onClick={() =>navigate(ROUTES.SLIDER.CREATE)}
      >
        Create New Slider
      </Button>
      <Divider />
      <TableContainer className="table-container">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
             
              <Th isNumeric>Description</Th>
              <Th isNumeric padding="0 80px 0 0">
                Actions
              </Th>
            </Tr>
          </Thead>
          {slicedSliders?.map((slider:ISlider) => {
            return (
              <Tbody key={slider.id} justifyContent="center" className="table">
                <Tr>
                  <Td>
                    <Image
                      borderRadius="full"
                      boxSize="60px"
                      src={slider.imageUrl}
                      alt={slider.imageName}
                    />
                  </Td>
                  <Td>{slider.title}</Td>
                  <Td isNumeric>{slider.desc?.length>20?slider.desc.slice(0,20)+".....":slider.desc}</Td>

                  <Td isNumeric>
                    <Button
                      className="detail-btn"
                      onClick={() =>
                        navigate(`${ROUTES.SLIDER.EDIT}/${slider.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="detail-btn"
                      onClick={() =>handleDelete(slider.id)}
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
  )
}
