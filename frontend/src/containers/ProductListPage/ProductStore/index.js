import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import './style.css';

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Link 
                    to={`/${product.slug}/${product._id}/p`} 
                    style={{ display: 'block'}} 
                    className="productContainer"
                >
                    <div className="procutImgContainer">
                        <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                    </div>
                    <div className="productInfo">
                        <div style={{ margin: '5px 0' }}>{product.name}</div>
                        <div>
                            <span>rating</span>&nbsp;
                        <span>rating numbers</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                    </div>
                </Link>
            </div>
        </>
    )

}

export default ProductStore