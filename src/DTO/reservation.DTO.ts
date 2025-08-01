import { IsEmail, IsNumber, IsString } from "class-validator";

export class ReservationDTO {
    @IsString()
    id!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsNumber()
    cedula!: number;

    @IsNumber()
    phoneNumber!: number;

    @IsNumber()
    quantityPeople!: number;

    @IsString()
    date!: string;
}