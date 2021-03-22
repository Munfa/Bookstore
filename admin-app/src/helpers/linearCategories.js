

const linearCategories = (categories, options = []) => {
        for (let category of categories) {
            options.push({ 
                value: category._id, 
                name: category.name 
            });
        }

        return options;
    }

export default linearCategories;