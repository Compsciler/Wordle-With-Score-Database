import random
from collections import Counter
from jsonfilelist import json_file_to_list, list_to_json_file

random.seed(0)

old_word_list_json_file = 'constants/oldwordlist.json'
new_word_list_file = 'constants/wordlist.json'

old_valid_guesses_json_file = 'constants/oldvalidGuesses.json'
new_valid_guesses_file = 'constants/validGuesses.json'

def get_word_list(old_word_list):
    new_word_list = []
    # TODO
    return new_word_list

old_word_list = json_file_to_list(old_word_list_json_file)
new_word_list = get_word_list(old_word_list)
random.shuffle(new_word_list)
list_to_json_file(new_word_list, new_word_list_file)

old_valid_guesses = json_file_to_list(old_valid_guesses_json_file)
new_valid_guesses = get_word_list(old_valid_guesses)
list_to_json_file(new_valid_guesses, new_valid_guesses_file)
