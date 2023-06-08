import React from 'react'
import { useContext } from 'react'
import DataContext from "../context/DataContext"; 
import PostItem from './PostItem';

export default function Home() {

  const {postsList,searchText} = useContext(DataContext)
  
  let searchList = postsList.filter((i) => {
    return ((i.title.toLowerCase()).includes(searchText.toLowerCase())) || 
    ((i.desc.toLowerCase()).includes(searchText.toLowerCase()))
  })

  return (
    <section className='Home'>
      {
        postsList.length===0 ?
        "No posts to display":
        searchList.map((i) => {
          return <PostItem key={i.id} {...i}/>
        })
      }
    </section>
  )
}
