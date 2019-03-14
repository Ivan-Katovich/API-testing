const resultsSchema = {
    title: 'results schema v1',
    type: 'object',
    required: ['documentsCount'],
    additionalProperties: false,
    properties: {
        documentsCount: {
            type: 'number'
        },
        filter: {
            type: 'object'
        },
        insertedCount: {
            type: 'number'
        }
    }
};

const authorSchema = {
    title: 'book schema v1',
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        isAlive: {
            type: 'boolean'
        }
    }
};

const bookSchema = {
    title: 'book schema v1',
    type: 'object',
    required: ['name', 'author', 'pages', 'date'],
    additionalProperties: true,
    properties: {
        name: {
            type: 'string',
        },
        author: authorSchema,
        pages: {
            type: 'number',
            minimum: 3
        },
        date: {
            type: 'string'
        },
        isDigitized: {
            type: 'boolean'
        },
        coast: {
            type: 'number',
            minimum: 10
        }
    }
};

const bookListSchema = {
    type: 'array',
    items: bookSchema
}

module.exports = {bookSchema, authorSchema, resultsSchema, bookListSchema};