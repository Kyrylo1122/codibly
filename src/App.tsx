import { Box, Modal } from "@mui/material";
import Search from "./components/Search";
import { useGetProductsQuery } from "./libs/rtk-query";
import BasicTable from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./types";
import ProductInfo from "./components/ProductInfo";
import { changeId } from "./features/search/searchSlice";
import { useSearchParams } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const query = useSelector((state: RootState) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: allProducts } = useGetProductsQuery({
    page: query.page,
    per_page: query.per_page,
  });
  const handleModalClose = () => {
    searchParams.delete("id");
    setSearchParams(searchParams);
    dispatch(changeId(null));
  };
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
      <Modal
        open={Boolean(query.id)}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProductInfo />
      </Modal>
    </Box>
  );
}

export default App;
