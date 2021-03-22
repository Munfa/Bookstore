import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import AddCategoryModal from './component/AddCategoryModal';
import UpdateCategoriesModal from './component/UpdateCategoryModal';
import './style.css';
import Modal from '../../components/UI/Modal';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxGroup from 'react-checkbox-group';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosAdd, IoIosTrash, IoIosClipboard } from "react-icons/io";


/**
* @author
* @function Category
**/

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (category.loading) {
            setShow(false);
        }
    }, [category.loading]);

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleClose = () => {

        const form = new FormData();

        if (categoryName === "") {
            alert("Category name is required!");
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('');

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let bookCategories = [];
            for (let category of categories) {
                bookCategories.push(
                    <li key={category.name} >
                        <Checkbox /> {category.name}
                    </li>
                );
            }
        
        return bookCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            });
        }

        return options;
    }

    const categoryList = createCategoryList(category.categories);


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        }
    }

    const checkedCategory = () => {
        const checkedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categoryList.find((category, index) => categoryId == category.value);
            category && checkedArray.push(category);
        })

        setCheckedArray(checkedArray);
    }

    const updateCategory = () => {
        checkedCategory();
        setUpdateCategoryModal(true);
    }

    const deleteCategory = (id) => {
        checkedCategory();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const idArray = checkedArray.map((item, index) => ({ _id: item.value }));

        if (idArray.length > 0) {
            dispatch(deleteCategoriesAction(idArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                        setDeleteCategoryModal(false);
                    }
                });
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        checkedArray.foreach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
        });

        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory());
                }
            })

        }

    const renderDeleteCategoryModal = () => {

        return (
            <Modal
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                modalTitle={'Confirm'}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('No');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Are You Sure?</h5>
                <h3>Checked</h3>
                { checkedArray.map((item, index) => <span key={index}> {item.name} </span>)}
            </Modal>
        );
    }


    return (
        
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button 
                                    variant="dark" 
                                    className="btn-md" 
                                    onClick={handleShow}
                                >
                                    <IoIosAdd /><span>Add</span>
                                </button>
                                <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosClipboard /> <span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                        
                    </Col>
                </Row>
            </Container>

            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />

            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />

            {renderDeleteCategoryModal()}

        </Layout>
    )

}

export default Category