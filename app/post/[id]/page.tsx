'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<unknown>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(async (res) => {
      if (res.status === 404) router.push('/not-found');
      else setPost(await res.json());
    });
  }, [id, router]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  if (!post) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
      <h1>{(post as { title: string }).title}</h1>
      <p className="text-muted">{new Date((post as { createdAt: string }).createdAt).toLocaleDateString('id-ID')}</p>
      <p>{(post as { content: string }).content}</p>
      <Link href={`/edit/${id}`} className="btn btn-primary me-2">
        Edit
      </Link>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
    </main>
  );
};