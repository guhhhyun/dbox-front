import { Fragment, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { ClickAwayListener, Grow, makeStyles, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import { ArrowForwardIosOutlined } from "@material-ui/icons";
import ContextMenuDivider from "views/templates/doc/contextmenu/ContextMenuDivider";

console.debug("ContextMenu.js");

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: theme.zIndex.modal + 2000,
  },
  paper: {
    width: 200,
  },
}));

const ContextMenu = forwardRef(function ({ menus, open, onClose, anchorEl, posX = 0, posY = 0, offsetX = 0, offsetY = 0 }, ref) {
  const classes = useStyles();

  const [posEl, setPosEl] = useState(
    anchorEl || {
      getBoundingClientRect: () => ({ left: 0, right: 0, bottom: 0, top: 0 }),
      clientWidth: 0,
      clientHeight: 0,
    },
  );
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (!anchorEl) setPosEl(makeVirtualElement(posX + offsetX, posY + offsetY));
    setFocused(null);
  }, [posX, posY]);

  useImperativeHandle(ref, () => ({
    closeMenu,
  }));

  /**
   * 위치 설정을 위한 가상 Element 생성
   */
  const makeVirtualElement = (x, y) => ({
    getBoundingClientRect: () => ({ left: x, right: x, bottom: y, top: y }),
    clientWidth: 0,
    clientHeight: 0,
  });

  /**
   * 하위 메뉴 열기
   */
  const setFocusedMenu = (event, menu) => {
    setFocused({
      element: event.currentTarget,
      menu: menu,
    });
  };

  /**
   * 메뉴 클릭
   */
  const clickMenu = (event, menu) => {
    if (menu.children) {
      setFocusedMenu(event, menu);
    } else {
      if (typeof menu.onClick === "function") {
        menu.onClick(event);
        closeMenu();
      }
    }
  };

  /**
   * 메뉴 닫기
   */
  const closeMenu = () => {
    setFocused(null);
    onClose();
  };

  return (
    <Fragment>
      <Popper
        className={classes.popper}
        open={open}
        anchorEl={posEl}
        placement={"right-start"}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "viewport",
          },
        }}
        popperOptions={{ positionFixed: true }}
        transition
        disablePortal
        keepMounted
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.paper} elevation={5} style={{ display: open ? "block" : "none", borderRadius: "6px" }}>
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  {menus.map((menu, index) =>
                    !menu.divider ? (
                      <MenuItem
                        key={index}
                        onClick={(event) => {
                          clickMenu(event, menu);
                        }}
                        onMouseEnter={(event) => {
                          setFocusedMenu(event, menu);
                        }}
                        disabled={menu.disabled || (typeof menu.onClick !== "function" && !menu.children)}
                      >
                        <div style={{ flexGrow: 1 }}>{menu.element}</div>
                        {menu.children ? <ArrowForwardIosOutlined style={{ fontSize: 14 }} /> : null}
                      </MenuItem>
                    ) : (
                      <div key={index} style={{ flexGrow: 1 }}>
                        {menu.element || <ContextMenuDivider />}
                      </div>
                    ),
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {focused?.menu?.children ? (
        <ContextMenu
          menus={focused.menu.children}
          anchorEl={focused.element}
          onClose={() => {
            closeMenu();
          }}
          open
        />
      ) : null}
    </Fragment>
  );
});

export default ContextMenu;
