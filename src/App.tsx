import { Box, Modal } from "@mui/material";
import Search from "src/components/Search";
import { useGetProductsQuery } from "src/libs/rtk-query";
import BasicTable from "src/components/Table";
import { RootState } from "src/types";
import ProductInfo from "src/components/ProductInfo";
import {
  changeId,
  changePage,
  changeProductInfoId,
} from "src/features/search/searchSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "src/components/ErrorPage";
import { useAppDispatch, useAppSelector } from "src/app/hooks/reduxHooks";

function App() {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(changePage(Number(searchParams.get("page")) || 1));
    dispatch(changeId(searchParams.get("id")));
  }, []);

  const query = useAppSelector((state: RootState) => state.search);
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
