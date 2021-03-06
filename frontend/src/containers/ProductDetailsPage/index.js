import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout';

/**
* @author
* @function ProductDetailsPage
**/

const ProductDetailsPage = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {

    const { productId } = props.match.params;

    const payload = {
      params: {
        productId
      }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  return(
    <Layout>
      <div>{product.productDetails.name}</div>
    </Layout>
   )

 }

export default ProductDetailsPage;