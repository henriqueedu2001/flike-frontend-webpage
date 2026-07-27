import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";
import { KeyHolder } from "@/types/keyHolder";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("access_token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getInstitutions(): Promise<Institution[]> {
    const res = await fetch(`${API_URL}/institution/all`);

    if (!res.ok)
        throw new Error("Erro ao buscar instituições");

    return res.json();
}

export async function getBuildings(): Promise<Building[]> {
    const res = await fetch(`${API_URL}/building/all`);

    if (!res.ok)
        throw new Error("Erro ao buscar prédios");

    return res.json();
}

export async function getRooms(): Promise<Room[]> {
    const res = await fetch(`${API_URL}/room/all`);

    if (!res.ok)
        throw new Error("Erro ao buscar salas");

    return res.json();
}

// Scoped to the institutions/buildings/rooms the logged-in user owns —
// use these for the admin dashboard. The plain getInstitutions/getBuildings/
// getRooms above hit the public, unscoped /*/all endpoints and stay in use
// for the client-facing access-request search, which needs to browse
// everything, not just what the caller owns.
export async function getMyInstitutions(): Promise<Institution[]> {
    const res = await fetch(`${API_URL}/admin/institutions`, {
        headers: authHeaders(),
    });

    if (!res.ok)
        throw new Error("Erro ao buscar suas instituições");

    return res.json();
}

export async function getMyBuildings(): Promise<Building[]> {
    const res = await fetch(`${API_URL}/admin/buildings`, {
        headers: authHeaders(),
    });

    if (!res.ok)
        throw new Error("Erro ao buscar seus prédios");

    return res.json();
}

export async function getMyRooms(): Promise<Room[]> {
    const res = await fetch(`${API_URL}/admin/rooms`, {
        headers: authHeaders(),
    });

    if (!res.ok)
        throw new Error("Erro ao buscar suas salas");

    return res.json();
}

interface CreateInstitutionData {
    name: string;
}

export async function createInstitution(data: CreateInstitutionData) {
    const res = await fetch(`${API_URL}/admin/institutions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

interface UpdateInstitutionData {
    name: string;
}

export async function updateInstitution(id: number, data: UpdateInstitutionData) {
    const res = await fetch(`${API_URL}/admin/institutions/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function deleteInstitution(id: number) {
    const res = await fetch(`${API_URL}/admin/institutions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

interface BuildingData {
    institution_id: number;
    name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

export async function createBuilding(data: BuildingData) {
    const res = await fetch(`${API_URL}/admin/buildings`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function updateBuilding(id: number, data: BuildingData) {
    const res = await fetch(`${API_URL}/admin/buildings/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function deleteBuilding(id: number) {
    const res = await fetch(`${API_URL}/admin/buildings/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

interface RoomData {
    building_id: number;
    name: string;
    number: string;
}

export async function createRoom(data: RoomData) {
    const res = await fetch(`${API_URL}/admin/rooms`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function updateRoom(id: number, data: RoomData) {
    const res = await fetch(`${API_URL}/admin/rooms/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function deleteRoom(id: number) {
    const res = await fetch(`${API_URL}/admin/rooms/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const body = await res.json();

    if (!res.ok)
        throw new Error(JSON.stringify(body, null, 2));

    return body;
}

export async function getRoomKeyHolders(roomId: number): Promise<KeyHolder[]> {
    const res = await fetch(`${API_URL}/admin/rooms/${roomId}/key-holders`, {
        headers: authHeaders(),
    });

    if (!res.ok)
        throw new Error("Erro ao buscar portadores de chave desta sala");

    return res.json();
}
