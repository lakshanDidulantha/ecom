import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
    <>
        {  
            result < page * 9 ? "" 
            :
            <button className="btn btn-outline-info d-block mx-auto mb-4" onClick={() => setPage(page+1)}>
                Load more
            </button>
        }
    </>
    )
}

export default LoadMore
