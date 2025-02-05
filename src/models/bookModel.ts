import { prisma } from '../config';

export const createBook = async (title: string, author: string, isbn: string, published_year: string) => {
    return prisma.book.create({
        data: { title, author, isbn, published_year },
    });
};

export const updateBook = async (id: number, title: string, author: string, isbn: string, published_year: string) => {
    return prisma.book.update({
        where: { id },
        data: { title, author, isbn, published_year },
    });
};

export const deleteBook = async (id: number) => {
    return prisma.book.delete({
        where: { id }
    });
};

export const searchBook = async (title: string, author: string, isbn: string) => {
    return prisma.book.findMany({
        where: {
            AND: [
                title ? { title: { contains: title as string, mode: "insensitive" } } : {},
                author ? { author: { contains: author as string, mode: "insensitive" } } : {},
                isbn ? { isbn: { contains: isbn as string, mode: "insensitive" } } : {},
            ],
        },
    });
};