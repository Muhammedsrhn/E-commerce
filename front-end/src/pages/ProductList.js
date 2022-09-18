import { useState, useEffect } from "react";
import alertify from "alertifyjs";
import { Link, useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

function ProductList() {
    const auth = localStorage.getItem("token");
    // if (auth) {
    //     var decode = jwt_decode(auth);
    // }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {

        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: "srhn "+JSON.parse(auth)
            }
        });
        result = await result.json();
        setProducts(result)

    };


    async function deleteProduct(id) {
        alertify.confirm("Are You Sure?", async () => {
            let result = await fetch("http://localhost:5000/product/" + id, {
                method: "delete"
            });
            result = await result.json();

            if (result) {
                alertify.success("Product Deleted", 1.5);
                window.location.reload();
            }
        }, () => {

        }).set({ title: "Delete Product" });;

    };

    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch('http://localhost:5000/search/' + key);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
            console.log(result);
        } else {
            getProducts();
        }
    };


    return (
        <div className={'product-list'}>
            <h1 style={{ "marginBottom": "15px" }}>ProductList</h1>
            <input onChange={handleSearch} type={"search"} className={"search-product"} placeholder={"search..."} />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                {
                    // decode.isAdmin && decode.email == "admin" &&
                    <li>Operation</li>
                }
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        {
                            // decode.isAdmin && decode.email == "admin" && 
                            <li>
                                <i className={"fa fa-trash del"} aria-hidden={"true"} onClick={() => deleteProduct(item._id)}></i>
                                <Link className="update-link" to={"/update/" + item._id}>update</Link>
                            </li>
                        }
                    </ul>
                ) : <>
                    <br /> <h1>No Matches Found</h1>
                </>

            }
        </div>
    )
}

export default ProductList;