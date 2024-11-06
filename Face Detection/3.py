import cv2
import face_recognition as fr
import numpy as np

encList = []

trainPath = "data/train/"
testPath = "data/test/"

student_image = fr.load_image_file(trainPath + "train6.jpg")
student_encoding = fr.face_encodings(student_image)[0]
encList.append(student_encoding)

img = cv2.imread(testPath + "4.jpg")
# img = cv2.imread(trainPath + "train5.jpg")
# img = cv2.resize(img, (600, 600))
img = cv2.resize(img, (0, 0), None, 1, 1)
img2 = img
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
faceFrame = fr.face_locations(img)
enc = fr.face_encodings(img, faceFrame)
countr = 1
for encFace, face in zip(enc, faceFrame):
    matches = fr.compare_faces(encList, encFace)
    dist = fr.face_distance(encList, encFace)
    ind = np.argmin(dist)
    print(f'Person {countr}: {dist[ind]}')
    if matches[ind] and dist[ind] < 0.515:
        y1, x2, y2, x1 = face
        bbox = x1, y1, x2 - x1, y2 - y1
        cv2.putText(img2, str(countr), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 255, 0), 2)
        font = cv2.FONT_HERSHEY_SIMPLEX
    else:
        y1, x2, y2, x1 = face
        bbox = x1, y1, x2 - x1, y2 - y1
        cv2.putText(img2, str(countr), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 0, 255), 2)
    countr += 1
cv2.imshow('Video', img2)
cv2.waitKey(0)
cv2.destroyAllWindows()

