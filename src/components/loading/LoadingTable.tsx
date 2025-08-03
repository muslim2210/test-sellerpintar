import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

const LoadingTable = () => {
  return (
    <TableRow>
      <TableCell className="font-medium flex justify-center">
        <Skeleton className="h-12 w-12 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-full" />
      </TableCell>
      <TableCell>
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

export default LoadingTable
