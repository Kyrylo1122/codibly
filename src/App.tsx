import { Box } from "@mui/material";
import Search from "./components/Search";
import { useGetProductsQuery } from "./libs/rtk-query";
import BasicTable from "./components/Table";
import { useSelector } from "react-redux";
import { RootState } from "./types";

function App() {
  const query = useSelector((state: RootState) => state.search);

  const { data: allProducts } = useGetProductsQuery({ page: query.page });
  if (!allProducts) return;
  const { data: rows, per_page, page, total } = allProducts;
  return (
    <Box sx={{ w: "100vw" }}>
      <Search />
      <BasicTable
        rows={rows}
        rowsPerPage={per_page}
        page={page}
        total={total}
      />
    </Box>
  );
}

export default App;
