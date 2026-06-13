import React, { useState } from 'react';
import Card from './Card'; 

function Notes() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Changed to boolean
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const notePayload = { title, description };

        try {
            if (isEditing) {
            
                const res = await fetch(`http://localhost:8080/api/notes/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(notePayload),
                });
                const updatedNote = await res.json();

                setNotes(notes.map((note) => note.id === editId ? updatedNote : note));
                setIsEditing(false);
                setEditId(null);
            } else {
                // Creation Route
                const res = await fetch("http://localhost:8080/api/createnotes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(notePayload),
                });
                const data = await res.json();
                setNotes([...notes, data]);
            }

            // Clear input fields completely
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Failed to process note:", error);
        }
    };

    const startEditing = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setEditId(note.id);
        setIsEditing(true);
    };

    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/notes/${id}`, {
                method: "DELETE",
            });
            setNotes(notes.filter((note) => note.id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <header className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Notes</h1>
                        <p className="text-sm text-gray-500 font-medium">Make your notes more organised</p>
                    </div>
                    
                    <div className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-2xl shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Total Notes: {notes.length}
                        </span>
                    </div>
                </header>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Sticky Editor Panel */}
                    <div className="lg:sticky lg:top-8 bg-white border border-gray-200 rounded-3xl p-6 shadow-xl shadow-gray-100/40">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">
                            {isEditing ? "✏️ Edit Your Note" : "📝 Create New Note"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Note Title</label>
                                <input 
                                    type="text" 
                                    className="w-full text-black bg-gray-50 border border-gray-200 focus:border-green-500 rounded-2xl p-3.5 text-sm outline-none transition-all" 
                                    placeholder="Enter title"
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Content Body</label>
                                <textarea 
                                    className="w-full text-black bg-gray-50 border border-gray-200 focus:border-green-500 rounded-2xl p-3.5 text-sm outline-none transition-all h-36 resize-none" 
                                    placeholder="Enter description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className={`w-full py-3.5 text-white font-semibold rounded-2xl transition-all shadow-md active:scale-[0.98] ${
                                    isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {isEditing ? "Update Note" : "Save Note"}
                            </button>
                            
                            {isEditing && (
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditId(null);
                                        setTitle("");
                                        setDescription("");
                                    }}
                                    className="w-full mt-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 rounded-xl"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Notes Grid Display */}
                    <div className="lg:col-span-2">
                        {notes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-3xl min-h-[350px]">
                                <h3 className="text-base font-bold text-gray-800 mb-1">Your canvas is completely empty</h3>
                                <p className="text-sm text-gray-400">Add a title and description to save a workspace note.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {notes.map((item, index) => (
                                    <Card 
                                        key={item.id || index} 
                                        note={item}
                                        onEdit={startEditing}
                                        onDelete={deleteNote}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Notes;