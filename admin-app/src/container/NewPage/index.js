import React, { useState, useEffect } from 'react';
import Input from "../../components/UI";
import Modal from '../../components/UI/Modal';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import linearCategories from '../../helpers/linearCategories';
import { createPage } from "../../actions";

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {

        if(title == ""){
            alert('Title is required!');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form));
        setCreateModal(false);
    }

    const handleClose = () => {
        setCreateModal(false);
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                handleClose={handleClose}
                modalTitle={'Create New Page'}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option>Select Category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>)
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className=" form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Description'}
                                className=" form-control-sm"
                            />
                        </Col>
                    </Row>

                    {
                        banners.length > 0 ? banners.map((banner, index) =>
                            <Row key={index}>
                                <Col>{banner.name}</Col>
                            </Row>
                        ) : null
                    }

                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    {
                        products.length > 0 ? products.map((product, index) =>
                            <Row key={index}>
                                <Col>{product.name}</Col>
                            </Row>
                        ) : null
                    }

                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ? 
                <p>Creating Page! Please Wait....</p>
                :
                <>
                    {renderCreatePageModal()}
                    <button 
                        onClick={() => setCreateModal(true)} 
                        className="btn btn-primary btn-lg" 
                        style={{ margin: '2rem 25rem'}}
                    >
                        Create Page
                    </button>
                </>
            }
        </Layout>
    )

}

export default NewPage