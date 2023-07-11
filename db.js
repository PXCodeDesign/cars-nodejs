import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"

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

export { client, connectToMongoDB, ObjectId }
