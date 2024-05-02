import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { LicenseManager } from "ag-grid-enterprise";
import { SnackbarProvider } from "notistack";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import locales from "./locales";
import configureStore from "stores";
import reportWebVitals from "reportWebVitals";
import DocLayoutContainer from "views/containers/doc/layout/DocLayoutContainer";
import LoginFormContainer from "views/containers/login/LoginFormContainer";
import ManagerLayoutContainer from "views/containers/manager/layout/ManagerLayoutContainer";
import HistoryLayoutContainer from "views/containers/history/layout/HistoryLayoutContainer";
import UrlDownloadContainer from "views/containers/download/UrlDownloadContainer";
import UserLocked from "views/templates/userlocked/UserLocked";
import AgentDownload from "views/templates/agent/AgentDownload";
import ExternalStorage from "views/templates/externalstorage/ExternalStorage";
import ExternalStorageModal from "views/templates/externalstorage/ExternalStorageModal";
import MobileLanding from "views/templates/mobile/MobileLanding";
import SnackbarAlert from "views/commons/snackbar/SnackbarAlert";
import { GlobalDialogProvider } from "views/commons/dialog/GlobalDialogProvider";
import DevIndexPage from "views/DevIndexPage";
import { AG_GRID_LICENSE_KEY, IS_DEV, KUPLOAD_ID } from "constants/global-constants";
import "@fontsource/roboto";
import "@fontsource/noto-sans-kr";
import "assets/styles/index.css";
import ExternalStorageModalContainer from "views/containers/externalstorage/ExternalStorageModalContainer";

console.debug("index.js");

const { store, persistor } = configureStore();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
    debug: IS_DEV,
  });

const defaultTheme = createTheme();

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "맑은고딕", "MalgunGothic", "Arial", "helvetica", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#3e7ff1",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#797979",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffffff",
    },
    accent : {
      main: "#263238",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffffff",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          letterSpacing: "-0.04em",
        },
      },
    },
    MuiTab: {
      root: {
        [defaultTheme.breakpoints.up("sm")]: {
          minWidth: "120px",
        },
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: "#EEF2F9",
      },
    },
    MuiDialogTitle: {
      root: {
        padding: "6px 14px",
        color: "#00254C",
        backgroundColor: "#ffffff",
      },
    },
    MuiDialogContent: {
      root: {
        padding: "14px",
      },
    },
    MuiDialogActions: {
      root: {
        padding: "0px 14px 14px",
      },
    },
    MuiTableCell: {
      root: {
        padding: "8px",
        fontSize: "13px",
      },
      sizeSmall: {
        padding: "4px",
      },
      head: {
        color: "#00254c",
        fontWeight: "600",
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: "13px",
      },
    },
    MuiButton: {
      contained: {
        boxShadow: "0px",
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: "14px",
        textShadow: "-1px -1px 0 #fff,1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 8px) scale(1)",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "5.5px",
        backgroundColor: "#ffffff",
        fontSize: "14px",
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: "14px",
      },
    },
    MuiAccordion: {
      rounded: {
        "&:first-child": {
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        },
        "&:last-child": {
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        },
      },
    },
  },
});

// AgGrid Enterprise 라이센스 키 설정
LicenseManager.setLicenseKey(AG_GRID_LICENSE_KEY);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          content={(key, options) => (
            <SnackbarAlert snackbarKey={key} severity={options.severity} title={options.title}>
              {options.message}
            </SnackbarAlert>
          )}
        >
          <GlobalDialogProvider>
            <HashRouter>
              <Switch>
                <Redirect path="/" to="/doc" exact />
                <Route path="/dev" component={DevIndexPage} />
                <Route path="/login" component={LoginFormContainer} />
                <Route path="/manager" component={ManagerLayoutContainer} />
                <Route path="/history" component={HistoryLayoutContainer} />
                <Route path="/doc" component={DocLayoutContainer} />
                <Route path="/locked" component={UserLocked} />
                {/* <Route path="/externalstorage" component={ExternalStorage} /> */}
                <Route path="/externalstorage" component={ExternalStorageModalContainer} />
                <Route path="/agent-download" component={AgentDownload} />
                <Route path="/download/:dataId" component={UrlDownloadContainer} />
                <Route path="/mobile" component={MobileLanding} />
              </Switch>
            </HashRouter>
          </GlobalDialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);

// 성능 리포트
reportWebVitals();

// kupload 초기화
new window.RAONKUpload({
  Id: KUPLOAD_ID,
  InitVisible: false,
  InitXml: IS_DEV ? "raonkupload-dev.config.xml" : "raonkupload-pro.config.xml",
});

window.RAONKUPLOAD_CreationComplete = (uploadId) => {
  console.debug("KUpload initialized");
  window.RAONKUPLOAD.AddHttpHeader("Cookie", document.cookie, uploadId);
};

window.RAONKUPLOAD_UploadComplete = () => {
  window.location.reload();
};
