import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { NavLink,useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch =useDispatch();
    const addProduct=(product) =>{
        dispatch(addCart(product));
    }

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProducts();
    }, []);

    const Loading = ()=>{
        return(
            <> 
                <div className="col-md-6">
                    <Skeleton height={450}/>
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={300} />
                    
                    
                    
                   
                </div>
            </>
        )
    }
    const ShowProduct= () =>{
        return(
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="450px" width="450px" />
                    </div>
                    <div className="col-md-6">
                         <h4 className="text-uppercase text-black-50">{product.category}</h4>
                         <h1 className='display-5'>{product.title}</h1>
                         <p className="lead">Rating {product.rating && product.rating.rate} <i className="fa fa-star"></i></p>
                         <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                         <p className="lead">{product.description}</p>
                         <button className="btn btn-outline-dark px-4 py-2" onClick={()=>addProduct(product)} >Add to cart</button>
                         <NavLink to="/cart" className="btn btn-outline-danger mx-2 px-4 py-2">Go to cart</NavLink>
                    </div> 
            </>
        )
        
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-5">
                    {loading ? <Loading/>:<ShowProduct/>}
                </div>
            </div>
        </div>
    );
}

export default Product;
