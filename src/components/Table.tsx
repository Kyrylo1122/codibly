import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";

import { IProduct } from "../types";
import { TablePagination } from "@mui/material";
import { changePage, changeId } from "../features/search/searchSlice";
import { useSearchParams } from "react-router-dom";

interface IBasicTable {
  rows: IProduct[];
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

  const handleChangePage = (_: unknown, page: number) => {
    dispatch(changePage(String(page + 1)));
  };
  const handleChangeId = (id: number | null) => {
    searchParams.set("id", String(id));
    setSearchParams(searchParams);

    dispatch(changeId(id));
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                onClick={() => handleChangeId(row.id)}
                key={row.id}
                sx={{
                  bgcolor: row.color,
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>

                <TableCell align="center">{row.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        rowsPerPageOptions={[rowsPerPage]}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
