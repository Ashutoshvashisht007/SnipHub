import connect from "@/app/lib/connect";
import SingleSnippet from "@/app/Models/SnippetSchema";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ snippetId: string }> }
) {
  try {
    const { snippetId } = await context.params;
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
  request: Request,
  { params }: { params: { snippetId: string } }
) {
  try {
    await connect();

    const deletedNote = await SingleSnippet.findByIdAndDelete(params.snippetId);

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

