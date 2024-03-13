import { Box } from "@mui/material";
import Search from "./components/Search";
import { useGetProductsQuery } from "./libs/rtk-query";
import BasicTable from "./components/Table";

function App() {
  const { data: allProducts } = useGetProductsQuery({ page: 2 });
  console.log("allProducts: ", allProducts);
  if (!allProducts) return <></>;
  const { data: rows } = allProducts;
  return (
    <Box sx={{ w: "100vw" }}>
      <Search />
      <BasicTable rows={rows} />
    </Box>
  );
}

export default App;
