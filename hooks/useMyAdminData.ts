import { useCallback, useState, useEffect } from "react";
import {
    getMyInstitutions,
    getMyBuildings,
    getMyRooms,
} from "@/services/admin.service";
import { getMyDigitalLocks } from "@/services/digitalLock.service";
import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";
import { DigitalLock } from "@/types/digitalLock";

// Scoped to the logged-in admin's own institutions/buildings/rooms/locks,
// per the backend's ownership model — use this for the admin dashboard.
export function useMyAdminData() {

    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [digitalLocks, setDigitalLocks] = useState<DigitalLock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const [
                institutions,
                buildings,
                rooms,
                digitalLocks
            ] = await Promise.all([
                getMyInstitutions(),
                getMyBuildings(),
                getMyRooms(),
                getMyDigitalLocks()
            ]);

            setInstitutions(institutions);
            setBuildings(buildings);
            setRooms(rooms);
            setDigitalLocks(digitalLocks);
        } catch {
            setError("Erro ao carregar instituições, prédios, salas e fechaduras.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        institutions,
        buildings,
        rooms,
        digitalLocks,
        loading,
        error,
        refresh
    };
}
