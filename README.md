

项目特点：

- 简洁易用：界面简洁易用，支持一键部署
- 拓展方便：导航数据完全由用户自定义控制
- 技术支持：底部关注公众号加交流群

## 部署

本项目使用 `node v18.16.0` 版本环境 `yarn`作为包管理工具

```
git clone https://github.com/fre123-com/fre123-nav.git

# 安装依赖
cd fre123-nav
yarn install

# 数据配置，具体见下方，配置成功后启动服务
# 启动成功，访问 http://localhost:3000
yarn dev
```

具体配置见：[数据配置](./.files/docs/config.md)，推荐基于 [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/fre123-com/fre123-nav&project-name=fre123-nav&repository-name=fre123-nav&demo-title=fre123-nav&demo-description=fre123-nav&demo-url=https%3A%2F%2Ffre123.com) 一键部署：👇

- [Fork](https://github.com/fre123-com/fre123-nav/fork) 本项目
- 编辑 Fork 后项目根目录下 `config` 下相关配置文件，进行 [FRE123 数据配置](./.files/docs/config.md)
- 基于 Vercel 一键部署


