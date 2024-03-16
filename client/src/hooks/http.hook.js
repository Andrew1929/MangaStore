import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const request = useCallback(async(URL, method = 'GET', body = null, headers={} ) => {
    setLoading(true)
    try {
      if(body){
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(URL,{method,body,headers})
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something go wrong')
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])
  return { loading, request, error }
}