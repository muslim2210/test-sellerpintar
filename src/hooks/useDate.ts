import { format } from 'date-fns'

export const formatedDate = (date: string) => format(new Date(date), 'MMMM d, yyyy')
