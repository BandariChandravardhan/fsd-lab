const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "studentDB";

async function main() {
    try {
        // Connect to MongoDB
        await client.connect();

        console.log("Connected to MongoDB successfully!");

        // Select database
        const db = client.db(dbName);

        // Select collection
        const collection = db.collection("students");

        // Calculate average marks
        const result = await collection.aggregate([
            {
                $unwind: "$subjects"
            },
            {
                $group: {
                    _id: "$studentId",
                    name: { $first: "$name" },
                    averageMarks: {
                        $avg: "$subjects.marks"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    name: 1,
                    averageMarks: {
                        $round: ["$averageMarks", 2]
                    }
                }
            },
            {
                $sort: {
                    averageMarks: -1
                }
            }
        ]).toArray();

        console.log("\nStudent Grade Summary:");
        console.table(result);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

main();















 
















 