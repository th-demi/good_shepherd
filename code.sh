OUTPUT_FILE="code.txt"
> $OUTPUT_FILE
echo "Directory Structure:" >> $OUTPUT_FILE
tree -I '.next|node_modules|.env.local|pnpm-lock.yaml|code.txt|public|.git|favicon.ico|GeistMonoVF.woff|GeistVF.woff|.DS_Store|src/.DS_Store' >> $OUTPUT_FILE
echo -e "\n\n" >> $OUTPUT_FILE
echo "File Contents:" >> $OUTPUT_FILE
find . -type f ! -path './node_modules*' ! -path './.next*' ! -name '.env.local' ! -name 'pnpm-lock.yaml' ! -name 'code.txt' ! -path './public*' ! -path './.git*' ! -path './src/app/favicon.ico' ! -path './src/app/fonts/GeistMonoVF.woff' ! -path './src/app/fonts/GeistVF.woff' ! -path './.DS_Store' ! -path './src/.DS_Store' | while read file; do
    if [ -f "$file" ]; then
        echo "File: $file" >> $OUTPUT_FILE
        echo "===================" >> $OUTPUT_FILE
        cat "$file" >> $OUTPUT_FILE
        echo -e "\n\n" >> $OUTPUT_FILE
    fi
done

echo "Code saved to $OUTPUT_FILE"
