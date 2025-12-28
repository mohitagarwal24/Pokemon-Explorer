import { IconButton, Modal, Paper } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PokemonDetails from "../components/PokemonDetails";
import styled from "styled-components";

const StyledModalContent = styled(Paper)`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  @media screen and (max-width: 900px) {
    max-height: 80vh;
    overflow-y: auto;
    padding: 5px;
  }
`;

const CloseButton = styled(IconButton)`
  position: fixed;
  top: 5px;
  right: 5px;
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
      <StyledModalContent>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
        {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
      </StyledModalContent>
    </Modal>
  );
};

export default PokemonDetailsPopUp;
