#!/bin/bash

# diagramsディレクトリ内のすべてのpumlファイルを処理
find /app/src/diagrams -name "*.puml" | while read puml_file; do
    # src/diagrams内の相対パスを取得
    relative_path="${puml_file#/app/src/diagrams/}"
    # svgファイルの保存先と名前を設定
    svg_file="/app/src/diagrams-svg/${relative_path%.puml}.svg"
    # 保存先ディレクトリを作成（存在しない場合のみ）
    mkdir -p "$(dirname "$svg_file")"
    # pumlファイルをsvgに変換（デフォルト出力をリネーム）
    echo "Processing $puml_file"
    java -DPLANTUML_LIMIT_SIZE=32768 -Dplantuml.font.notosans="Noto Sans" \
        -jar /usr/local/bin/plantuml.jar -tsvg "$puml_file"
    mv "$(dirname "$puml_file")/entity-relationship-diagram.svg" "$svg_file"
    echo "Converted $puml_file to $svg_file"
done
