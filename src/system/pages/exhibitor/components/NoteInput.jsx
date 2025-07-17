import React, { useState, useEffect } from 'react';

function NoteInput({ onSubmit, initialNotes = '', onClose }) { // Renamed initialValue to initialNotes
    const [notes, setNotes] = useState(initialNotes);

    useEffect(() => {
        // This effect ensures that if the 'initialNotes' prop changes
        // (e.g., when you switch from "Add Notes" to "Edit Notes" for a different user),
        // the textarea content updates to reflect the correct notes.
        setNotes(initialNotes);
    }, [initialNotes]);

    const handleSubmit = (e) => {
        // Prevent the default form submission behavior (which causes a page reload)
        e.preventDefault();
        onSubmit(notes);
        setNotes(''); // Clear the input field after successful submission
    };

    const handleClearNotes = () => {
        setNotes(''); // Set the notes state to an empty string to clear the textarea
    };

    return (
        <div className="mt-5 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            {/* Dynamic title based on whether initialNotes are provided */}
            <h4 className="text-xl font-bold text-gray-800 mb-4">{initialNotes ? 'Edit Your Notes' : 'Add Your Notes'}</h4>

            {/* Using a form element for better accessibility and submission handling */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="notes-textarea" className="sr-only">Notes:</label> {/* Accessible label */}
                <textarea
                    id="notes-textarea"
                    className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out resize-y min-h-[120px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="6"
                    placeholder="Type your notes about this user and their interest in the product..."
                ></textarea>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="submit" // Set type to "submit" for form submission
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
                    >
                        Save Notes
                    </button>
                    <button
                        type="button" // Set type to "button" to prevent accidental form submission
                        onClick={handleClearNotes}
                        className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out"
                    >
                        Clear Notes
                    </button>
                    <button
                        type="button" // Set type to "button"
                        className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition duration-200 ease-in-out"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteInput;