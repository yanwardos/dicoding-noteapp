const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, createdAt, updatedAt, tags, body,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotes = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNote = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    h.statusCode = 404;
    return {
        status: 'failed',
        message: 'Note not found',
    };
};

const editNoteById = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        const updatedAt = new Date().toISOString();
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        h.statusCode = 200;
        return {
            status: 'success',
            message: 'Berhasil memperbarui catatan',
        };
    }

    h.statusCode = 404;
    return {
        status: 'fail',
        message: 'Note tidak ditemukan',
    };
};

const deleteNoteById = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    h.statusCode = 404;
    return {
        status: 'failed',
        message: 'Catatan tidak ditemukan',
    };
};

module.exports = {
    addNoteHandler,
    getAllNotes,
    getNote,
    editNoteById,
    deleteNoteById,
};
