/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })

    useEffect(() => {
        const getCategories = async () => {
            const res = await axiosInstance.get('/api/category')
            setCategories(res.data)
        }

        getCategories()
    }, [callback]);
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
