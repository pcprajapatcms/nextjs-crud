
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MyPost } from '../../../models/mypost';
import dbConnect from "../../../lib/dbConnect";

export async function GET(req: Request, res: Response) {
    // Connect to MongoDB
    await dbConnect();

    try {
        // Ensure the request method is POST
        if (req.method !== "GET") {
            throw new Error("Method Not Allowed");
        }

        const fetchPosts = await MyPost.find();

        // Return success response
        return NextResponse.json(
            {
                message: "Post fetched successfully",
                success: true,
                fetchPosts
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Post fetching failed:", error);

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
