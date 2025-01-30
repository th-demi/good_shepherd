#!/bin/bash
# This script generates a directory tree structure followed by all relevant code files (React, HTML, CSS) into one plain text file.

# Specify the output plain text file
output_file="project_code.txt"

# Clear the output file if it exists
> "$output_file"

# Generate the directory structure in a tree-like format, excluding .next, node_modules, .git, .DS_Store, .gitignore
echo "Project Directory Structure (excluding .next, node_modules, .git, .DS_Store, .gitignore):" >> "$output_file"
tree -F --noreport --prune -I '.next|node_modules|\.git|\.DS_Store|\.gitignore' >> "$output_file"

# Add a separator line between the directory structure and code
echo -e "\n\n==== Code Files ====\n\n" >> "$output_file"

# Loop through all the code files in the src folder (e.g., .js, .jsx, .ts, .tsx, .html, .css)
find ./src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" \) | while read -r file; do
    # Add the directory structure (file path) as a header in the text file
    echo "==== File: $file ====" >> "$output_file"
    
    # Append the content of the file to the output file
    cat "$file" >> "$output_file"
    
    # Add a newline for separation between files
    echo -e "\n\n" >> "$output_file"
done

# Include the additional configuration files: jsconfig.json, next.config.mjs, package.json, postcss.config.mjs, and tailwind.config.js
for config_file in jsconfig.json next.config.mjs package.json postcss.config.mjs tailwind.config.js; do
    if [[ -f $config_file ]]; then
        echo "==== File: $config_file ====" >> "$output_file"
        cat "$config_file" >> "$output_file"
        echo -e "\n\n" >> "$output_file"
    fi
done

echo "Conversion complete! All files have been appended into '$output_file'."
