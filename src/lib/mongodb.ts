import mongoose from 'mongoose';

const connect = async () => {
    try {
        const mongodbUrl = process.env.MONGODB_URL;

        if (!mongodbUrl) {
            throw new Error("MONGODB_URL tidak didefinisikan");
        }
        await mongoose.connect(mongodbUrl, {});
        console.log("Koneksi ke database berhasil!!!!!!!");
    } catch (error) {
        console.log("terjadi error saat koneksi ke database", error);
    }
}

export default connect;