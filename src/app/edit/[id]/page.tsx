const EditPage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold my-8">Edit Intepretation</h2>
            <div className="flex gap-3 flex-col">
                <input type="text" name="term" placeholder="Term" className="py-2 px-4 border rounded-md" />
                <textarea name="interpretation" placeholder="Interpretation" className="py-4 px-4 border rounded-md resize-none" ></textarea>
                <button className="bg-black text-white mt-5 px-4 py-2 w-fit rounded-md cursor-pointer">Update Interpretation</button>
            </div>
        </>
    )
}

export default EditPage