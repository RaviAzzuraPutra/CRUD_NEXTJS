import connnectMongo from '../../../../lib/mongodb';
import Product from '../../../../models/Products';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connnectMongo();

    if (req.method === 'POST') {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json({ success: true, data: product, message: "Berhasil Menambahkan Product!" })
        } catch (error) {
            res.status(401).json({ success: false, message: "Gagal Menambahkan Product!", error })
        }
    } else if (req.method === "GET") {
        try {
            const products = await Product.find({});
            res.status(200).json({ success: true, data: products, message: "Berhasil Menampilkan Product!" })
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal Menampilkan Product!", error })
        }
    } else {
        res.status(405).json({ success: false, message: "Métode teu diwenangkeun" })
    }
}