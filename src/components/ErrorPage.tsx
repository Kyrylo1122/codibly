import { Box, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ErrorPage({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const handleReturn = () => {
    searchParams.delete("id");

    setSearchParams(searchParams);
    navigate(0);
  };

  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = `STATUS: ${error.status} ${
      "error" in error ? error.error : JSON.stringify(error.data)
    }`;
    return (
      <Box>
        <Typography variant="body1" color="blue" onClick={handleReturn}>
          Return
        </Typography>
        <Typography>An error has occurred:</Typography>
        <Typography>{errMsg}</Typography>
      </Box>
    );
  } else {
    return (
      <>
        {" "}
        <Typography variant="body1" color="blue" onClick={handleReturn}>
          Return
        </Typography>
        <Typography>{error.message}</Typography>
      </>
    );
  }
}
