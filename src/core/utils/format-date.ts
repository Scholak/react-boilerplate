import dayjs from 'dayjs'

export function formatDate(date: string, format: string = 'D MMMM YYYY'): string {
  return dayjs(date).format(format)
}
