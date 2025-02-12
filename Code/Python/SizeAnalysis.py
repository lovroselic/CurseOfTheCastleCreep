# -*- coding: utf-8 -*-
"""
Created on Mon Jan  6 14:55:56 2025

@author: lovro
v 0.1.0
"""

import os
from glob import glob
import pandas as pd
import time


def search_files(directory, extensions):
    files_list = []

    for root, dirs, files in os.walk(directory):
        for ext in extensions:
            files_list.extend(glob(os.path.join(root, ext)))

    return files_list

def count_lines(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            return sum(1 for _ in f)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return 0


start_time = time.time()
project_dir = 'C:/Users/Uporabnik/Documents/JS/CastleHaunt2/'
extensions = ['*.*']
code_files = ['.js', '.glsl', '.html', '.css']
data = []
result_files = search_files(project_dir, extensions)

for file in result_files:
    path, filename = os.path.split(file)
    if ".git" in path: continue
    file_size = os.path.getsize(file) / 1000.0 #Kb
    is_code_file = any([filename.endswith(ext) for ext in code_files])
    num_lines = count_lines(file) if is_code_file else 0
    data.append([path, filename, file_size, num_lines])

DATA = pd.DataFrame(data, columns=['Path', 'Filename', 'FileSize[Kb]', 'NumberOfLines'])
DATA = DATA.sort_values(by='FileSize[Kb]', ascending=False)

total_size = DATA['FileSize[Kb]'].sum() / 1000.0 #Mb
total_lines = DATA['NumberOfLines'].sum()


print("*******************************")
print(project_dir)
print(f"Total File Size: {total_size:.2f} MB")
print(f"Total Number of Lines: {total_lines}")
print("*******************************")

# =============================================================================
# # END
# =============================================================================

execution_time = time.time() - start_time
print(f"Total execution time: {execution_time:.2f} seconds")
