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
import { changePage } from "../features/search/searchSlice";

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

  const handleChangePage = (_: unknown, page: number) => {
    dispatch(changePage(String(page + 1)));
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Pantone value</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  bgcolor: row.color,
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.pantone_value}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
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
