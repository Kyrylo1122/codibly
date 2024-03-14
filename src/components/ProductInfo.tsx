import { useSelector } from "react-redux";
import { RootState } from "../types";
import { useGetProductByIdQuery } from "../libs/rtk-query";
import { Paper, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ProductInfo = () => {
  const state = useSelector((state: RootState) => state.search);
  const { data } = useGetProductByIdQuery(state.id, {
    skip: !state.id,
  });

  if (!data) return;
  const { data: product } = data;
  return (
    <Paper sx={{ ...style, bgcolor: product.color, minHeight: "300px" }}>
      <Typography variant="h2">Product Info</Typography>
      <Typography variant="body1">Id:{product.id} </Typography>
      <Typography variant="body1">
        Pantone value:{product.pantone_value}
      </Typography>
      <Typography variant="body1">Color:{product.color} </Typography>
      <Typography variant="body1">Name:{product.name} </Typography>
      <Typography variant="body1">Year:{product.year} </Typography>
    </Paper>
  );
};

export default ProductInfo;
