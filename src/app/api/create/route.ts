
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MyPost } from '../../../models/mypost';
import dbConnect from "../../../lib/dbConnect";

export async function POST(req: Request, res: Response) {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Ensure the request method is POST
        if (req.method !== "POST") {
            throw new Error("Method Not Allowed");
        }

        // Extract title and description from the request body
        const { title, description } = await req.json();


        // Create a new post
        const newPost = await MyPost.create({
            title,
            description
        });

        // Close the MongoDB connection
        await mongoose.disconnect();

        // Return success response
        return NextResponse.json(
            {
                message: "Post created successfully",
                success: true,
                newPost
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Post creation error:", error);

        // Close the MongoDB connection in case of error
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }

        // Return error response
        return NextResponse.json(
            { message: error.message, success: false },
            { status: 500 }
        );
    }
}
