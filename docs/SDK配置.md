# 阿里云 SDK 配置指南（VOD / OSS）

本项目视频能力依赖**阿里云视频点播（VOD）** 与 **对象存储（OSS）** 的 Java SDK，
实现代码位于 `backend/guli/guli-microservice-vod`（视频）与 `guli-microservice-oss`（存储）。
原始 SDK 与工具类参考见本地 `06.资源/视频上传SDK`、`06.资源/工具类`
（含 `AliyunVodAPIUtils`、`AliyunVodSDKUtils`、`HttpClientUtils`、`SnowflakeIdWorker` 等）。

> ⚠️ 仓库中的 `application.properties` 仅保留**示例/占位** AccessKey，请勿提交真实密钥。
> 生产环境请改用环境变量或配置中心注入，并将 `application-secret.properties` 加入 `.gitignore`。

## 一、依赖（Maven）

`guli-microservice-vod/pom.xml` 已声明：

```xml
<dependency>
  <groupId>com.aliyun</groupId>
  <artifactId>aliyun-java-sdk-core</artifactId>
</dependency>
<dependency>
  <groupId>com.aliyun.oss</groupId>
  <artifactId>aliyun-sdk-oss</artifactId>
</dependency>
<dependency>
  <groupId>com.aliyun</groupId>
  <artifactId>aliyun-java-sdk-vod</artifactId>
</dependency>
<dependency>
  <groupId>com.aliyun</groupId>
  <artifactId>aliyun-sdk-vod-upload</artifactId>
</dependency>
```

> `aliyun-sdk-vod-upload` 需从阿里云官方获取 jar 后 `mvn install:install-file` 安装到本地仓库
> （参考 `06.资源/视频上传SDK/aliyun-upload-sdk-1.5.0`）。

## 二、客户端初始化（SDK 配置核心）

`guli-microservice-vod/.../util/AliyunVODSDKUtils.java`：

```java
public static DefaultAcsClient initVodClient(String accessKeyId, String accessKeySecret) throws ClientException {
    String regionId = "cn-shanghai";           // 点播服务接入区域
    DefaultProfile profile = DefaultProfile.getProfile(regionId, accessKeyId, accessKeySecret);
    return new DefaultAcsClient(profile);
}
```

密钥通过 Spring 配置注入（`ConstantPropertiesUtil`，实现 `InitializingBean`）：

```java
@Value("${aliyun.vod.file.keyid}")     private String keyId;
@Value("${aliyun.vod.file.keysecret}") private String keySecret;
// afterPropertiesSet() 中赋值到静态字段 ACCESS_KEY_ID / ACCESS_KEY_SECRET
```

`application.properties`：

```properties
aliyun.vod.file.keyid=你的AccessKeyId
aliyun.vod.file.keysecret=你的AccessKeySecret
spring.servlet.multipart.max-file-size=1024MB
spring.servlet.multipart.max-request-size=1024MB
```

## 三、视频上传与凭证接口

`VideoAdminController`（`/admin/vod/video`）：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/upload` | 接收 `MultipartFile`，调用 `videoService.uploadVideo` 上传到 VOD，返回 `videoId` |
| DELETE | `/{videoId}` | 删除指定 `videoId` 的远程视频 |
| GET | `/get-upload-auth-and-address/{title}/{fileName}` | 获取上传凭证与地址（`CreateUploadVideo`） |
| GET | `/refresh-upload-auth-and-address/{videoId}` | 刷新上传凭证（`RefreshUploadVideo`） |

上传大文件推荐走「服务端签发上传凭证 → 客户端（Web 上传 SDK）直传 VOD」模式，
避免流量经应用服务器。前端可直接接入 `06.资源/视频上传SDK` 中的 Web 上传 SDK。

## 四、对象存储 OSS（封面 / 素材）

`guli-microservice-oss` 复用 `aliyun-sdk-oss`，配置项同理：

```properties
aliyun.oss.endpoint=oss-cn-shanghai.aliyuncs.com
aliyun.oss.keyid=你的AccessKeyId
aliyun.oss.keysecret=你的AccessKeySecret
aliyun.oss.bucketname=你的Bucket
```

工具类 `06.资源/工具类/AliyunVodAPIUtils.java`、`HttpClientUtils.java` 提供了
签名、HTTP 调用等可复用实现，可直接移入 `guli-framework-common` 统一沉淀。

## 五、获取密钥

1. 登录[阿里云控制台](https://home.console.aliyun.com) → **访问控制 RAM** → 创建用户并授予 `AliyunVODFullAccess`、`AliyunOSSFullAccess`。
2. 为该用户创建 **AccessKey（ID + Secret）**。
3. 开通**视频点播 VOD** 与 **对象存储 OSS** 服务，在 VOD 控制台完成「域名管理 / 转码模板 / 存储管理」基础配置。
