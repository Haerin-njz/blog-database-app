import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
 
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(posts);
}
 
export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, content } = await request.json();
 
  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
 
  if (!updatedPost) return NextResponse.json({ error: "Not found" }, { status: 404 });
 
  return NextResponse.json(updatedPost);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
 
  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
 
  return NextResponse.json({ message: "Deleted" }, { status: 204 });
}