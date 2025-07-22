import React, { useState, useEffect } from 'react';

function NoteInput({ onSubmit, initialNotes = '', onClose }) {
    const [notes, setNotes] = useState(initialNotes);

    useEffect(() => {

        setNotes(initialNotes);
    }, [initialNotes]);

    const handleSubmit = (e) => {

        e.preventDefault();
        onSubmit(notes);
        setNotes('');
    };

    const handleClearNotes = () => {
        setNotes('');
    };

    return (
        <div className="mt-5 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">

            <h4 className="text-xl font-bold text-gray-800 mb-4">{initialNotes ? 'Edit Your Notes' : 'Add Your Notes'}</h4>


            <form onSubmit={handleSubmit}>
                <label htmlFor="notes-textarea" className="sr-only">Notes:</label>
                <textarea
                    id="notes-textarea"
                    className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:border-transparent transition duration-200 ease-in-out resize-y min-h-[120px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="6"
                    placeholder="Type your notes about this user and their interest in the product..."
                ></textarea>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition duration-200 ease-in-out"
                    >
                        Save Notes
                    </button>
                    <button
                        type="button"
                        onClick={handleClearNotes}
                        className="px-6 py-2 bg-amber-500 text-gray-900 font-medium rounded-md hover:bg-amber-600 transition duration-200 ease-in-out"
                    >
                        Clear Notes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteInput;