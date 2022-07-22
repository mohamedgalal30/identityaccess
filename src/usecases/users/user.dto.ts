import { IsString } from 'class-validator';


export class AssignRoleDto {
  @IsString()
  public userId: string;

  @IsString()
  public roleId: string;

}
