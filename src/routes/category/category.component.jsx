import { useContext, useEffect,useState } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams()
    const { CategoriesMap } = useContext(CategoriesContext);
    const [products, setProducts ] = useState(CategoriesMap[category]);

    debugger
    useEffect(() => {
        setProducts(CategoriesMap[category]);
    }, [category,CategoriesMap])

    return(
        <div className='category-container'>
            {
                products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )

}

export default Category;