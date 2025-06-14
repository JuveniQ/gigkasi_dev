export type review = {
    id: string,
    reviewer: string,
    rating: number,
    comment: string,
    date: string,
}

export type service = {
    id: string,
    title: string,
    category: string,
    description: string,
    price: string,
    icon: string,
}
export type request = {
    id: string,
    title: string,
    category: string,
    status: 'COMPLETED' | 'PENDING' | 'DELETED' | null,
    date: string,
    provider?: string, 
    responses?: number,
}

export type qualification = {
    id: string,
    name: string,
    fileUrl: string
}

export type portfolio = {
    id: string,
    title: string,
    imageUrl: string,
}

export interface User {
    id: string,
    name: string,
    imageUrl: string,
    rating: number,
    reviews: review[],
    verified: boolean,
    joinDate: string,
    completedJobs: number,
    requestsMade: number,
    services: service[],
    requests: request[],
    portfolio: portfolio[],
    qualifications: qualification[],
    login: ({ }: any) => void,
    logout: () => void,
    updateProfile: ({}: any) => void,
    status: string, //To update
    loggedIn: boolean,
}