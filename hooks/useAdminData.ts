import { useState, useEffect } from "react";
import {getInstitutions, getBuildings, getRooms} from "@/services/admin.service";

export function useAdminData() {

    const [institutions, setInstitutions] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [rooms, setRooms] = useState([]);

    async function refresh() {

        const [
            institutions,
            buildings,
            rooms
        ] = await Promise.all([
            getInstitutions(),
            getBuildings(),
            getRooms()
        ]);

        setInstitutions(institutions);
        setBuildings(buildings);
        setRooms(rooms);
    }

    useEffect(() => {
        refresh();
    }, []);

    return {
        institutions,
        buildings,
        rooms,
        refresh
    };
}