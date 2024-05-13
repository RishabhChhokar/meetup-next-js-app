import { MongoClient } from "mongodb";

export async function GET(request, response) {
  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return new Response(JSON.stringify(meetups), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch meetup" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request, response) {
  try {
    let body = await request.json();
    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(body);
    console.log(result);

    client.close();

    return new Response(JSON.stringify({ message: "Meetup inserted!" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to insert meetup" }),
      {
        status: 500,
      }
    );
  }
}
