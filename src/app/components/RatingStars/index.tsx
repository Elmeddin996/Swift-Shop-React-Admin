import React from "react";
import { StarIcon as StarOutlineIcon, StarIcon as StarFilledIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";

interface RatingStarsProps {
  onChange: (newRating: number) => void;
  initialRating?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ onChange, initialRating = 0 }) => {
  const [rating, setRating] = React.useState(initialRating);

  React.useEffect(()=>{
   setRating(initialRating)
  },[initialRating])

  const handleClick = (newRating: number) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton
          key={value}
          icon={value <= rating ? <StarFilledIcon color="yellow.400" /> : <StarOutlineIcon />}
          size="md"
          onClick={() => handleClick(value)}
          aria-label={`Rating ${value}`}
        />
      ))}
    </HStack>
  );
};

export default RatingStars;
