import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';
import './style.css';

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {

    let bookCategories = [];
    for (let category of categories) {
      bookCategories.push(
        <li key={category.name}>
          {
            <a href={`/${category.slug}?cid=${category._id}&type='page'`}> 
              {category.name}
            </a> 
          }
        </li>
      );
    }

    return bookCategories;

  }
  
  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null }
      </ul>
    </div>
  )

}

export default MenuHeader