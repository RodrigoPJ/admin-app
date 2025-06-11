import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <Window>
      <NavigationRegion>
        <SideBar />
      </NavigationRegion>
      <AppBarRegion>
        <AppBar />
      </AppBarRegion>
      <BodyRegion><Outlet /></BodyRegion>
    </Window>
  );
}

export default MainLayout;

const Window = styled(Box)((theme) => {
  
  return {
    // width: "100vw",
    height: "100vh",
    backgroundColor: theme.theme.palette.background.paper,
    display: "grid",
    gridTemplateRows: "60px 1fr",
    gridTemplateColumns: "60px 1fr",
  };
});
const NavigationRegion = styled(Box)(() => {
  return {
    gridArea: "1 / 1 / 3 / 2",
  };
});
const AppBarRegion = styled(Box)(() => {
  return {};
});
const BodyRegion = styled(Box)(() => {
  return {
    height: "100%",
    overflowY: "auto",
    scrollbarWidth: "none",
    background: 'rgba(240, 246, 250, 1)'
  };
});
