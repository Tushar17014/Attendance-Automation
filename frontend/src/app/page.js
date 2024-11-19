"use client"
import { login } from "@/apis/login"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { set } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BeatLoader } from "react-spinners"

export default function Home() {
  const [teacherID, setTeacherID] = useState(null);
  const [teacherPass, setTeacherPass] = useState(null);
  const [enroll, setEnroll] = useState(null);
  const [studentPass, setStudentPass] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleTeacherSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      username: teacherID,
      password: teacherPass,
      type: 1
    }
    const res = await login(data);
    if (res.success) {
      localStorage.setItem('uid', res.uid);
      if (res.type) {
        router.push('/admin/dashboard');
      }
      else {
        router.push('/teacher/dashboard');
      }
    }
    else {
      setLoading(false);
      setInvalid(true);
    }
  }

  const handleStudentSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      username: enroll,
      password: studentPass,
      type: 2
    }
    const res = await login(data);
    if (res.success) {
      localStorage.setItem('enroll', enroll);
      router.push('/student/dashboard');
    }
    else {
      setLoading(false);
      setInvalid(true);
    }
  }

  return (
    <div className="bg-[url('/login-bg.jpeg')] bg-no-repeat bg-cover">
      <div className="flex items-center justify-center min-h-screen flex-col gap-5">
        {loading ?
          <div className='flex justify-center items-center h-96 mt-12'>
            <BeatLoader size={20} color='#4846d2' />
          </div>
          :
          <div className="bg-white p-10 rounded-lg border shadow-lg">
            <div className="flex flex-col justify-center items-center"> 
              <h1 className="text-2xl text-center">Attendance Automation System</h1>
              <img src="./attnlg.jpg" className="w-28 text-center items-center"></img>
            </div>
            <Tabs defaultValue="teacher" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="student">Student</TabsTrigger>
              </TabsList>
              <TabsContent value="teacher">
                <Card>
                  <CardHeader className="items-center">
                    <CardTitle>Login</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleTeacherSubmit}>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="userid">User ID</Label>
                        <Input id="name" placeholder="Enter your Id" onChange={(e) => setTeacherID(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="TeacherPassword" placeholder="Enter password" onChange={(e) => setTeacherPass(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Login</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="student">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleStudentSubmit}>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="enroll">Enrollment Number</Label>
                        <Input id="ernoll" type="number" placeholder="Enter your enrollment number" onChange={(e) => setEnroll(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="studentPassword" type="password" placeholder="Enter password" onChange={(e) => setStudentPass(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Login</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
            {invalid && (
              <div className="bg-red-300 p-2 w-96 text-center border rounded-lg">
                <h2 className="">Invalid credentials!</h2>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}