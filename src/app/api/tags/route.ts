import connect from "@/app/lib/connect";
import Tag from "@/app/Models/TagSchema";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { name, clerkUserId } = await req.json();

        await connect();

        const tag = new Tag({
            name,
            clerkUserId
        });

        const savedTag = await tag.save();
        return NextResponse.json({
            tags: savedTag
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("POST /api/tags error:", error.message, error.stack);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("POST /api/tags unknown error:", error);
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}

export async function GET(req: Request) {
    console.log("GET /api/tags hit hua ✅");
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const clerkId = searchParams.get("clerkId");
        console.log("GET /api/tags hit hua ✅");

        if (!clerkId) {
            return NextResponse.json(
                { error: "clerkId is required" },
                { status: 400 }
            );
        }

        const tags = await Tag.find({ clerkUserId: clerkId });

        return NextResponse.json({ tags }, { status: 200 });
    } catch (error: unknown) {
        console.error("GET /api/tags error:", error); // debug ke liye console me pura error
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message || "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}

export async function DELETE(req: Request) {
    try {
        await connect()
        const url = new URL(req.url);
        const tagId = url.searchParams.get("tagId");

        if (!tagId) {
            return NextResponse.json({ message: "tagId is required" }, { status: 400 });
        }

        const tagToDelete = await Tag.findOneAndDelete({ _id: tagId });

        if (!tagToDelete) {
            return NextResponse.json({ message: "Tag not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Tag deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Failed to delte tag");
        return NextResponse.json({
            message: "Failed to deleted tag"
        },
            {
                status: 500
            })
    }
}

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const tagId = url.searchParams.get("tagId");

        if (!tagId) {
            return NextResponse.json({ message: "tagId is required" }, { status: 400 });
        }

        const { name } = await req.json();

        await connect();

        const updatedTag = await Tag.findByIdAndUpdate(
            tagId,
            { name },
            { new: true }
        );

        if (!updatedTag) {
            return NextResponse.json({ message: "Tag not found" }, { status: 404 });
        }

        return NextResponse.json({ tag: updatedTag });
    } catch (error) {
        console.error("Failed to update tag:", error);
        return NextResponse.json(
            { message: "Failed to update tag" },
            { status: 500 }
        );
    }
}
