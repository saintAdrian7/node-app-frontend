import React from 'react';
import styled from 'styled-components';

const CircleProfilePic = ({ username }) => {
  // Function to extract the first letter of the username
  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <StyledProfilePic>
      {getInitials(username)}
    </StyledProfilePic>
  );
};


const StyledProfilePic = styled.div`
  width: 50px;
  height: 50px;
  background-color: #bdbdbd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export default CircleProfilePic;
