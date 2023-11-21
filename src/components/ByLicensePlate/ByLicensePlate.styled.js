import { OutlinedInput, styled } from "@mui/material";
import DatePicker from "react-datepicker";
import { InputContStyled } from "../ByParameters/ByParameters.styled";

export const InputWrapperStyled = styled(InputContStyled)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },

  "&  .box": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    [theme.breakpoints.up("sm")]: {
      gap: 16,
    },
  },
  "& .react-datepicker__view-calendar-icon input": {
    padding: 16,
    borderRadius: "50px",
    outline: "none",
    borderColor: "transparent",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "1.5",
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  "& .react-datepicker": {
    fontFamily: "Open Sans",
    fontSize: 16,
    borderRadius: 50,
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
    "&__header": {
      borderTopRightRadius: "50px!important",
      borderTopLeftRadius: 50,
    },
    "&__current-month": {
      fontSize: "1.5rem",
    },
    "&__navigation": {
      top: 8,
      "&--next": {
        right: 8,
      },
      "&:hover": {
        "*::before": {
          borderColor: theme.palette.primary.blue,
        },
      },
    },
    "&__navigation-icon": {
      "&::before": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&__day-name, &__day, &__time-name": {
      fontSize: "1.5rem",
      lineHeight: 1.5,
      margin: "0.31em",
    },
    "&__day, __month, __quarter, __year": {
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.blue,
        color: theme.palette.primary.white,
      },
      "&--keyboard-selected": {
        color: theme.palette.primary.white,
        backgroundColor: theme.palette.primary.tertiaryBlue,
      },
    },
    "&__triangle": {
      display: "none",
    },
    "&__calendar-icon": {
      width: 24,
      height: 24,
      right: 16,
      top: 16 / 2,
      pointerEvents: "auto",
      "&:hover": {
        cursor: "pointer",
        pointerEvents: "auto",
      },
    },
    "&-wrapper": {
      width: "100%",
    },
    "&-popper": {
      transform: "translate3d(0px, 0px, 0px)",
    },
  },
}));

export const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  height: 56,
  padding: 16,
  borderRadius: 50,
  backgroundColor: `${theme.palette.primary.white}`,
  outline: `none`,
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    color: `${theme.palette.primary.main}`,
    fontWeight: 600,
    fontFamily: "Open Sans",
    fontSize: 16,
    lineHeight: "150%" /* 24px */,
    outline: "none",
    border: "none",
    // "&:-webkit-autofill": {
    //   WebkitBackgroundClip: "text",
    //   WebkitTextFillColor: theme.palette.primary.main,
    // },
    // "&:-webkit-autofill:focus": {
    //   WebkitBackgroundClip: "text",
    //   WebkitTextFillColor: theme.palette.primary.main,
    // },
    // [theme.breakpoints.up("sm")]: {
    //   fontSize: 18,
    // },
  },

  "& fieldset.MuiOutlinedInput-notchedOutline": {
    outline: "none",
    border: "none",
  },
  [theme.breakpoints.up("sm")]: {
    height: 59,
  },
  // [theme.breakpoints.up("lg")]: {
  //   width: "50%",
  // },
}));
export const FormStyled = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  [theme.breakpoints.up("lg")]: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    gap: 15,
  },
  "& .button": {
    margin: "revert",
    marginLeft: "auto",
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
  "& .checkbox": {
    order: null,
  },
}));

export const DatePickerWrapper = styled(DatePicker)(({ theme }) => ({
  width: "100%",
}));
