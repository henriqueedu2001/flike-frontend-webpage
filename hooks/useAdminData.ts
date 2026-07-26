import { useCallback, useState, useEffect } from "react";
import {getInstitutions, getBuildings, getRooms} from "@/services/admin.service";
import { getDigitalLocks } from "@/services/digitalLock.service";
import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";
import { DigitalLock } from "@/types/digitalLock";

export function useAdminData() {

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
                getInstitutions(),
                getBuildings(),
                getRooms(),
                getDigitalLocks()
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
