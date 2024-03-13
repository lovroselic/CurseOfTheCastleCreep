# -*- coding: utf-8 -*-
"""
Created on Thu Oct  5 07:59:53 2023

@author: lovro
v 0.2.1

https://networkx.org/documentation/stable/reference/introduction.html
"""


import networkx as nx
import matplotlib.pyplot as plt
import regex as re


def initDictElement(D, roomId):
    D[roomId] = dict()
    D[roomId]["name"] = roomName
    D[roomId]["incoming"] = []
    D[roomId]["outcoming"] = []
    D[roomId]["in_color"] = []
    D[roomId]["out_color"] = []


def getColor(col):
    if col in ["Open", "Closed"]:
        return None
    if col in ["Up", "Down"]:
        return "#FFC0CB"
    if col == "Red":
        return "#FF0000"
    if col == "Blue":
        return "#0000FF"
    if col == "Green":
        return "#00FF00"
    if col == "Gold":
        return "#FFD700"
    if col == "Silver":
        return "#C0C0C0"
    if col == "Emerald":
        return "#50C878"
    if col == "Purple":
        return "#800080"
    return col


def edgeColor(D, node, incoming):
    default = "#000000"
    i = D[node]["outcoming"].index(incoming)
    color1 = D[node]["out_color"][i]
    color2 = D[node]["in_color"][i]
    return color1 or color2 or default


_file = "C:/Users/lovro/OneDrive/Documents/JS/CurseOfTheCastleCreep/Assets/Definitions/CCC/MAP_CCC.js"
with open(_file, encoding="utf8") as fh:
    data = fh.read()

map_regex = re.compile(r'const\sMAP\s=\s{([\w\W]*)};')
room_id_regex = re.compile(r'\d+')
room_name_regex = re.compile(r'name:\s*\"([\w\s\-\?\.]*)\"')
gates_regex = re.compile(r'gates:\s*\'(.*)\'')
MAP = re.search(map_regex, data).group(1).strip()
MAP = re.split(r'\n\s*\,', MAP)
MAPDICT = dict()

for room in MAP:
    # print(room)
    roomId = re.search(room_id_regex, room).group(0)
    roomName = re.search(room_name_regex, room).group(1)
    print(roomId, roomName)
    initDictElement(MAPDICT, int(roomId))

for room in MAP:
    gates = re.search(gates_regex, room)
    if gates is None:
        continue
    gates = gates.group(1)[1:-1]
    gates = re.split(r'\],\[', gates)
    gates = [g.strip("[]") for g in gates]
    gates = [g.split(",")[2:] for g in gates]
    for g in gates:
        out = int(g[1].split(".")[0].strip('"'))
        node = int(g[0].split(".")[0].strip('"'))
        col = getColor(g[-1].strip('"'))
        MAPDICT[node]["outcoming"].append(out)
        MAPDICT[out]["incoming"].append(node)
        MAPDICT[node]["out_color"].append(col)
        MAPDICT[out]["in_color"].append(col)

G = nx.DiGraph()
edge_colors = []

for node, el in MAPDICT.items():
    G.add_node(node, name=el["name"])

for node, el in MAPDICT.items():
    for i in el['outcoming']:
        G.add_edge(node, i)
        ec = edgeColor(MAPDICT, node, i)
        edge_colors.append(ec)

label_dict = {node: str(node) + "-" + el["name"] for node, el in MAPDICT.items()}
plt.figure(1, figsize=(30, 30), dpi=192)
nx.draw(G, labels=label_dict, with_labels=True, font_size=7, edge_color=edge_colors, node_size=500)
plt.savefig("dungeon_plot.png", dpi=192, bbox_inches='tight')
