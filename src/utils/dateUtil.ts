import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export const DATE_FORMAT_DD_MM_YYYY = 'YYYY-MM-DD'
export const DATE_FORMAT_SLASH_SHOW = 'DD/MM/YYYY'
export const DATE_TIME_FORMAT_SLASH_SHOW = 'HH:mm DD/MM/YYYY'

export const getFirstDayOfWeek = (): string => {
  let now = dayjs()
  if (now.day() === 0) {
    now = now.subtract(1, 'day')
  }
  return getDateFormatted(now.startOf('week').add(1, 'day'))
}

export const getLastDayOfWeek = (): string => {
  let now = dayjs()
  if (now.day() === 0) {
    now = now.subtract(1, 'day')
  }
  return getDateFormatted(now.endOf('week').add(1, 'day'))
}

export const getCurrentDate = (): string => {
  const now = dayjs()
  return getDateFormatted(now)
}

export const getDateFormatted = (date: Dayjs | string): string => {
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  return date.format(DATE_FORMAT_DD_MM_YYYY)
}

export const getDateFromDate = (date: Date, format: string): string => {
  const newDate = dayjs(date)
  return newDate.format(format)
}

export const addDaysToDate = (date: Dayjs | string, days: number): string => {
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  return getDateFormatted(date.add(days, 'day'))
}

export const isAfterDate = (date: Dayjs | string, compareDate: Dayjs | string): boolean => {
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  if (typeof compareDate === 'string') {
    compareDate = dayjs(compareDate)
  }
  return date.isAfter(compareDate)
}

// ===================SHOW TO UI===============

export const getDateFormattedShow = (date: Dayjs | string): string => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  return date.format(DATE_FORMAT_SLASH_SHOW)
}

export const formatDateYYYYHHHHH = (date: Dayjs | string | undefined | null) => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  return date.format(DATE_TIME_FORMAT_SLASH_SHOW)
}

export const getFirstDayOfWeekBySpecificDate = (date: Dayjs | string): string => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = dayjs(date)
  }
  if (date.day() === 0) {
    date = date.subtract(1, 'day')
  }
  return getDateFormatted(date.startOf('week').add(1, 'day'))
}

export const formatDateVietnamese = (date: string | undefined | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTimeAgo = (date: string | undefined | null) => {
  if (!date) return ''
  const now = dayjs()
  const formattedDate = dayjs(date)
  const diffInSeconds = now.diff(formattedDate, 'second') // Difference in seconds
  const diffInMinutes = now.diff(formattedDate, 'minute') // Difference in minutes
  const diffInHours = now.diff(formattedDate, 'hour') // Difference in hours
  const diffInDays = now.diff(formattedDate, 'day') // Difference in days
  const diffInMonths = now.diff(formattedDate, 'month') // Difference in months
  const diffInYears = now.diff(formattedDate, 'year') // Difference in years
  if (diffInSeconds < 60) {
    return `${diffInSeconds} giây trước`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`
  } else if (diffInDays < 30) {
    return `${diffInDays} ngày trước`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`
  } else {
    return `${diffInYears} năm trước`
  }
}

export const formatDateWithoutHHmm = (date: string | undefined | null) => {
  if (!date) return ''
  const newDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(newDate)
  const parts = formattedDate.split('/')
  const datePart = parts[0].split('/')
  const monthPart = parts[1].split('/')
  const formattedDateString = `${datePart[2]}-${monthPart[0]}-${monthPart[1]}`
  return formattedDateString
}

export const formatDate = (date: string | undefined | null) => {
  if (!date) return ''
  const newDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(newDate)
  const parts = formattedDate.split(', ')
  const datePart = parts[0].split('/')
  const timePart = parts[1].split(':')
  const formattedDateString = `${datePart[2]}-${datePart[0]}-${datePart[1]}T${timePart[0]}:${timePart[1]}`
  return formattedDateString
}

export function getDateTimeFormatted(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
