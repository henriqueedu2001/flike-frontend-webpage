export async function getInstitutions() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/institution/all`
    );

    if (!res.ok)
        throw new Error("Erro ao buscar instituições");

    return res.json();
}

export async function getBuildings() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/building/all`
    );

    if (!res.ok)
        throw new Error("Erro ao buscar instituições");

    return res.json();
}

export async function getRooms() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/all`
    );

    if (!res.ok)
        throw new Error("Erro ao buscar instituições");

    return res.json();
}