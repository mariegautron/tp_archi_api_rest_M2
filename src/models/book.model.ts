export interface BookModel {
    id: string;
    isbn: string;
    title: string;
    subtitle: string;
    author: string;
    pages: number;
    description: string;
    website: string;
    published: string;
    publisher: string;
    comments?: string[]
}

