import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const SearchBar = ({ setFindData }) => {
  return (
    <ChakraProvider>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search..."
          className="bg-white"
          onChange={(e) => setFindData(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="2rem"
            size="md"
            colorScheme="blue"
            // onClick={() => {
            //   console.log("hello");
            // }}
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </ChakraProvider>
  );
};

export default SearchBar;
