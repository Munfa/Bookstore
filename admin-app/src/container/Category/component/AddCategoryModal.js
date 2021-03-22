import React from 'react';
import Input from "../../../components/UI";
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props;

    return (            
        <Modal 
            show={show} 
            handleClose={handleClose} 
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                        categoryList={categoryList}
                        className="form-control-sm"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
                
        </Modal>
    );
}

export default AddCategoryModal;