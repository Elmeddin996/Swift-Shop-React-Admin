import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

interface IPaginationProps {
    activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


export const Pagination: React.FC<IPaginationProps> = ({ activePage, totalPages, onPageChange }) => {
  return (
    <Box>
      <HStack spacing={2} justifyContent="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            colorScheme={activePage === index + 1 ? 'teal' : 'gray'}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

