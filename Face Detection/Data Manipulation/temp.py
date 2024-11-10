import csv
import json
import random

# Load JSON file with course details for each student
with open('asd.json') as json_file:
    student_data = json.load(json_file)

# Create a dictionary to map each enrollment number to their courses
enroll_to_courses = {student['enroll']: student['courses'] for student in student_data}

# Read CSV file and convert to the desired JSON format
output_data = []
with open('attendance.csv', newline='') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    
    # Create a dictionary to store attendance records
    attendance_records = {}
    
    for row in csv_reader:
        enroll = row['enroll']
        date = row['date']
        status = True if row['status'] == "Present" else False

        # Check if the enrollment number has corresponding courses in JSON data
        if enroll in enroll_to_courses:
            # Randomly select a course from the student's course list
            cid = random.choice(enroll_to_courses[enroll])
            
            # Initialize the student's attendance record if not present
            if enroll not in attendance_records:
                attendance_records[enroll] = {
                    "enroll": enroll,
                    "courses": []
                }
            
            # Check if the course already exists in the courses list
            course_found = False
            for course in attendance_records[enroll]["courses"]:
                if course["cid"] == cid:
                    course["attendanceRecords"].append({"date": date, "status": status})
                    course_found = True
                    break
            
            # If the course does not exist, add a new course entry with attendance records
            if not course_found:
                attendance_records[enroll]["courses"].append({
                    "cid": cid,
                    "attendanceRecords": [{"date": date, "status": status}]
                })

# Convert attendance records to a list format
output_data = list(attendance_records.values())

# Save the output as a JSON file
with open('output.json', 'w') as output_file:
    json.dump(output_data, output_file, indent=2)

print("CSV data converted and saved to output.json")
