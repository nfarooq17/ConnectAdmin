import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function NewsDetailTable({data}) {
  const classes = useStyles();
  function getTie(a) {
    let date = new Date(a.seconds * 1000)
    return date.toDateString()
  }
  return (
    <React.Fragment>
      <Title>News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{getTie(row.data.time)}</TableCell>
              <TableCell>{row.data.description}</TableCell>
              <TableCell>{row.data.name}</TableCell>
             <Link style={{cursor:'pointer', color:'blue'}} href={`/NewsDetailTable/${row.id}`}> <TableCell>{row.id}</TableCell></Link>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
  
    </React.Fragment>
  );
}
