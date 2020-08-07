import React, { Componen, useState, Fragment, useEffect, useCallback } from "react";
// import { push } from "connected-react-router";
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import actions from '../../store/actions/order'

function Home () {
  const dispatch = useDispatch()
  const history = useHistory()
  const { list } = useSelector(state => state.order)

  function toList () {
    // console.log('click')
    history.push('/list')
  }

  const addList = useCallback(() => {
    dispatch(actions.getList())
    // console.log(state)
  }, [dispatch])

  const List = () => {
      const content = list.map((item, index) => {
         return(<span key={index}>{item.title}</span>)
        })

    return (<div>{content}</div>)
  }

  
  return (
    <>
    <div>Home</div>
    <button type="button" onClick={addList}>跳转</button>
    { list.map((item,index) => {
      return (<div key={index}>{item.title}</div>)
    }) }
    {/* <List /> */}
    </>
  )
}

export default Home