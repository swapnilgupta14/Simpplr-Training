import React, { lazy, Suspense, useEffect, useState } from 'react'
const CardDetails = lazy(() => import ("card-remote/CardDetails"))

const FoodList = () => {
    const [detailItems, setDetailItems] = useState([])
    const [shortItems, setShortItems] = useState([])

    useEffect(()=>{
        fetch(`https://dummyjson.com/recipes?limit=5&select=id,name,image,cuisine,rating`)
            .then(response => response.json())
            .then(data => setDetailItems(data.recipes))
    },[])

    useEffect(()=>{
        fetch(`https://dummyjson.com/recipes?limit=5&select=id,name,image`)
            .then(response => response.json())
            .then(data => setShortItems(data.recipes))
    },[])

  return (
    <React.Fragment>
        <div className='detail-list-container'>
            <Suspense fallback={<p>Loading...</p>}>
                {detailItems.length && detailItems.map((item) => {
                    return <CardDetails key={item.id} data={item}></CardDetails>
                })}
            </Suspense>
        </div>
    </React.Fragment>
  )
}

export default FoodList