import { usePhishings } from "@/context";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export enum MessageStatus {
  Pending = "7d8be5a0-9c26-49ee-a74f-0268605f126c",
  Sent = "94557c81-c8cf-4e9a-ada9-a4a97ac09e35",
  Error = "06b38a32-2786-469d-9c98-cd1fee8e8880",
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export function Phishing() {
  // Hooks
  const { state, findPhishings: findUsers } = usePhishings();

  useEffect(() => {
    findUsers;
  }, [findUsers]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.phishings.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.createdAt.toString()}
              </TableCell>
              <TableCell>{row.recipient}</TableCell>
              <TableCell>{row.sender}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.body}</TableCell>
              <TableCell>{row.messageType}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
