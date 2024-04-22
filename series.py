
import json
import pprint
from pathlib import Path

p = str(Path.cwd()) + "/docs/"

data = {}

for filename in Path(p).glob('**/*.md'):
    path_list = str(filename).replace(p, "").split("/")
    if len(path_list) > 1:
        sidebar_key = "/" + path_list[0] + "/"
        sidebar_text = path_list[0].split("-")[1]
        article_text = path_list[1].split(".")[0]
        article_link = sidebar_key + article_text

        if sidebar_key not in data.keys():
            data[sidebar_key] = []
            data[sidebar_key].append({"text": sidebar_text, "items": []})
            data[sidebar_key][0]["items"].append({"text": article_text, "link": article_link})
        else:
            data[sidebar_key][0]["items"].append({"text": article_text, "link": article_link})

for sidebar_key in data.keys():
    lists = data[sidebar_key][0]["items"]
    data[sidebar_key][0]["items"] = sorted(lists, key=lambda x: int(x["text"].split("-")[0]) if len(x["text"].split("-")) > 1 else 999)

# pprint.pprint(data, indent=2)

with open(p + '.vitepress/configs/series.json', 'w') as f:
    f.write(json.dumps(data, ensure_ascii=False))
