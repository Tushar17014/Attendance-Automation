import csv
import json
import ast

def csv_to_json(csv_file_path, json_file_path):
    data = []

    # Read the CSV file
    with open(csv_file_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # Convert each row into a dictionary and add it to data
        for row in csv_reader:
            # Process each column in the row
            for key, value in row.items():
                # If the value looks like a string representation of a list or dictionary, parse it
                if key == "semester" or key == "enroll":
                    value = int(value)
                if key == "courses" and value.startswith("[") and value.endswith("]"):
                    # Convert string representation of set to list
                    value = value.replace("{", "[").replace("}", "]")
                    row[key] = ast.literal_eval(value)  # Safely parse the string as a list
                else:
                    row[key] = value
            data.append(row)

    # Write the JSON file
    with open(json_file_path, mode='w') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage
csv_to_json('yourfile_updated.csv', 'output2.json')
