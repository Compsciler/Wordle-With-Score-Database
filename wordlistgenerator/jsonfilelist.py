try:
    import simplejson as json
except (ImportError,):
    import json

def json_file_to_list(json_file):
    with open(json_file, 'r') as json_file_r:
        json_file_string = json_file_r.read()
        return json.loads(json_file_string)

def list_to_json_file(list_, json_file):
    with open(json_file, 'w') as json_file_w:
	    json.dump(list_, json_file_w, indent=2)

def newline_delimited_to_json_file(txt_file, json_file):
    with open(txt_file, 'r') as txt_file_r:
        list_ = txt_file_r.read().splitlines() 
        list_to_json_file(list_, json_file)

def merge_lists_without_duplicates(*args):
    merged_list = []
    seen = set()
    for arr in args:
        for elem in arr:
            if elem not in seen:
                merged_list.append(elem)
                seen.add(elem)
    return merged_list
