#!/bin/bash
# MAD网课系统 — 后端服务启动脚本
# 解决 Spring Boot 2.0.7 / Spring Cloud 在 JDK 17 下的两类兼容问题：
#   1) CGLIB 反射需要 --add-opens java.base/java.lang=ALL-UNNAMED
#   2) JAXB / java.desktop 反射需要额外 opens
# 用法：./scripts/start_backend.sh [eureka|edu|sysuser|ucenter|all]

set -e
BACKEND="/Users/sang/Desktop/谷粒学院项目/workspace/backend/mad"
JAVA="/opt/homebrew/opt/openjdk@17/bin/java"
JAR="$BACKEND/mad-microservice-edu/target/mad-microservice-edu-0.0.1-SNAPSHOT.jar"

# 所有微服务通用的 --add-opens
OPENS="--add-opens java.base/java.lang=ALL-UNNAMED \
--add-opens java.base/java.util=ALL-UNNAMED \
--add-opens java.base/java.lang.reflect=ALL-UNNAMED \
--add-opens java.base/java.text=ALL-UNNAMED \
--add-opens java.base/java.net=ALL-UNNAMED \
--add-opens java.base/java.io=ALL-UNNAMED \
--add-opens java.base/java.nio=ALL-UNNAMED \
--add-opens java.base/java.util.concurrent=ALL-UNNAMED \
--add-opens java.base/java.time=ALL-UNNAMED \
--add-opens java.base/sun.nio.ch=ALL-UNNAMED \
--add-opens java.desktop/java.awt.font=ALL-UNNAMED \
--add-opens java.rmi/sun.rmi.transport=ALL-UNNAMED"

run_jar() {
  local dir="$1" jar="$2" port="$3" name="$4"
  if lsof -nP -iTCP:$port -sTCP:LISTEN >/dev/null 2>&1; then
    echo "✓ $name 已在运行 (端口 $port)"
    return 0
  fi
  cd "$dir"
  unset SERVER__PORT
  # nohup + disown 让服务脱离当前 shell 生命周期
  nohup $JAVA $OPENS -jar "$jar" --server.port=$port > "/tmp/mad-$name.log" 2>&1 &
  disown
  echo "→ $name 启动中 (端口 $port)，日志 /tmp/mad-$name.log"
}

case "${1:-all}" in
  eureka)
    run_jar "$BACKEND/mad-commonservice-eureka" \
            "$BACKEND/mad-commonservice-eureka/target/mad-commonservice-eureka-0.0.1-SNAPSHOT.jar" 8220 eureka
    ;;
  edu)
    run_jar "$BACKEND/mad-microservice-edu" "$JAR" 8110 edu
    ;;
  sysuser)
    run_jar "$BACKEND/mad-microservice-sysuser" \
            "$BACKEND/mad-microservice-sysuser/target/mad-microservice-sysuser-0.0.1-SNAPSHOT.jar" 8120 sysuser
    ;;
  ucenter)
    run_jar "$BACKEND/mad-microservice-ucenter" \
            "$BACKEND/mad-microservice-ucenter/target/mad-microservice-ucenter-0.0.1-SNAPSHOT.jar" 8130 ucenter
    ;;
  all)
    run_jar "$BACKEND/mad-commonservice-eureka" \
            "$BACKEND/mad-commonservice-eureka/target/mad-commonservice-eureka-0.0.1-SNAPSHOT.jar" 8220 eureka
    sleep 12
    run_jar "$BACKEND/mad-microservice-edu" "$JAR" 8110 edu
    ;;
  *)
    echo "用法: $0 [eureka|edu|sysuser|ucenter|all]"; exit 1
    ;;
esac
