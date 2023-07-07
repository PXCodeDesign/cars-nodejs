const MongoClient = require("mongodb").MongoClient
const { ObjectId } = require("mongodb")

const uri =
  "mongodb+srv://techxates:ates2455@cluster0.zhifdh7.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectToMongoDB = async () => {
  try {
    await client.connect()
    console.log("MongoDB'ye başarıyla bağlandı")
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error)
    process.exit(1)
  }
}

module.exports = { client, connectToMongoDB, ObjectId }
