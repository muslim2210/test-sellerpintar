import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

const LoadingTableCategory = () => {
  return (
    <TableRow>
      <TableCell className='pl-5'>
        <Skeleton className="h-5 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-full" />
      </TableCell>
      <TableCell className="pr-5">
        <Skeleton className="h-5 w-full" />
      </TableCell>
    </TableRow>
  )
}

export default LoadingTableCategory
