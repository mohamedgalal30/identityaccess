import { IsString } from 'class-validator';
import { IPermissions } from "../../domain/model/role";


export class CreateRoleDto {
  @IsString()
  public name: string;

  public permissions: IPermissions

}
