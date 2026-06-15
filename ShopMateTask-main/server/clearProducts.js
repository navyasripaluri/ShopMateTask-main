require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('shopmate');
    const res = await db.collection('products').deleteMany({});
    console.log(`Deleted ${res.deletedCount} products from the database.`);
    process.exit(0);
  } catch (err) {
    console.error('Failed to clear products:', err);
    process.exit(1);
  } finally {
    try { await client.close(); } catch (_) {}
  }
})();