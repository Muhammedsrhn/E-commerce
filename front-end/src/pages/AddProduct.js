import { useState } from "react";
import alertify from "alertifyjs";

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const auth = localStorage.getItem("token");



    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const addProduct = async () => {
        if (!name || !price || !company || !category) {
            setError(true)
            return false;
        };

        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: "srhn " + JSON.parse(auth)
            }
        });
        alertify.success("Product Add Success");
        window.location.reload();

        result = result.json();

        console.warn(result);
    }


    return (
        <div className={'add-product'}>
            <h1>Add Product</h1>
            <input type={"text"} className={'inputBox'} placeholder={'Product Name'} value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className={'invalid'}>Enter name valid</span>}
            <input type={"text"} className={'inputBox'} placeholder={'Product Price'} value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className={'invalid'}>Enter price valid</span>}
            <input type={"text"} className={'inputBox'} placeholder={'Product Category'} value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className={'invalid'}>Enter name valid</span>}
            <input type={"text"} className={'inputBox'} placeholder={'Product Company'} value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className={'invalid'}>Enter name valid</span>}
            <button type={'text'} className={'btnProduct'} onClick={addProduct}>Add</button>
        </div>
    )
}

export default AddProduct;