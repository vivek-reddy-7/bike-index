import { BikeData, BikeApiResponse, CountApiResponse } from '../Home'

async function fetchBikes (page: number, query: string): Promise<BikeData[] | undefined> {
  try {
    const res = await fetch(`https://bikeindex.org/api/v3/search?page=${page}&per_page=10&location=Sydney&distance=20&stolenness=proximity&query=${query}`)
    if (res.ok) {
      const data = await res.json() as BikeApiResponse
      return data.bikes
    }
  } catch (err) {
    console.log(err)
    alert('Something went wrong.')
  }
}

async function fetchCount (query: string): Promise<number | undefined> {
  try {
    const res = await fetch(`https://bikeindex.org/api/v3/search/count?location=Sydney&distance=20&stolenness=stolen&query=${query}`)
    if (res.ok) {
      const data = await res.json() as CountApiResponse
      return data.proximity
    }
  } catch (error) {
    console.log(error)
    alert('Something went wrong.')
  }
}

export { fetchBikes, fetchCount }
