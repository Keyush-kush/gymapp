import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'
function Header(props){
  const {index,title,description}=props
  return(
    <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
                <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
  )
}

function Generator(props) {
  const {muscles,setMuscles,poison,setPoison,setGoal,goal,updateWorkout}=props

  const [showModal,setShowModal]=useState(false)



  

  function toggleModal(){
    setShowModal(!showModal)
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
        setMuscles(muscles.filter(val => val !== muscleGroup))
        return
    }

    if (muscles.length > 2) {
        return
    }

    if (poison !== 'individual') {
        setMuscles([muscleGroup])
        setShowModal(false)
        return
    }

    setMuscles([...muscles, muscleGroup])
    if (muscles.length === 2) {
        setShowModal(false)
    }

}
  return (
    <SectionWrapper header={"generate your workout"} title=
    {['It\'s','Huge','o\'clock']}>
      <Header index={'01'} title={"Pick POSITION"} description={"SELECT to get the blood flowing"}/>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>

    
      {Object.keys(WORKOUTS).map((type,typeIndex)=>{
        return(
          <button onClick={()=>{
            setMuscles([])
            setPoison(type)
          }}className={'bg-slate-950 border  duration-200 px-4 hover:bg-blue-600 py-3 rounded-lg ' + (type === poison ? ' border-blue-600' : ' border-blue-400')} key={typeIndex}>

            <p className='capitalize text-center'>{type.replaceAll('_'," ")}</p>
          </button>
        )
      })}
        </div>
        <Header index={'02'} title={"Lock ON"} description={"SELECT musle group to focus on"}/>
      <div className='bg-slate-950  border border-solid border-blue-400 rounded-lg flex flex-col'>
      <button onClick={toggleModal}
       className='relative flex p-3 items-center justify-center'>
        <p className='capitalize'>{muscles.length == 0? 'Select musle group': muscles.join(' ')}</p>
        <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-sort-down"></i>
      </button>
      {showModal &&(
        <div className='flex flex-col px-3 pb-3 gap-2'>
          {(poison==='individual'? WORKOUTS[poison]:Object.keys(WORKOUTS[poison])).map((muscleGroup,muscleGroupIndex)=>{
            return(
              <button onClick={()=>{
                updateMuscles(muscleGroup)
              }} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                <p className='uppercase'>{muscleGroup.replaceAll("_"," ")}</p>
              </button>
            )
          })
          }
        </div>
        )}
        </div>
        <Header index={'03'} title={"Become sigima"} description={"SELECT Sigima Object"}/>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-3'>

    
      {Object.keys(SCHEMES).map((scheme,schemeIndex)=>{
        return(
          <button onClick={()=>{
            setGoal(scheme)
          }}className={'bg-slate-950 border  duration-200 hover:bg-blue-600 py-3 rounded-lg px-4 ' + (scheme === goal ? ' border-blue-600' : ' border-blue-400')} key={schemeIndex}>
            <p className='capitalize text-center'>{scheme.replaceAll('_'," ")}</p>
          </button>
        )
      })}
        </div>
        <Button func={updateWorkout} text ={"Formulate"}></Button>

    </SectionWrapper>
  )
}

export default Generator