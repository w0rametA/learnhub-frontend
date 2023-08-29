import { useEffect, useState } from 'react'
import { ContentListHook } from '../types/contentList.hook'
import { ContentDto } from '../types/dto'

const useContentList = (): ContentListHook => {
  const [data, setData] = useState<ContentDto[] | null>(null)
  const [error, setError] = useState<null | unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const host = 'https://api.learnhub.thanayut.in.th/content'
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(host)
        const result: { data: ContentDto[] } = await res.json()
        // const data: ContentDto[] = result.data

        setData(result.data)
        console.log(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  }
}

export default useContentList
