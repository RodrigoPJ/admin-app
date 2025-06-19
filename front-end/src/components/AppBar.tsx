import { Box, Divider, Typography } from "@mui/material";
import SettingsIcon from "./icons/SettingsIcon";
import NotificationsIcon from "./icons/NotificationsIcon";
import LanguageMenu from "./LanguageMenu";


function AppBar() {
  return (
    <Box
      bgcolor="#fff"
      height={1}
      px={2}
      display="flex"
      borderBottom={() => `1px solid rgba(233, 238, 245, 1)`
      }
      alignItems="center"
    >
      {/* Newly added Box */}
      <Box lineHeight={0} ml="auto">
        <LanguageMenu />
      </Box>
      {/* ------------------ */}
      <Box lineHeight={0} ml={3.5}>
        <SettingsIcon size={19} />
      </Box>
      <Box lineHeight={0} ml={1.5}>
        <NotificationsIcon size={20} />
      </Box>
      <Divider orientation="vertical" sx={{ ml: 2.5, height: 22 }} />
      <Box display="flex" columnGap={1} alignItems="center" ml={2.5}>
        <img
          src="/sample-user.png"
          width="30px"
          height="30px"
          style={{ borderRadius: "50%" }}
        />
        <Box>
          <Typography
            component="p"
            fontSize="12px"
            fontWeight={500}
            color="#1976d2"
          >
            James Watt
          </Typography>
          <Typography
            component="p"
            fontSize="12px"
            color="#1976d2"
          >
            You
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AppBar;
