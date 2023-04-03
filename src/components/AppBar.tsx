import * as React from "react";

import { To, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AppBar = ({ pages }: any): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: { currentTarget: React.SetStateAction<null>; }) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path: To): void => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <></>
  );
};
