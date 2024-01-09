export const Users = [
    {
        id: 1,
        name: "James Doe",
        contact: "+1 234567890"
    },
    {
        id: 2,
        name: "Patty O'Furniture",
        contact: "+2 234567890"
    },
    {
        id: 3,
        name: "Ann Chovey",
        contact: "+3 234567890"
    },
    {
        id: 4,
        name: "Hazel Nutt",
        contact: "+4 234567890"
    },
    {
        id: 5,
        name: "Chris P. Bacon",
        contact: "+5 234567890"
    },
    {
        id: 6,
        name: "Marsha Mellow",
        contact: "+6 234567890"
    },
    {
        id: 7,
        name: "Olive Yew",
        contact: "+7 234567890"
    },
    {
        id: 8,
        name: "Barb Akew",
        contact: "+8 234567890"
    },
    {
        id: 9,
        name: "Aida Bugg",
        contact: "+9 234567890"
    },
    {
        id: 10,
        name: "Jane Black",
        contact: "+43 234567890"
    },
]

export const stringTrim = (body: any) => {
    if (body?.length > 17) {
        return `${body.substr(0, 35)}...`;
    } else return body;
};