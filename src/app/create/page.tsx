'use client';
import { toast } from 'react-toastify';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const CreatePage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !description) {
            toast.error('All fields are required');
            return
        }

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            description: formData.get('description')
        }
        try {
            await axios.post('/api/create', data);
            setTitle('');
            setDescription('');
            toast.success('Post created successfully!');
            router.push('/');
        } catch (error) {
            console.error("Failed to create post", error);
            toast.error('Failed to create post!');
        }
    }
    return (
        <>
            <h2 className="text-2xl font-bold my-8">Add New Post</h2>
            <form action="" className="flex gap-3 flex-col" onSubmit={formHandler}>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Term" className="py-2 px-4 border rounded-md" />
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Interpretation" className="py-4 px-4 border rounded-md resize-none" ></textarea>
                <button type="submit" className="bg-black text-white mt-5 px-4 py-2 w-fit rounded-md cursor-pointer">Add Post</button>
            </form >
        </>
    )
}

export default CreatePage