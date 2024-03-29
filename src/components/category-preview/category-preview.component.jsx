import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

const CategoryPreview = ({ title,products }) => {
    console.log("Inside privew --- ")
    return (
        <div className='category-preview-container'>
            <h2>
                <span>{ title.toUpperCase() }</span>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4 ).map((product) => <ProductCard key={product.id}  product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;