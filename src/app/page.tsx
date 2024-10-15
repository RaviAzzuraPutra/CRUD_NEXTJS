"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data.data);
        } catch (error: any) {
            console.log("Gagal Mengambil data", error.response ? error.response.data : error.message);
        }
    }

    const addProduct = async () => {
        try {
            const newProduct = { name, price, description, imageURL };

            await axios.post('/api/products', newProduct);

            fetchProducts();

            setName("");
            setPrice(0);
            setDescription("");
            setImageURL("");

        } catch (error: any) {
            console.log("Gagal Menambahkan data", error.response ? error.response.data : error.message);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    return (
        <div>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Daftar Produk Baju</h1>

                {/* Form Tambah Produk */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Nama Produk"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Harga Produk"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi Produk"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="URL Gambar Produk"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <button
                        onClick={addProduct}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Tambah Produk
                    </button>
                </div>

                {/* Tabel Produk */}
                <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-black text-yellow-300">
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Harga</th>
                            <th className="border p-2">Deskripsi</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr className="text-center" key={product.name}>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">{product.price}</td>
                                <td className="border p-2">{product.description}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}