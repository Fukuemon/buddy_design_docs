# ベースイメージとしてJDKを使用
FROM openjdk:11

# 必要なツールとフォントをインストール
RUN apt-get update && \
    apt-get install -y graphviz fonts-noto-cjk plantuml && \
    mkdir -p /app/src/diagrams /app/src/diagrams-svg

# 作業ディレクトリを設定
WORKDIR /app

# スクリプトをコンテナにコピー
COPY docker/convert_puml.sh /app/convert_puml.sh
RUN chmod +x /app/convert_puml.sh

# ENTRYPOINTとしてスクリプトを設定
ENTRYPOINT ["/app/convert_puml.sh"]
