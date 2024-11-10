import json
from datetime import datetime

# Function to convert date format
def convert_date_format(date_str):
    # Convert the date to datetime object
    date_obj = datetime.strptime(date_str, "%d-%m-%Y")
    # Format the date as 'YYYY-MM-DDT00:00:00.000Z'
    return date_obj.strftime("%Y-%m-%dT00:00:00.000Z")

# Load data from the data.json file
with open('output.json', 'r') as file:
    data = json.load(file)

# Iterate through data and convert dates
for record in data:
    for course in record.get('courses', []):
        for attendance in course.get('attendanceRecords', []):
            # Convert date to new format
            attendance['date'] = convert_date_format(attendance['date'])

# Output the transformed data (print to the console or save to a file)
with open('transformed_data.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

print("Date conversion complete. Transformed data saved to 'transformed_data.json'.")
