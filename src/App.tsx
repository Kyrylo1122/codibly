import { Box, Modal } from "@mui/material";
import Search from "./components/Search";
import { useGetProductsQuery } from "./libs/rtk-query";
import BasicTable from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./types";
import ProductInfo from "./components/ProductInfo";
import { changeProductInfoId } from "./features/search/searchSlice";

function App() {
  const dispatch = useDispatch();

  const query = useSelector((state: RootState) => state.search);
  const { data: allProducts } = useGetProductsQuery({
    page: query.page,
    per_page: query.per_page,
    id: query.id,
  });
  const handleModalClose = () => {
    dispatch(changeProductInfoId(null));
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
      {query.productInfoId ? (
        <Modal
          open={Boolean(query.productInfoId)}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <ProductInfo id={query.productInfoId} />
          </>
        </Modal>
      ) : null}
    </Box>
  );
}

export default App;
