import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ADD, DLT, REMOVE } from '../redux/actions/actions';


const CardsDetails = () => {
    const [data,setData] = useState([]);
    console.log(data)
  const {id}=useParams();
  const history = useNavigate();

  const dispatch = useDispatch();
  const getData = useSelector((state) => {
    return state.cartReducer.carts;


})
const compare=()=>{
  let compareData = getData.filter((e)=>{
    return e.id == id
})  ;
setData(compareData);
}

const send = (e)=>{
  // console.log(e);
  dispatch(ADD(e));
}


const dlt = (id)=>{
  dispatch(DLT(id));
  history("/")

 
}

const remove = (item)=>{
  dispatch(REMOVE(item))
}


// console.log(compareData);
  
   useEffect(()=>{
    compare();
   },[id])
  return (
   <>
    <div className="container mt-2">
        <h2 className='text-center'>Items Details Page</h2>
        <section className="container mt-3">
        <div className="iteamsdetails">
        {
          data.map((ele)=>{
            return(
              <>
              <div className="items_img">
              <img src={ele.imgdata} alt="" />
            </div>
            <div className="details">
            <Table>
                <tr>
                <td>
                    <p> <strong>{ele.rname}</strong>  : </p>
                    <p> <strong>{ele.price}</strong>  : </p>
                    <p> <strong>Dishes : {ele.address}</strong>  :</p>
                    <p> <strong>Total: {ele.price * ele.qnty}</strong></p>
                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={ele.qnty < 1 ? dlt(ele.id): ()=>remove(ele)} >-</span>
                    <span style={{fontSize:22}}>{ele.qnty}</span> 
                    <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>

                    </div>

                  </td>
                  <td>
                    <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}> {ele.rating}★	</span></p>
                    <p><strong>Order Review : {ele.somedata}</strong> <span >	</span></p>
                    <p><strong>Remove :</strong> <span ><i className='fas fa-trash'  style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(ele.id)}></i>	</span></p>
                  </td>
                </tr>
            </Table>

            </div>
            

              </>
            )
          })
        }
          
            
                
            </div>

        </section>
    </div>
   </>
  )
}

export default CardsDetails