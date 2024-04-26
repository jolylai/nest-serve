import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import {
  AuthEmailRegisterDto,
  AuthMobileRegisterDto,
} from './dto/auth-register.dto';
import {
  AuthMobileCaptchaDto,
  AuthMobileLoginDto,
  AuthAccountLoginDto,
} from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('account/login')
  @HttpCode(HttpStatus.OK)
  async passwordLogin(@Body() passwordLoginDto: AuthAccountLoginDto) {
    return this.authService.validateAccountLogin(passwordLoginDto);
  }

  @Post('mobile/captcha')
  @HttpCode(HttpStatus.OK)
  async mobileCaptcha(@Body() mobileCaptchaDto: AuthMobileCaptchaDto) {
    return this.authService.getCaptcha(mobileCaptchaDto.mobile);
  }

  @Post('mobile/login')
  @HttpCode(HttpStatus.OK)
  async mobileLogin(@Body() mobileLoginDto: AuthMobileLoginDto) {
    return this.authService.validateMobileLogin(mobileLoginDto);
  }

  @Post('email/register')
  async emailRegister(@Body() emailRegisterDto: AuthEmailRegisterDto) {
    return this.authService.emailRegister(emailRegisterDto);
  }

  @Post('mobile/register')
  async register(@Body() mobileRegisterDto: AuthMobileRegisterDto) {
    return this.authService.mobileRegister(mobileRegisterDto);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request) {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request) {
    return this.authService.me(request.user);
  }

  @ApiBearerAuth()
  @Get('route')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public route(@Request() request) {
    return [
      {
        title: '系统管理',
        type: 1,
        path: '/system',
        name: 'System',
        component: 'Layout',
        icon: 'settings',
        isExternal: false,
        isCache: false,
        isHidden: false,
        sort: 1,
        children: [
          {
            title: '用户管理',
            type: 2,
            path: '/system/user',
            name: 'SystemUser',
            component: 'system/user/index',
            icon: 'user',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 1,
          },
          {
            title: '角色管理',
            type: 2,
            path: '/system/role',
            name: 'SystemRole',
            component: 'system/role/index',
            icon: 'user-group',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 2,
          },
          {
            title: '菜单管理',
            type: 2,
            path: '/system/menu',
            name: 'SystemMenu',
            component: 'system/menu/index',
            icon: 'menu',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 3,
          },
          {
            title: '部门管理',
            type: 2,
            path: '/system/dept',
            name: 'SystemDept',
            component: 'system/dept/index',
            icon: 'mind-mapping',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 4,
          },
          {
            title: '字典管理',
            type: 2,
            path: '/system/dict',
            name: 'SystemDict',
            component: 'system/dict/index',
            icon: 'bookmark',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 5,
          },
          {
            title: '字典项管理',
            type: 2,
            path: '/system/dict/item',
            name: 'SystemDictItem',
            component: 'system/dict/item/index',
            icon: 'bookmark',
            isExternal: false,
            isCache: false,
            isHidden: true,
            sort: 5,
          },
          {
            title: '通知公告',
            type: 2,
            path: '/system/notice',
            name: 'SystemNotice',
            component: 'system/notice/index',
            icon: 'notification',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 6,
          },
          {
            title: '文件管理',
            type: 2,
            path: '/system/file',
            name: 'SystemFile',
            component: 'system/file/index',
            icon: 'file',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 7,
          },
          {
            title: '存储管理',
            type: 2,
            path: '/system/storage',
            name: 'SystemStorage',
            component: 'system/storage/index',
            icon: 'storage',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 8,
          },
          {
            title: '系统配置',
            type: 2,
            path: '/system/config',
            name: 'SystemConfig',
            component: 'system/config/index',
            icon: 'desktop',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 999,
          },
        ],
      },
      {
        title: '系统监控',
        type: 1,
        path: '/monitor',
        name: 'Monitor',
        component: 'Layout',
        redirect: '/monitor/online',
        icon: 'computer',
        isExternal: false,
        isCache: false,
        isHidden: false,
        sort: 2,
        children: [
          {
            title: '在线用户',
            type: 2,
            path: '/monitor/online',
            name: 'MonitorOnline',
            component: 'monitor/online/index',
            icon: 'user',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 1,
          },
          {
            title: '系统日志',
            type: 2,
            path: '/monitor/log',
            name: 'MonitorLog',
            component: 'monitor/log/index',
            icon: 'history',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 2,
          },
        ],
      },
      {
        title: '系统工具',
        type: 1,
        path: '/tool',
        name: 'Tool',
        component: 'Layout',
        redirect: '/tool/generator',
        icon: 'tool',
        isExternal: false,
        isCache: false,
        isHidden: false,
        sort: 3,
        children: [
          {
            title: '代码生成',
            type: 2,
            path: '/tool/generator',
            name: 'ToolGenerator',
            component: 'tool/generator/index',
            icon: 'code',
            isExternal: false,
            isCache: false,
            isHidden: false,
            sort: 1,
          },
        ],
      },
      {
        title: '关于项目',
        type: 1,
        path: '/project',
        name: 'Project',
        component: 'Layout',
        icon: 'apps',
        isExternal: false,
        isCache: false,
        isHidden: false,
        sort: 999,
        children: [
          {
            title: '接口文档',
            type: 2,
            path: 'https://api.continew.top/doc.html',
            icon: 'code-square',
            isExternal: true,
            isCache: false,
            isHidden: false,
            sort: 1,
          },
          {
            title: 'Gitee',
            type: 2,
            path: 'https://gitee.com/continew/continew-admin',
            icon: 'gitee',
            isExternal: true,
            isCache: false,
            isHidden: false,
            sort: 2,
          },
          {
            title: 'GitHub',
            type: 2,
            path: 'https://github.com/charles7c/continew-admin',
            icon: 'github',
            isExternal: true,
            isCache: false,
            isHidden: false,
            sort: 3,
          },
        ],
      },
      {
        title: 'ces',
        type: 1,
        path: '/12',
        name: '123',
        component: 'Layout',
        isExternal: false,
        isCache: false,
        isHidden: false,
        sort: 999,
      },
    ];
  }
}
