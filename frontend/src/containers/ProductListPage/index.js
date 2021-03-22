import React from 'react';
import Layout from '../../components/Layout';
import getParams from '../../utils/getParams';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import './style.css';

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

    const renderProduct = () => {
        console.log(props);
        const params = getParams(props.location.search);
        // let contentStore = <ProductStore {...props} />
        let contentPage = <ProductPage {...props} />

        return contentPage;
    }

    
  return(
    <Layout>
        {renderProduct()}
    </Layout>
   )

 }

export default ProductListPage