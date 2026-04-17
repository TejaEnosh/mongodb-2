const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db("jejadb");
    const collection = db.collection("products");

    // Combined query using multiple operators
    const query = {
      category: { $in: ['electronics', 'clothing'] }, // category matches
      price: { $gt: 50, $lt: 1000 },                 // price between 50-1000
      rating: { $gte: 3.5 },                          // rating at least 3.5
      status: { $ne: 'discontinued' }                 // not discontinued
    };

    const results = await collection.find(query).toArray();
    console.log(`Found ${results.length} documents:`);
    results.forEach(doc => console.log(doc));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();