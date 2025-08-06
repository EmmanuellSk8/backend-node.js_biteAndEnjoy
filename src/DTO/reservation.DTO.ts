import { IsEmail, IsString } from "class-validator";

export class ReservationDTO {
    @IsString()
    id!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    cedula!: number;

    @IsString()
    phoneNumber!: number;

    @IsString()
    quantityPeople!: number;

    @IsString()
    date!: string;
}