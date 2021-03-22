import React from 'react';
import Input from "../../../components/UI";
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;

    return (
        <Modal 
            show={show} 
            handleClose={handleClose} 
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}
            categoryList={categoryList}
        >
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>

            {
                checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('namee', e.target.value, index, 'checked')}
                            />
                        </Col>
                    </Row>
                    )
            }

        </Modal>
    );
}

export default UpdateCategoriesModal;