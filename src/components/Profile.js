import React from 'react';
import styled from 'styled-components';

const CircleProfilePic = ({ username }) => {
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
  width: 30px;
  height: 30px;
  background-color: #bdbdbd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-left:10px;
`;

export default CircleProfilePic;
