import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ManageAccountsOutlined as PendingActionsIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

const BottomBlurContainer = styled(Box)(() => {
  return {
    position: "absolute",
    left: "0px",
    bottom: "0px",
    height: "26%",
    width: "100%",
    overflowX: "clip",
    overflowY: "clip",
  };
});
const BottomBlur = styled(Box)(() => {
  return {
    position: "absolute",
    width: "233%",
    height: "61%",
    left: "-73%",
    top: "63%",
    background: "rgba(37, 176, 219, 0.3)",
    filter: "blur(75px)",
  };
});

function SideBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      bgcolor="#fff"
      height={1}
      position="relative"
      borderRight={() =>
        `1px solid rgba(233, 238, 245, 1)`
      }
      display="flex"
      alignItems="center"
      flexDirection="column"
      lineHeight={0}
      pt={2}
    >
      <Box mb={4}>
        <img
          src="/company-logo.png"
          width="28px"
          height="28px"
          style={{ borderRadius: "7px" }}
        />
      </Box>
      <Box mb={2.5}>
        <IconButton
          onClick={() => navigate("/user-admin")}
          style={pathname === '/user-admin' ? {backgroundColor: '#5191E926'} : {}}
          sx={{ borderRadius: 2 }}
        >
          <PendingActionsIcon color={'primary'} />
        </IconButton>
      </Box>
      <BottomBlurContainer>
        <BottomBlur />
      </BottomBlurContainer>
    </Box>
  );
}

export default SideBar;
