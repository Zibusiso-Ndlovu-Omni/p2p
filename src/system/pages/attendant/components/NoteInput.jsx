import { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Typography,
    Textarea,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
        <Card className="w-full max-w-md p-6 shadow-lg relative">
            <div className="absolute top-4 right-4">
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </IconButton>
            </div>
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    {initialNotes ? 'Edit Your Notes' : 'Add Your Notes'}
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter your notes here..."
                        rows={4}
                        className="w-full"
                    />
                    <div className="flex gap-4 justify-end">
                        <Button
                            type="button"
                            onClick={handleClearNotes}
                            variant="outlined"
                            color="red"
                        >
                            Clear Notes
                        </Button>
                        <Button
                            type="submit"
                            color="blue"
                        >
                            Save Notes
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default NoteInput;