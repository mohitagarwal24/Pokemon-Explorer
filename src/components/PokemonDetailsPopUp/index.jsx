import React from "react";
import { IconButton, Modal, Paper, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { motion } from "framer-motion";

// ✅ المسار الصحيح
import PokemonDetails from "../PokemonDetails";

const StyledModalContent = styled(motion(Paper))`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;

  @media screen and (max-width: 900px) {
    width: 90%;
    padding: 10px;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PokemonDetailsPopUp = ({
  selectedPokemon,
  setIsModalOpen,
  isModalOpen,
}) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <StyledModalContent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <CloseButton onClick={closeModal}>
            <CloseIcon />
          </CloseButton>

          {selectedPokemon && (
            <PokemonDetails pokemon={selectedPokemon} />
          )}
        </StyledModalContent>
      </Box>
    </Modal>
  );
};

export default PokemonDetailsPopUp;