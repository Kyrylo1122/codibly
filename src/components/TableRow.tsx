import { TableCell } from "@mui/material";
import TableRowMUI from "@mui/material/TableRow";

import { IProduct } from "src/types";

type TableRowType = { handleClick: () => void } & IProduct;
const TableRow = ({ id, color, name, year, handleClick }: TableRowType) => (
  <TableRowMUI
    onClick={handleClick}
    key={id}
    sx={{
      bgcolor: color,
      "&:last-child td, &:last-child th": { border: 0 },
    }}
  >
    <TableCell align="center">{id}</TableCell>
    <TableCell align="center">{name}</TableCell>

    <TableCell align="center">{year}</TableCell>
  </TableRowMUI>
);

export default TableRow;
