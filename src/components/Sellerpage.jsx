import React,{useState,useEffect} from 'react'
import './Sellerpage.css'

const Sellerpage = () => {

  const [productId, setProductId] = useState(0);
  const[price,setPrice] = useState(0);
  const[productName,setProductName] = useState('');
  const [category,setCategory] = useState('');

  const idInput = event=>{
    
    setProductId(event.target.value);
  }
  const priceInput = event=>{
    
    setPrice(event.target.value);
  }
  const productNameInput = event=>{
    
    setProductName(event.target.value);
  }

  const categeoryInput = event=>{
    setCategory(event.target.value);
  }


useEffect(()=>{
  getProductsList();
},[])
  

const addProduct = (e)=>{
  e.preventDefault();
  if(productId>0 && price>0 && productName.trim().length>0 && category.trim().length>0){
    const obj={
      productId,
      price,
      productName,
      category
    }
    let product =   JSON.parse(localStorage.getItem('products')) || [];
    product.push(obj)
    let productList = localStorage.setItem('products',JSON.stringify(product));
    getProductsList();
  }
  else{
    alert('please fill all the fields')
  }
}

const getProductsList = ()=>{
  let product =   JSON.parse(localStorage.getItem('products')) || [];

  let foodList = document.querySelector('.food-list');
  let electronicList = document.querySelector('.electronic-list');
  let skinList = document.querySelector('.skin-list');
  foodList.innerHTML='';
  skinList.innerHTML='';
  electronicList.innerHTML='';
 


  product.forEach((prod,index)=>{
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    let listItem = document.createElement('li')
    listItem.textContent=`${prod.productName}- ${prod.price} - ${prod.category} `


    deleteButton.addEventListener('click', () => {
      deleteProduct(index); 
    });

   
    listItem.appendChild(deleteButton);
    if(prod.category==='skincare'){
      skinList.appendChild(listItem);
    }
    else if(prod.category=='food'){
      foodList.appendChild(listItem);

    }
    else{
      electronicList.appendChild(listItem)
    }
    
  })

}

const deleteProduct = (index) => {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  
  if (index >= 0 && index < products.length) {
    products.splice(index, 1); 
    localStorage.setItem('products', JSON.stringify(products));
    getProductsList(); 
  }
};


  
  return (
    <div className="seller-container">
      <form className='form' onSubmit={addProduct}>
        <div className="product-id" onChange={idInput}>
          <label>Product ID</label>
          <input type='number'/>
        </div>
        <div className="selling-price">
          <label>Selling Price</label>
          <input type='number' onChange={priceInput}/>
        </div>
        <div className="product-name">
          <label>Product Name</label>
          <input type='text' onChange={productNameInput}/>
        </div>
        <div className="category">
          <label>Choose a Category</label>
          <select onChange={categeoryInput}>
            <option value='electronics'>Electoronics</option>
            <option value='food'>Food</option>
            <option value='skincare'>SkinCare</option>
          </select>
        </div>
        <button type='submit'>Add Product</button>
      </form>

      <div className="product-list">
       <div className="electronic-items">
        <h2>Electronic Items</h2>
        <ul className='electronic-list'></ul>
       </div>

       <div className="food-items">
        <h2>Food Items</h2>
        <ul className='food-list'></ul>
       </div>

       <div className="skin-items">
        <h2>Skincare Items</h2>
        <ul className='skin-list'></ul>
       </div>
      </div>

      

    </div>
  )
}

export default Sellerpage;