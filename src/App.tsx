import { Box, Modal } from "@mui/material";
import Search from "./components/Search";
import { useGetProductsQuery } from "./libs/rtk-query";
import BasicTable from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./types";
import ProductInfo from "./components/ProductInfo";
import {
  changeId,
  changePage,
  changeProductInfoId,
} from "./features/search/searchSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

function App() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(changePage(Number(searchParams.get("page")) || 1));
    dispatch(changeId(searchParams.get("id")));
  }, []);

  const query = useSelector((state: RootState) => state.search);
  const params = query.id
    ? { id: query.id }
    : { page: query.page, per_page: query.per_page };

  const { data: allProducts, error, isLoading } = useGetProductsQuery(params);
  const handleModalClose = () => {
    dispatch(changeProductInfoId(null));
  };
  if (isLoading) return <>Loading...</>;
  if (error) return <ErrorPage error={error} />;

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
