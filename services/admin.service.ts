import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";

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

interface CreateInstitutionData {
    user_id: number;
    name: string;
}

export async function createInstitution(data: CreateInstitutionData) {
    const params = new URLSearchParams({
        user_id: String(data.user_id),
        institution_name: data.name,
    });

    const res = await fetch(`${API_URL}/institution/new?${params.toString()}`, {
        method: "POST",
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
    const res = await fetch(`${API_URL}/building/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    const res = await fetch(`${API_URL}/room/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
