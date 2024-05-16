export function constructQueryParams(searchParams: any): {
  [key: string]: string;
} {
  return {
    destination: searchParams.destination,
    checkInDate: formatDate(searchParams.checkInDate),
    checkOutDate: formatDate(searchParams.checkOutDate),
    adultsCount: searchParams.adultsCount.toString(),
    childrenCount: searchParams.childrenCount.toString(),
    roomsCount: searchParams.roomsCount.toString(),
    isCancellationFree: searchParams.isCancellationFree.toString(),
    isFourStars: searchParams.isFourStars.toString(),
    isThreeStars: searchParams.isThreeStars.toString(),
  };
}

function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}
