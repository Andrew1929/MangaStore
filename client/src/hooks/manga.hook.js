import {useState, useCallback} from 'react'

export const useManga = () => {
    const [error, setError] = useState(null)
    const fetchData = useCallback(async(URL, method = 'GET', body = null, headers = {}) => {
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const mangaResponse = await fetch(URL,{method,body,headers})
            const contentType = mangaResponse.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid server response');
            }
            const data = await mangaResponse.json()
            if(!mangaResponse.ok){
                throw new Error(data.message || 'Something go wrong')
            }
            return data
        } catch (e) {
            setError(e.message)
            console.log(e)
        }
    },[])
    return {fetchData,error}
}