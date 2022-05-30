import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    common: {
      black: "#1D1D1D",
      darkBlack: "#000",
      white: "#fff",
      grey: "#8F8F8F",
      lightGrey: "#f4f4f4",
      lightBlue: "#2176FF",
      darkBlue: "#004ECC",
      red: "#C90A0A",
      lightBlack: 'rgba(29, 29, 29, 0.6)',
    },
    primary: {
      main: "#0C2174",
      light: "#3A86FF",
      dark: "#03045E",
      contrastText: "#fff",
    },
    secondary: {
      main: "#008CE6",
    },
    error: {
      main: "#D90429",
      contrastText: "#fff",
    },
    warning: {
      main: "#D90429",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#33C3A4",
      light: "#4caf50",
      dark: '#2EC4B6',
      contrastText: "#fff",
    },
    switchOn: {
      main: "#2EC4B6",
    },
    switchOff: {
      main: "#C90A0A",
    },
    grey: {
      A100: "#d5d5d5",
    },
    background: {
      default: "#fff",
    },
    tiles: {
      overdue: "#D90429",
      inProgress: "#3A86FF",
      //pending: "#2EC4B6",
      pending: "#854805",
      operations: "#03045E",
      notifications: "#854805",
      hold: "#854805",
    },
    chips: {
      background: {
        new: "#9980f9",
        modify: "#3cd3b2",
        delete: "#c29855",
        overdue: "#C80909",
      },
      textColor: {
        primary: "#1D1D1D",
      },
    },
    slaChips: {
      background: {
        today: "#E26C00",
        duein: "#FF0000",
        tomorrow: "#74520B",
        overdue: "#C90A0A",
        operationAfter: "#C90A0A",
        //operationBefore: "#25A748",
        operationBefore: "#156528",
        nocolor:'#00000000',
        first:"#008000",
        second:"#FFA500",
        third:"#FF0000",
      },
      textColor: {
        primary: "#FFFFFF",
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 12,
  },
  //Overrides Css start here
  components: {
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       "&.MuiSelect-root": {
    //         backgroundColor: "#0C2174",
    //         color: "#fff"
    //       }
    //     }
    //   }
    // },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: '500',
          "&.MuiIconButton-root": {
            padding: '0px',
            color: "#0C2174",
            //backgroundColor: "#0C2174",
            border: '1px solid #0C2174'
          },
          "&.MuiButton-root": {
            fontSize: '16px',
          },
          "&.MuiMenuItem-root": {
            fontSize: '16px',
          },
          "&.MuiPickersDay-root": {
            fontSize: '14px',
          },
          "&.MuiChip-deletable": {
            background: 'rgba(12, 33, 116, 0.2)',
            color: '#1D1D1D',
            fontSize: '14px',
            fontWeight: '400',
            borderRadius: '4px',
            "& svg": {
              color: '#0C2174',
              width: '14px',
              height: '14px',
              cursor: 'pointer',
            }
          },
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f4f4f4",
        },
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E8E8E8',
          verticalAlign: 'text-top',
        },
        body: {
          color: "rgba(29, 29, 29, 1) !important",
          fontWeight: "400",
          lineHeight: "22px",
          fontSize: "14px",
        },
        head: {
          fontSize: "16px",
          fontWeight: "500",
          //color: "rgba(29, 29, 29, 0.6)",
          color: "rgba(0, 0, 0, 0.6)",
        },
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "0.4em",
            height: "0.2em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 3px rgba(0,0,0,0.00)",
          },
          "*::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal":
            {
              background: "rgba(196, 196, 196, 1)",
              borderRadius: "20px",
              height: "0.2em",
            },
          },
          body: {
            color: "#1D1D1D",
            fontSize: "14px !important",
            fontWeight: "400",
            lineHeight: "22px",
          },
          h1: {
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "0px",
            marginTop: "0px",
          },
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: 'pointer'
        },
        button: {
          cursor: 'pointer'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          //border: "1px solid rgba(143, 143, 143, 1)",
          "textarea": {
            padding: '0px !important',
          }
        },
        input: {
          "&.MuiOutlinedInput-input": {
            padding: '10px 14px',
            backgroundColor: '#fff',
            //padding: '0px',
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            position: 'absolute',
            zIndex: '100',
            left: '3px',
            top: '3px',
            width: 'calc(100% - 80px) !important',
            //background: 'rgba(5, 20, 50, 0.1) !important',
          },
          "& .MuiOutlinedInput-root": {
            minHeight: '43px',
            paddingTop: '35px !important',
          },
        },
        popupIndicator: {
          color: "#0C2174",
        },
        endAdornment: {
          top: '0px',
        },
        
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#1D1D1D",
          '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child':
            {
              // Default left padding is 6px
              paddingLeft: 26,
            },
  
          // "& .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "transparent",
          // },
  
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "transparent",
          // },
  
          // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "transparent",
          // },
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
        button: {
          backgroundColor: "#000",
        },
        body1: {
          fontSize: "16px",
          color: "#1D1D1D",
        },
        colorTextPrimary: {
          color: "#fff",
          fontSize: "14px",
          fontWeight: "400",
        },
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.MuiSelect-icon": {
            color: "#0C2174",
          }
        },
        colorError: {
          color: "#C90A0A",
        },
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          "&$selected": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
          },
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          marginRight: "14px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        },
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          // padding: '10px',
        },
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          padding: "10px",
        },
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(143, 143, 143, 1)",
          borderRadius: "4px",
          padding: "5px 15px",
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#1D1D1D",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "18.75px",
        },
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#1D1D1D",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "18.75px",
          paddingBottom: "10px",
          "&.Mui-error": {
            color: "#1D1D1D",
          },
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        label: {
          borderRadius: "8px",
          padding: "3px 10px 3px 10px",
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "20px",
        },
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          display: "flex",
        },
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorDockedLeft: {
          boxShadow: "2px 0 16px 0 rgba(95,140,202,0.24)",
          borderRight: "0px",
        },
        paperAnchorRight: {
          width: "475px",
        },
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: "14px",
          fontWeight: "400",
        },
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          //background: "rgba(12, 33, 116, 0.2)",
          background: "#fff",
          //border: '2px solid #000',
          margin: '5px 5px 5px 0px',
          borderRadius: '4px',
          color: '#000',
          fontSize: '14px',
          fontWeight: '400',
          "& svg": {
            color: "#0C2174",
            cursor: 'pointer',
            width: '14px',
            height: '14px',
          },
        }
      }
    }
  }
});

export default theme;
