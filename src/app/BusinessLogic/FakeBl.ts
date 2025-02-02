import { Sala } from '../Entities/Sala';
import rooms from '../localDataTest/Rooms.json';

export default class FakeBl {
    public static getAvailableRooms():Sala[] {
        return rooms;
    }

    public static addRoom(room:Sala):Sala[] {
        const existingRooms:Sala[] = rooms;
        existingRooms.push(room);

        return existingRooms;
    }
}