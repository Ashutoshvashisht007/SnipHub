import connect from "@/app/lib/connect";
import SingleSnippet from "@/app/Models/SnippetSchema";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  snippetId: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { snippetId } = await params;
    const body = await req.json();

    await connect();

    const updatedNote = await SingleSnippet.findByIdAndUpdate(
      snippetId,
      body,
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({ note: updatedNote });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { snippetId } = await params;
    await connect();

    const deletedNote = await SingleSnippet.findByIdAndDelete(snippetId);

    if (!deletedNote) {
      return NextResponse.json(
        { error: "Snippet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Snippet deleted successfully", deletedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return NextResponse.json(
      { error: "Failed to delete snippet" },
      { status: 500 }
    );
  }
}

