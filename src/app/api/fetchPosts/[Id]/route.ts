
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { MyPost } from '../../../../models/mypost';
import dbConnect from "../../../../lib/dbConnect";
import { headers } from "next/headers";

export async function GET(req: Request, { params }: any, res: Response) {
    //const headersList = headers();
    // Connect to MongoDB
    await dbConnect();

    try {
        // Ensure the request method is POST
        if (req.method !== "GET") {
            throw new Error("Method Not Allowed");
        }
        const fetchPost = await MyPost.findOne({ _id: params.Id });
        if (!fetchPost) {
            return NextResponse.json(
                { success: false, message: "post not found" },
                { status: 404 }
            );
        }

        // Return success response
        return NextResponse.json(
            {
                message: "Post fetched successfully",
                success: true,
                fetchPost
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



export async function PATCH(req: Request, { params }: any, res: Response) {
    const headersList = headers();
    // Connect to MongoDB
    await dbConnect();
    const body = await req.json();
    const { title, description } = body;
    try {
        // Ensure the request method is POST
        if (req.method !== "PATCH") {
            throw new Error("Method Not Allowed");
        }

        if (!title || !description) {
            throw new Error("All fields are required!");
        }


        const updatePost = await MyPost.findOneAndUpdate({ _id: params.Id }, {
            title: title,
            description: description
        });
        if (!updatePost) {
            return NextResponse.json(
                { success: false, message: "post not found" },
                { status: 404 }
            );
        }

        // Return success response
        return NextResponse.json(
            {
                message: "Post updated successfully",
                success: true,
                updatePost
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Post update failed:", error);

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
