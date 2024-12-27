import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const backendUrl = "https://distributed-system-backend.onrender.com"

export const useDiemQuanTracList = () => {
    return useQuery({
        queryKey: ['diemQuanTracList'],
        queryFn: async () => {
            const data = await (axios.get(backendUrl + '/api/v1/location')).then(res => res.data);
            return data.reduce((obj: any, cur: any) => ({ ...obj, [cur.location]: cur.place }), {})
        }
    })
}

export const useDiemQuanTrac = (id: number) => {
    return useQuery({
        queryKey: ['diemQuanTracList', id],
        queryFn: async () => {
            const data = await (axios.get(backendUrl + '/api/v1/place/' + id)).then(res => res.data)
            return data
        }
    })
}

// export const useDiemQuanTracList = () => {
//     return useQuery({
//         queryKey: ['diemQuanTracList'],
//         queryFn: async () => await (axios.get(backendUrl + '')).then(res => res.data)
//     })
// } 