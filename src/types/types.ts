// src/types.ts
export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
}
