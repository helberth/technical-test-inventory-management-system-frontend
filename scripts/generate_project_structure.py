#!/usr/bin/env python3
import os
import os.path as path
from typing import List, Optional

def should_skip_directory(directory: str) -> bool:
    """Check if directory should be skipped."""
    skip_dirs = {
        'node_modules',
        '.git',
        '__pycache__',
        '.next',
        'dist',
        'build',
        'coverage',
        '.vscode',
        '.idea',
        '.github',
        'public',
    }
    return path.basename(directory) in skip_dirs

def should_skip_file(filename: str) -> bool:
    """Check if file should be skipped."""
    skip_extensions = {
        '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
        '.woff', '.woff2', '.ttf', '.eot',
        '.log', '.tmp', '.swp', '.swo',
        '.zip', '.gz', '.tar', '.rar',
        '.lock', '.min.js', '.min.css'
    }
    return any(filename.endswith(ext) for ext in skip_extensions)

def get_file_contents(filepath: str, max_size: int = 50000) -> Optional[str]:
    """Get file contents if file is not too large and is text-based."""
    if should_skip_file(filepath):
        return None
    
    try:
        file_size = os.path.getsize(filepath)
        if file_size > max_size:  # Skip large files
            return f"[File too large to display: {file_size} bytes]"
            
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # Check if file appears to be binary
            if '\x00' in content and len(content) > 0:
                return "[Binary file content not displayed]"
            return content
    except (UnicodeDecodeError, PermissionError, OSError):
        return "[File content could not be read]"

def generate_markdown(root_dir: str, output_file: str) -> None:
    """Generate markdown file with project structure and file contents."""
    with open(output_file, 'w', encoding='utf-8') as md:
        # Project header
        md.write(f"# Project Structure: {os.path.basename(root_dir)}\n\n")
        md.write("This document provides an overview of the project structure and source code.\n")
        md.write("Only includes `/src` directory and `package.json`.\n\n")
        
        # Always include package.json
        package_json_path = path.join(root_dir, 'package.json')
        src_dir = path.join(root_dir, 'src')
        
        # Table of Contents
        md.write("## Table of Contents\n")
        
        # Add package.json to TOC
        if path.exists(package_json_path):
            md.write("- [package.json](#packagejson)\n")
        
        # Add src directory to TOC if it exists
        if path.exists(src_dir):
            md.write("- `src/`\n")
            
            # First pass to build TOC and collect file paths
            file_paths = []
            for root, dirs, files in os.walk(src_dir):
                # Skip unwanted directories
                dirs[:] = [d for d in dirs if not should_skip_directory(path.join(root, d))]
                
                rel_path = path.relpath(root, root_dir)
                level = rel_path.count(os.sep) - 1  # Adjust level for src/
                indent = '  ' * level
                
                # Skip the root directory in TOC
                if rel_path != 'src':
                    dir_name = path.basename(rel_path)
                    md.write(f"{indent}- `{dir_name}/`\n")
                
                # Add files to TOC and collect paths
                for file in sorted(files):
                    if should_skip_file(file):
                        continue
                    filepath = path.join(rel_path, file)
                    file_paths.append(filepath)
                    md.write(f"{indent}  - [`{file}`](#{file.replace('.', '').lower()})\n")
        
        md.write("\n---\n\n")
        
        # Include package.json content if it exists
        if path.exists(package_json_path):
            md.write("## `package.json`\n\n")
            content = get_file_contents(package_json_path)
            if content:
                md.write("```json\n")
                md.write(f"{content}\n")
                md.write("```\n\n")
                md.write("---\n\n")
        
        # Include src directory contents
        if path.exists(src_dir):
            # Second pass to write file contents
            for rel_filepath in sorted(file_paths):
                full_path = path.join(root_dir, rel_filepath)
                content = get_file_contents(full_path)
                if content:
                    file_ext = path.splitext(rel_filepath)[1][1:] or 'text'
                    md.write(f"## `{rel_filepath}`\n\n")
                    md.write(f"```{file_ext}\n")
                    md.write(f"{content}\n")
                    md.write("```\n\n")
                    md.write("---\n\n")

def main():
    project_root = path.dirname(path.dirname(path.abspath(__file__)))
    output_file = path.join(project_root, 'PROJECT_STRUCTURE.md')
    
    print(f"Generating project structure to {output_file}...")
    generate_markdown(project_root, output_file)
    print("Done!")

if __name__ == "__main__":
    main()
