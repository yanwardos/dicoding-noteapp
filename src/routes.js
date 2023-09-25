const {
    addNoteHandler,
    getAllNotes,
    getNote,
    editNoteById,
    deleteNoteById,
} = require('./handler');

const routes = [
    {
        path: '/notes',
        method: 'POST',
        handler: addNoteHandler,
    },
    {
        path: '/notes',
        method: 'GET',
        handler: getAllNotes,
    },
    {
        path: '/notes/{id}',
        method: 'GET',
        handler: getNote,
    },
    {
        path: '/notes/{id}',
        method: 'PUT',
        handler: editNoteById,
    },
    {
        path: '/notes/{id}',
        method: 'DELETE',
        handler: deleteNoteById,
    },
];

module.exports = routes;
