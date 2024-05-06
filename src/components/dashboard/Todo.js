import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { getTodoList as getTodoListApi } from "../../helper/apiHelper";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Todo() {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    const data = await getTodoListApi();
    if (!data){
      return;
    }
    setTodoList(data.todoList);
  }

  useEffect(() => {
    getTodoList()
  }, []);

  return (
    <React.Fragment>
      <Title>Things to do</Title>
      <Table size="small">
        <TableBody>
          {todoList.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Checkbox {...label}/></TableCell>
              <TableCell>
                <b>{row.title}</b>
                <br/>
                <Typography variant="caption" color="gray" gutterBottom>
                    {row.content}
                </Typography>
              </TableCell>
                <TableCell>
                    {row.date}
                    <br/>
                    <Link color="primary" underline='none' href="#">
                        {`Start >` || row.action}
                    </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}