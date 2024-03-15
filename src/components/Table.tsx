import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRowMUI from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";

import { IProduct } from "src/types";
import { TablePagination } from "@mui/material";
import { changePage } from "src/features/search/searchSlice";
import TableRow from "./TableRow";
import { useSearchParams } from "react-router-dom";

interface IBasicTable {
  rows: IProduct | IProduct[];
  rowsPerPage: number;
  page: number;
  total: number;
}

export default function BasicTable({
  rows,
  rowsPerPage,
  page,
  total,
}: IBasicTable) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isArray = Array.isArray(rows);

  const handleChangePage = (_: unknown, page: number) => {
    const currentPage = page + 1;

    if (page > 0) searchParams.set("page", currentPage.toString());
    else searchParams.delete("page");
    setSearchParams(searchParams);
    dispatch(changePage(currentPage));
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRowMUI>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Year</TableCell>
            </TableRowMUI>
          </TableHead>
          <TableBody>
            {isArray ? (
              rows.map((row) => <TableRow key={row.id} {...row} />)
            ) : (
              <TableRow {...rows} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isArray ? (
        <TablePagination
          component="div"
          count={total}
          rowsPerPageOptions={[rowsPerPage]}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
        />
      ) : null}
    </Paper>
  );
}
