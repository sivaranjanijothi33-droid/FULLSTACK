
const Child = (props) => {
  return (
    <div>
        <h1>name : {props.name}</h1>
        <p>age : {props.age}</p>
        <p>Active : {props.isActive?"online":"offline"}</p>
        {props.mark.map((val,index)=>(
          <p key={index}>mark {index+1} : {val}</p>
        ))}
        <h4>Address</h4>
        <p>Email : {props.address.email}</p>
        <p>mobile No : {props.address.mobile}</p>
        <p>Pincode : {props.address.pincode}</p>
    </div>
  )
}

export default Child