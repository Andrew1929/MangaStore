const mongoose = require('mongoose')
const mangas = require('./Model/Manga')
const {mangaInfo} = require('./mangaDB')
const config = require('config')

const addDB = async () => {
    if (config.get('initializeDatabase')) {
        try {
            await mangas.insertMany(mangaInfo);
            console.log("Манга успішно додана!");
        } catch (e) {
        console.error("Error adding manga:", e)
        }
        finally {
            mongoose.connection.close()
        }
    }
} 

module.exports = {addDB}