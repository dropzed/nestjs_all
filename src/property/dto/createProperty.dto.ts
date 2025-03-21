import {IsInt, IsString, Length} from 'class-validator'

export class CreatePropertyDto {
    @IsString()
    @IsString()
    @Length(2, 255, {message: 'error on length'})
    name: string;

    @IsString()
    @Length(2, 255, { groups: ['create']})
    @Length(2, 255, {message: 'error on length', groups: ['update']})
    description: string;

    @IsInt()
    area: number;
}