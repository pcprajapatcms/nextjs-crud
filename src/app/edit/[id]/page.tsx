"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface postType {
    _id: string;
    title: string;
    description: string;
}

const EditPage = () => {
    const [post, setPost] = useState<postType[]>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const params = useParams<{ id: string }>();
    const router = useRouter();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/fetchPosts/${params.id}`, { cache: 'no-store' }).then(result => result.json());
                setPost(response.fetchPost);
                setTitle(response.fetchPost.title);
                setDescription(response.fetchPost.description);
            }
            catch (error) {
                console.log("Failed to fetch posts", error);
            }
        };
        fetchPost();
    }, [params.id]);


    const updatePost = async () => {
        try {
            const response = await fetch(`/api/fetchPosts/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Post updating failed!');
            }

            toast.success('Post updated successfully!');
            router.push('/');
        } catch (error) {
            toast.error('Failed to update post');
            console.error('Failed to update post', error);
        }
    };


    return (
        <>
            <h2 className="text-2xl font-bold my-8">Edit Post</h2>
            <div className="flex gap-3 flex-col">
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="py-2 px-4 border rounded-md" />
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="py-4 px-4 border rounded-md resize-none" ></textarea>
                <button className="bg-black text-white mt-5 px-4 py-2 w-fit rounded-md cursor-pointer" onClick={updatePost}>Update Post</button>
            </div>
        </>
    )
}
export default EditPage