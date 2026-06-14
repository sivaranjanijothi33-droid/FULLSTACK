import React from 'react'
import Child from './Child'

const Parent = () => {
  return (
    <div>
      <Child name="isha"
      age={25}
      isActive={true}
      mark={[99,98,97,96,95]}
      address={{
        pincode:641687,
        email:"sivaranjanijothi@gmail.com",
        mobile:9123512533
      }} />
      <child name="ishan"
      age={25}
      isActive={true}
      mark={[99,98,97,96,95]}
      address={{
        pincode:641687,
        email:"shakthi1224@gmail.com",
        mobile:8122814121
      }} /> 

      </div>
  )
}
     
      

export default Parent