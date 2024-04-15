import { useState , useCallback} from "react";

export const useUserData = () => {
    const userData = useState(null);
    const [error, setError] = useState(null); 

    const fetchUserData = useCallback(async(URL, method = 'GET', body = null , header = {}) => {
        try {
            const userDataResponse = await fetch(URL, {method, body , header});
            const contentType =  userDataResponse.header.get('content-type');

            if(contentType || !contentType.includes('application/json')) {
                throw new Error ('Invalid server response');
            }

            const data = userDataResponse.json();

            if(!userDataResponse.ok){
                throw new Error (data.message || 'Something go wrong');
            }

            return data;
        } catch (e) {
            setError(e.message);
        }
    })
    return [fetchUserData, error];
}