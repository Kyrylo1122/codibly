import { useGetProductByIdQuery } from "src/libs/rtk-query";
import { Box, Typography } from "@mui/material";
import ErrorPage from "./ErrorPage";

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

const ProductInfo = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  if (isLoading) return <>Loading...</>;
  if (error) return <ErrorPage error={error} />;
  if (!data) return;
  const { data: product } = data;
  return (
    <Box sx={{ ...style, bgcolor: product.color, minHeight: "300px" }}>
      <Typography variant="h2">Product Info</Typography>
      <Typography variant="body1">Id:{product.id} </Typography>
      <Typography variant="body1">
        Pantone value:{product.pantone_value}
      </Typography>
      <Typography variant="body1">Color:{product.color} </Typography>
      <Typography variant="body1">Name:{product.name} </Typography>
      <Typography variant="body1">Year:{product.year} </Typography>
    </Box>
  );
};

export default ProductInfo;
