import React from 'react'
import { TableRow, TableHead, TableCell, Typography } from '@material-ui/core'

function TableHeader (props) {
  return (
    <TableHead style={{backgroundColor: '', height: 70, width: '100%'}}>
      <TableRow style={{width: '100%'}}>
        <TableCell ><Typography variant='h6' style={{color: 'white'}}>Найдено дикторов: </Typography> </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeader