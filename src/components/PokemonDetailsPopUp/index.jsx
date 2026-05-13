import React from "react";
import { IconButton, Modal, Paper, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { motion } from "framer-motion";

// ✅ المسار الصحيح
import PokemonDetails from "../PokemonDetails";

const MotionPaper = motion.create(Paper);

const StyledModalContent = styled(MotionPaper)`
  position: relative;
  padding: 0;
  background-color: transparent;
  border-radius: 16px;
  max-height: 80vh;
  overflow-y: auto;
  outline: none;

  @media screen and (max-width: 900px) {
    max-height: 88vh;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.78);

  &:hover {
    background: rgba(255, 255, 255, 0.94);
  }
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
