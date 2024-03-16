import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { changeId } from "src/features/search/searchSlice";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch } from "src/app/hooks/reduxHooks";

const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Search() {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.target.value;
    if (!id) searchParams.delete("id");
    else searchParams.set("id", id);
    setSearchParams(searchParams);

    dispatch(changeId(id));
  };
  const debouncedHandleChange = useDebouncedCallback(onHandleChange, 500);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        position="static"
      >
        <Toolbar>
          <SearchInput>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              defaultValue={searchParams.get("id")}
              type="number"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={debouncedHandleChange}
            />
          </SearchInput>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
