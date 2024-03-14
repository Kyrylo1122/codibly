import { TableCell } from "@mui/material";
import TableRowMUI from "@mui/material/TableRow";

import { IProduct } from "../types";
import { useDispatch } from "react-redux";
import { changeProductInfoId } from "../features/search/searchSlice";

const TableRow = ({ id, color, name, year }: IProduct) => {
  const dispatch = useDispatch();
  const handleChangeId = (id: number | null) => {
    dispatch(changeProductInfoId(String(id)));
  };
  return (
    <TableRowMUI
      onClick={() => handleChangeId(id)}
      key={id}
      sx={{
        bgcolor: color,
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row" align="center">
        {id}
      </TableCell>
      <TableCell align="center">{name}</TableCell>

      <TableCell align="center">{year}</TableCell>
    </TableRowMUI>
  );
};

export default TableRow;
