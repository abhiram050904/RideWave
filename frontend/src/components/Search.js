import React from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuCircle } from "react-icons/lu";
import { IoArrowDownOutline } from "react-icons/io5";
import { IoMdSquareOutline } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Search = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <SearchContainer>
      <ButtonContainer onClick={handleBackClick}>
        <IoMdArrowRoundBack size={32} />
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <LuCircle size={24} />
          <IoArrowDownOutline size={24} />
          <IoMdSquareOutline size={24} />
        </FromToIcons>
        <InputBoxes>
          <Input placeholder='Enter pickup location' />
          <Input placeholder='Enter the drop location' />
        </InputBoxes>
        <AiOutlinePlusCircle size={40} color="#000000" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon>
          <AiFillStar size={24} color="#fff" />
        </StarIcon>
        Saved Places
      </SavedPlaces>
      <ConfirmButton>
        Confirm Location
      </ConfirmButton>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  background-color: #e5e7eb;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ButtonContainer = styled.div`
  background-color: #ffffff;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  height: 3rem;
  cursor: pointer;
`;

const InputContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  padding: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const FromToIcons = styled.div`
  width: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const InputBoxes = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

const Input = styled.input`
  height: 2.5rem;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  outline: none;
  border: none;
`;

const SavedPlaces = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.5rem 1rem;
`;

const StarIcon = styled.div`
  background-color: #4a4a4a;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  height: 3rem; /* Increased height */
  width: 98%;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 1rem;
  font-size: 20px;
  
  &:hover {
    background-color: #333;
  }
`;

export default Search;
