import { ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface AuthResponseInterface{
    user: {
        email: string;
        role: ROLES;
        _id: string;
        coordinates: {lat: number | null, lng: number | null };
        city: string  | null;
        country: string  | null;
        houseNumber: string  | null;
        street: string  | null;
        fullName: string;
        isLocationVerify: boolean;

    };
    accessToken: string;
    refreshToken: string;
}


export interface CoordinatsInterface{
    lat: number , lng: number  
}

export type Nullable<T> = {
    [K in keyof T]?: T[K] | null;
  };


