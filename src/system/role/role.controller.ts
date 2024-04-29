import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { CreateRoleDto, QueryRoleDto } from './role.dto';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller({
  path: 'role',
  version: '1',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '角色列表',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findItems(
    @Query() queryRoleDto: QueryRoleDto,
    @Query() paginationDto: PaginationDto,
  ) {
    const [list, total] = await this.roleService.pagination({
      take: paginationDto.take,
      skip: paginationDto.skip,
      where: queryRoleDto,
    });

    return { list, total };
  }

  @ApiOperation({
    summary: '创建角色',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crate(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '角色详情',
  })
  @Get('/:roleId')
  @HttpCode(HttpStatus.OK)
  async findFirst(@Param('roleId') roleId: number) {
    return this.roleService.findById(roleId);
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Get('/:roleId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('roleId') roleId: number) {
    return this.roleService.delete(roleId);
  }
}
