import React from "react";
import {
  Stack,
  Image,
  Text,
  Box,
  Heading,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

const Product = ({ product }) => {
  return (
    <Stack>
      <Image src={product.imageUrl} alt={product.name} />
      <Text>{product.category}</Text>
      <Tag>
        <TagLabel>{product.brand}</TagLabel>
      </Tag>
      <Heading>{product.name}</Heading>
      <Box>{product.price}</Box>
    </Stack>
  );
};

export default Product;
