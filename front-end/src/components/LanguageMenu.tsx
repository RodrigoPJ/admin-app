import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, Typography } from "@mui/material";

export default function LanguageMenu() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setSpanish = () => {
    setAnchorEl(null);
  };

  const setEnglish = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography
          fontSize="12px"
          color="primary.main"
          fontWeight={500}
        >
          Language
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          },
        }}
      >
        <StyledMenuItem onClick={setEnglish}>
          <MenuItemText fontSize={'12px!important'}>English</MenuItemText>
        </StyledMenuItem>
        <StyledMenuItem onClick={setSpanish}>
          <MenuItemText fontSize={'12px!important'}>Spanish</MenuItemText>
        </StyledMenuItem>
      </Menu>
    </>
  );
}

// STYLED COMPONENTS
const MenuItemText = styled(Typography)(() => {
  return {
    fontSize: `${22 / 16}rem`,
    color: '#1976d2',
  };
});

const StyledMenuItem = styled(MenuItem)(() => ({
  "&:hover": {
    backgroundColor: "rgba(240, 246, 250, 1)",
  },
}));
