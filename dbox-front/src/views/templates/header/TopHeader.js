import { Fragment } from "react";
import { AppBar, Toolbar, Box, Typography, Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import styles from "./TopHeader.module.css";
import ImgLogo from "assets/imgs/logo_niris.png";
import IconSetting from "assets/imgs/icon_setting.svg";

console.debug("TopHeader.js");

export default function TopHeader({ menuAnchorEl, menuOpened, onMenuClick, onMenuClose, onLogoutClick, user, onToDataClick, onToProjectClick, onToResearchClick, onToHistoryClick, onToManagerClick, onToExternalStorageClick, showResearch }) {
  return (
    <Fragment>
      <AppBar position="fixed" elevation={0} color="inherit">
        <Toolbar disableGutters={true} className={styles.nav}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Box className={styles.logo}>
              <img src={ImgLogo} />
            </Box>
            <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToDataClick}>자료실</Typography>
            <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToProjectClick}>프로젝트/투자</Typography>
            {showResearch && <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToResearchClick}>연구과제</Typography>}
            <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToHistoryClick}>이력조회</Typography>
            <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToManagerClick}>관리자</Typography>
            <Typography sx={{ minWidth: 100 }} className={styles.menu} onClick={onToExternalStorageClick}>외부저장매체</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="body2" gutterBottom><span>{user.orgNm}</span> <span>{user.displayName}</span></Typography>
            <Typography variant="caption" className={styles.role}>{user.titleName}</Typography>
            <Avatar src={`http://m.niris.dongkuk.com/service/getProfileImage.do?socialPerId=${user.userId}`} alt="H" sx={{ width: 36, height: 36 }} />
            <IconButton aria-label="setting" size="small" className={styles.btnSetting} onClick={onMenuClick}>
              <img src={IconSetting} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={menuOpened}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onLogoutClick}>로그아웃</MenuItem>
      </Menu>
    </Fragment>
  );
}
