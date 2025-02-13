import os

old_name = ""
folder = os.path.dirname(os.path.realpath(__file__))
for file_name in os.listdir(folder):
    if (file_name.find(".pdf") != -1):
        old_name = folder +'\\'+ file_name
        print("\""+file_name+"\",")
