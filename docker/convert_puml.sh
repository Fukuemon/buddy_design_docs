#!/bin/bash

# diagramsディレクトリ内のすべてのpumlファイルを処理
find /app/src/diagrams -name "*.puml" | while read puml_file; do
    # 相対パスを取得
    relative_path="${puml_file#/app/src/diagrams/}"
    echo relative_path: $relative_path
    # svgファイルの保存先を決定
    svg_file="/app/src/diagrams-svg/${relative_path%.puml}.svg"
    # 保存先ディレクトリを作成
    mkdir -p "$(dirname "$svg_file")"
    # pumlファイルをsvgに変換して一時的に元の場所に保存
    plantuml -tsvg "$puml_file"
    # 元のディレクトリで作成されたSVGファイルを取得
    generated_svg=$(find "$(dirname "$puml_file")" -name "*.svg" -print -quit)
    # SVGファイルを目的のディレクトリに移動
    mv "$generated_svg" "$svg_file"
    echo "Converted $puml_file to $svg_file"
done
