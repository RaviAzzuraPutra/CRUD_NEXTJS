import connnectMongo from '../../../lib/mongodb';
import Product from '../../../models/Products';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connnectMongo();

    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });

            if (!product) {
                return res.status(404).json({ success: false, message: "Product Tidak Ditemukan!" })
            }

            res.status(200).json({ success: true, data: product, message: "Berhasil Memperbarui Product!" })
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal Memperbarui Product!", error })
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({ success: false, message: "Product Tidak Ditemukan!" })
            }

            res.status(200).json({ success: true, data: deletedProduct, message: "Berhasil Menghapus Product!" })
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal Menghapus Product!", error })
        }
    }
}