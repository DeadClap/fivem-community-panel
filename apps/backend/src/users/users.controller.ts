import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignMembershipDto } from './dto/assign-membership.dto';
import { MembershipsService } from '../memberships/memberships.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly membershipsService: MembershipsService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post(':id/memberships')
  async assignMembership(
    @Param('id') userId: string,
    @Body() body: AssignMembershipDto,
  ) {
    return this.membershipsService.assignUserToDepartment(
      userId,
      body.departmentId,
      body.rankId,
    );
  }
}
