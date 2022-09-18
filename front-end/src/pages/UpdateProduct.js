import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alertify from "alertifyjs";



function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();

    const auth = localStorage.getItem('token');

    useEffect(() => {
        getPPorductDetails();
    }, []);

    const getPPorductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

        console.warn(result);
    };


    const updateProduct = async () => {
        let result = await fetch("http://localhost:5000/product/" + params.id, {
            method: "put",
            headers: {
                'Content-Type': "application/json",
                authorization: "srhn " + JSON.parse(auth)
            },
            body: JSON.stringify({ name, price, category, company })
        })
        alertify.success("Product Updated", 1);

        result = await result.json();

        console.warn(result);
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }


    return (
        <div className={'add-product'}>
            <h1>Update Product</h1>
            <input type={"text"} className={'inputBox'} placeholder={'Product Name'} value={name} onChange={(e) => setName(e.target.value)} />
            <input type={"text"} className={'inputBox'} placeholder={'Product Price'} value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type={"text"} className={'inputBox'} placeholder={'Product Category'} value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type={"text"} className={'inputBox'} placeholder={'Product Company'} value={company} onChange={(e) => setCompany(e.target.value)} />
            <button type={'text'} className={'btnProduct'} onClick={updateProduct}> Update </button>
        </div>
    )
}

export default UpdateProduct;